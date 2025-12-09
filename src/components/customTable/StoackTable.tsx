import React, { useEffect, useMemo } from 'react';

import {
  ColumnDef,
  Row,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import _ from 'lodash';

export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  total?: number;
  disablePagination?: boolean;
  onlyOneRowSelected?: boolean;
  onRowClick?(value: T): void;
  onRowSelection?: (rows: string[]) => void;
  onChange?(value: number): void;
  meta?: any; // Add meta prop to TableProps
};

export type TableRenderSubRowComponent<T> = (props: {
  row: Row<T>;
}) => React.ReactElement;

// 시간이 있을 때 타입정리좀 해야함..
const getLeafColumns = (columns: ColumnDef<any>[]): ColumnDef<any>[] => {
  const leafColumns: ColumnDef<any>[] = [];
  columns.forEach((column) => {
    //@ts-ignore
    if (column?.columns) {
      //@ts-ignore
      leafColumns.push(...getLeafColumns(column.columns));
    } else {
      leafColumns.push(column);
    }
  });
  return leafColumns;
};

function StockTable<T>(props: TableProps<T>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [rowPick, setRowPick] = React.useState<any | null>(null);
  const {
    data,
    columns,
    pageSize = 10,
    total = 0,
    disablePagination = false,
    onlyOneRowSelected = false,
    onRowSelection,
    onChange = (currentPage: number) => null,
    onRowClick = (original: RowData) => null,
    meta, // Destructure meta from props
  } = props;

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableMultiRowSelection: !onlyOneRowSelected,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: 'onChange',
    debugTable: false,
    getRowId: (row) => String((row as any).id),
    getSortedRowModel: getSortedRowModel(),
    meta, // Pass meta to the table options
  });

  useEffect(() => {
    if (onRowSelection) {
      const _keys = Object.keys(rowSelection);
      onRowSelection(_keys);
    }
  }, [rowSelection, onlyOneRowSelected]);

  const leafColumns = useMemo(() => getLeafColumns(columns), [columns]);

  return (
    <div className={'overflow-x-auto overflow-y-auto'}>
      <div className="inline-block min-w-full p-1.5 align-middle">
        <div className=" ">
          <table className="min-w-full divide-y divide-gray-200 overflow-y-auto border-b border-gray-200">
            <thead className={'bg-gray-300'}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="w-full">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      colSpan={header.colSpan}
                      className={clsx(
                        `!w-[${header.getSize()}px]`,
                        'text-md cursor-pointer whitespace-nowrap px-4 py-1 text-start font-medium uppercase text-gray-500'
                      )}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={_.uniqueId(`row_${row.id}_${idx}`)}
                  className={clsx(
                    'odd:bg-white even:bg-gray-100 hover:bg-blue-100'
                  )}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={clsx(
                        'text-md cursor-pointer whitespace-nowrap px-4 py-1 font-medium text-gray-800',
                        {
                          '!w-[32px]': cell.column.id === 'select-col',

                          '!font-extrabold':
                            rowPick && rowPick?.id?.toString() === row.id,
                        }
                      )}
                      // onClick={(e) => {
                      //   if (cell.column.id !== 'select-col') {
                      //     // e.stopPropagation();
                      //     // setRowPick(row.original);
                      //     // onRowClick(row.original);
                      //   }
                      // }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {pageSize - (data ?? []).length * 1 > 0 &&
                [...Array(pageSize - (data ?? []).length * 1)].map(
                  (emptyRow, idx) => {
                    return (
                      <tr
                        key={_.uniqueId(`row_empty_row_${idx}`)}
                        className={
                          'last:border-b-2 odd:bg-white even:bg-gray-100 hover:bg-blue-100'
                        }>
                        {leafColumns.map((emptyTd: any, colIdx: number) => {
                          return (
                            <td
                              key={_.uniqueId(`row_empty_td_${colIdx}`)}
                              className={
                                'text-md h-[33px] whitespace-nowrap px-6 font-medium text-gray-800'
                              }>
                              {' '}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StockTable;
