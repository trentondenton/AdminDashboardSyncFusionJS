import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeftDots } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Cart, Chat, UserProfile, Notification } from './index';
import { useStateContext } from '../contexts/ContextProvider';


const NavButton = ({ title, cFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button type="button" onClick={cFunc} style={{ color }} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
      <span style={{ background: dotColor }} className="absolute inline-flex rounded-full h-2 w-2 r-2 top-2" />
      {icon}
    </button>
  </TooltipComponent>
)


const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, handleClick, screenSize, setScreenSize, currentColor } = useStateContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <div className="flex justify-between p-2 md:mx-6 position relative">
      <NavButton
        title="Menu"
        cFunc={() => setActiveMenu(!activeMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />


      <div className="flex">
        <NavButton
          title="Cart"
          cFunc={() => handleClick('cart')}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          cFunc={() => handleClick('chat')}
          color={currentColor}
          icon={<BsChatLeftDots />}
        />
        <NavButton
          title="Notifications"
          dotColor="#03C9D7"
          cFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div className="flex items-center gap-2 cursor-point p-1 hover:bg-light-gray rounded-lg" onClick={() => handleClick('userProfile')}>
            <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <p><span className="text-gray-400">Hi, </span> {' '}
              <span className="text-gray-400 font-bold ml-1 text-14">Trenton</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />

          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar