import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Page, Selection, Edit, Sort, Filter, Toolbar } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

function Customers() {
  const editing = { allowDeleting: true, allowEditing: true };
  const toolbarOptions = ['Delete'];
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersData}
        width="auto"
        allowPaging
        allowSorting
        allowFiltering
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Sort, Filter, Edit, Selection, Page, Toolbar]} />

      </GridComponent>
    </div>
  );
}

export default Customers