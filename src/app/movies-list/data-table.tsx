"use client"
 
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { editMovieAtom, movieListAtom } from "@/store/atoms";
 
import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formType, movieDataType } from "@/types/formTypes";
import Link from "next/link";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}



export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )
    

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const [ratingFilterValue,setRatingFilterValue] = React.useState("")
  const [movieListState , setMovieListState] = useRecoilState(movieListAtom)
  const [editMovieState , setEditMovieState] = useRecoilState(editMovieAtom)

  async function getFilteredData(filter:string) {
    const {data} = await axios.post("http://localhost:3001/movie/filter",{filter})
    setMovieListState(data.movieList)
  }

  return (
    <>
    
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search moives..."
          value={(table.getColumn("movieName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("movieName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-center"
        />
<Select onValueChange={(value)=>{

getFilteredData(value)

}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter rating" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Movies</SelectLabel>
          <SelectItem value="lessThanSeven">Rated less than 7</SelectItem>
          <SelectItem value="greaterThanSeven">Rated more than 7</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

      </div>

    
    <div className="rounded-md borderw text-center ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="w-[33.33%] text-center text-[#c0fb50]"  key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}

                  </TableCell>
                ))}
<td>
<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/edit-movies"}>
            <DropdownMenuItem onClick={()=>{


              const movieData = row.original as movieDataType;
              setEditMovieState(movieData) //passing movie name to edit to edit-movie Page


            }}> Edit</DropdownMenuItem></Link>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
</td>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    <div className="flex items-center justify-end space-x-2 py-4 text-[#c0fb50]">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
{/* 
      {JSON.stringify(movieListState)} */}
    </>
  )
}
