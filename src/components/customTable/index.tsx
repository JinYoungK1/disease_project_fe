import React, { useEffect } from 'react';

import { Icon } from '@iconify/react';
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
import Pagination from 'rc-pagination';

export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  pageSize?: number;
  total?: number;
  disablePagination?: boolean;
  onlyOneRowSelected?: boolean;
  tableHeight?: string;
  onRowClick?(value: T): void;
  onRowSelection?: (rows: string[]) => void;
  onChange?(value: number): void;
  rowClass?: (row: Row<T>) => string;
  rowStyle?: (row: Row<T>) => React.CSSProperties; // 추가
  onSelectAll?: (checked: boolean) => void;
};

export type TableRenderSubRowComponent<T> = (props: {
  row: Row<T>;
}) => React.ReactElement;

function CustomTable<T>(props: TableProps<T>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [rowPick, setRowPick] = React.useState<any | null>(null);
  const {
    data,
    columns,
    pageSize = 20,
    total = 0,
    disablePagination = false,
    onlyOneRowSelected = false,
    tableHeight = '800px',
    onRowSelection,
    onChange = (currentPage: number) => null,
    onRowClick = (original: RowData) => null,
    rowClass = () => '',
    rowStyle = () => ({}),
    onSelectAll,
  } = props;

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableMultiRowSelection: !onlyOneRowSelected,
    enableRowSelection: true, //enable row selection for all rows
    // onRowSelectionChange: setRowSelection,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      if (onSelectAll) {
        const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
        const allSelected = Object.keys(newSelection).length === data.length;
        onSelectAll(allSelected);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: false,
    getRowId: (row) => String((row as any).id),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange', // 칼럼 크기 조절 모드
  });

  useEffect(() => {
    if (onRowSelection) {
      const _keys = Object.keys(rowSelection);
      onRowSelection(_keys);
    }
  }, [rowSelection, onlyOneRowSelected]);

  return (
    <div className={'overflow-x-auto overflow-y-auto'}>
      <div className="inline-block min-w-full p-1.5 align-middle">
        <div 
          className="table-container w-full overflow-x-auto p-1.5"
          style={{ maxHeight: tableHeight }}
        >
          {/* <table className="w-full" style={{ tableLayout: "auto", width: "max-content", borderCollapse: "collapse" }}> */}
          <table className="w-full" style={{ tableLayout: "auto", borderCollapse: "collapse" }}>
          {/* className="min-w-full divide-y divide-gray-200 overflow-y-auto border-b border-gray-200" */}
          
          {/* className={'bg-slate-600'} */} 
          
            <thead className='bg-slate-600 z-10 sticky top-0 border-black text-center' style={{ position: 'sticky', top: 0 }}>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id} className="w-full">
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          style={{ 
                            width: header.getSize(),
                            position: 'sticky',
                            top: 0,
                            backgroundColor: '#475569', // slate-600 색상
                            zIndex: 10
                          }}
                          className="text-md relative px-4 py-2 text-center font-bold uppercase text-white">
                          {' '}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanResize() && (
                            <div
                              {...{
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `absolute right-0 top-0 h-full w-0.5 cursor-col-resize bg-white opacity-100`,
                              }}
                            />
                          )}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody className="divide-y divide-gray-200 border">
              {table.getRowModel().rows.map((row, idx) => {
                return (
                  <tr
                    key={_.uniqueId(`row_${row.id}_${idx}`)}
                    className={clsx('hover:bg-yellow-100', rowClass(row))}
                    style={rowStyle(row)}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={clsx(
                            'text-md cursor-pointer whitespace-nowrap border-l border-r px-4 py-1 text-gray-800 text-center',
                            {
                              '!w-[32px]': cell.column.id === 'select-col',
                              '!font-extrabold bg-pink-100':
                                rowPick && rowPick?.id?.toString() === row.id,
                            }
                          )}
                          style={{
                            maxWidth: cell.column.getSize(),
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          onClick={(e) => {
                            if (cell.column.id !== 'select-col') {
                              e.stopPropagation();
                              setRowPick(row.original);
                              onRowClick(row.original);
                            }
                          }}>
                          {cell.getIsGrouped() ? (
                            <>
                              <button
                                {...{
                                  onClick: row.getToggleExpandedHandler(),
                                  style: {
                                    cursor: row.getCanExpand()
                                      ? 'pointer'
                                      : 'normal',
                                  },
                                }}>
                                {row.getIsExpanded() ? '👇' : '👉'}{' '}
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                                ({row.subRows.length})
                              </button>
                            </>
                          ) : cell.getIsAggregated() ? (
                            flexRender(
                              cell.column.columnDef.aggregatedCell ??
                                cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          ) : cell.getIsPlaceholder() ? null : (
                            <div style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              width: '100%',
                              textAlign: 'center'
                            }}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {pageSize - (data ?? []).length * 1 > 0 &&
                [...Array(pageSize - (data ?? []).length * 1)].map(
                  (emptyRow, idx) => {
                    return (
                      <tr
                        key={_.uniqueId(`row_empty_row_${idx}`)}
                        className={'last:border-b-2 hover:bg-yellow-100'}>
                        {(columns ?? []).map((emptyTd) => {
                          return (
                            <td
                              key={_.uniqueId(`row_empty_td_${idx}`)}
                              className={
                                'text-md h-[33px] whitespace-nowrap border-l border-r px-6 font-medium text-gray-800'
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
      {!disablePagination && (
        <Pagination
          className={'mt-5'}
          style={{}}
          nextIcon={
            <Icon
              icon="material-symbols-light:keyboard-double-arrow-right"
              style={{ color: '#000000' }}
            />
          }
          prevIcon={
            <Icon
              icon="material-symbols-light:keyboard-double-arrow-left-rounded"
              style={{ color: '#000000' }}
            />
          }
          onChange={onChange}
          total={total}
          defaultPageSize={10}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}

export default CustomTable;
