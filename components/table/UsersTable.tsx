"use client";
import React, { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { Input } from "../ui/input";
import { Pagination } from "./Pagination";

import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { EditUserDialog } from "../dialog/user/EditUserDialog";
import { TimelineUserDialog } from "../dialog/user/TimelineUserDialog";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  updateUsers: any;
}

export function UsersTable<TData, TValue>({
  columns,
  data,
  updateUsers,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [statusFilter, setStatusFilter] = useState("Geral");


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });


  return (
    <div className="w-full rounded-lg border-2 px-6 py-4 shadow-lg">

      <div className="flex w-full flex-wrap  items-center justify-between ">

        <div className="flex items-center gap-2">
          <Input
            placeholder="Filtrar"
            type="text"
            className="my-2 w-full md:w-44 lg:w-44"
            onChange={(e) =>
              table.setGlobalFilter(e.target.value.toString())
            }
          />
          <Button type="button" size="sm" variant="secondary" onClick={async () => await updateUsers()}><RefreshCcw className="rotate-180 hover:animate-spin" /></Button>
        </div>


        <Pagination table={table} />


      </div>


      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="whitespace-nowrap"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id} className="max-w-44 truncate p-3" title={(cell.getValue() as string)?.toString()}
                    >
                      {index === 3 ? (
                        <div className="flex w-fit gap-2">
                          <EditUserDialog
                            updateUsers={updateUsers}
                            name={row.getValue('name')}
                            role={row.getValue('role')}
                            clients={row.getValue('clients')}
                          />
                        </div>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}

                    </TableCell>
                  ))}

                </TableRow>

              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Buscando resultados...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
      <Pagination table={table} />
      {/* </Tabs> */}
    </div>

  );
}
