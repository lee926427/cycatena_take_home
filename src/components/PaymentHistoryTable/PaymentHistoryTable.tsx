import type { PaymentHistoryProps } from "../../constants";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { makePaymentHistoryData } from "../../constants";

const columnHelper = createColumnHelper<PaymentHistoryProps>();

export function PaymentHistoryTable() {
  const [data, setData] = useState<null | PaymentHistoryProps[]>(null);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "dateCreated",
      desc: true,
    },
  ]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const table = useReactTable({
    data,
    columns: [
      columnHelper.accessor("dateCreated", {
        header: "Date Created",
        cell: (info) => info.getValue(),
        enableSorting: true,
        sortingFn: "datetime",
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => "$" + info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) =>
          info.getValue() === true ? (
            <div className=" bg-green-800 w-24 text-center text-white rounded-full px-4">
              Success
            </div>
          ) : (
            <div className="bg-red-800 w-24 text-center rounded-full text-white">
              Failed
            </div>
          ),
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setData(
        makePaymentHistoryData(new Date(2023, 1, 1), new Date(2023, 5, 30))(40),
      );
    }, 3000);
  }, []);

  if (data === null) {
    return <div className="">loading</div>;
  }

  return (
    <>
      <table className="text-black dark:text-white border w-full">
        <thead className="border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left p-2">
                  <div
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="dark:even:bg-slate-700 even:bg-slate-300"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <section className="flex gap-x-2 text-white mt-auto">
        <button
          className="border rounded px-4 disabled:text-slate-500 disabled:border-slate-500"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded px-4 disabled:text-slate-500 disabled:border-slate-500"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
      </section>
    </>
  );
}
