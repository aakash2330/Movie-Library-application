"use client"
 
import * as React from "react"
import Image from 'next/image'
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
import { movieListAtom } from "@/store/atoms";
 
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


import filterIcon from "../../icons/icons8-filter-50.png"

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
  const [nameFilterValue,setnameFilterValue] = React.useState("")
  const [movieListState , setMovieListState] = useRecoilState(movieListAtom)

  async function getFilteredData() {
    const {data} = await axios.post("http://localhost:3001/movie/filter",{ratingFilterValue,nameFilterValue})
    setMovieListState(data.movieList)
  }

  return (
    <>

<div className="flex items-center justify-center py-4">
      <Input 
          placeholder="Search moives..."
          value={(table.getColumn("movieName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("movieName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-center"
        />
        </div>


      <div className="flex items-center justify-between py-4">
      <Select onValueChange={(value)=>{setnameFilterValue(value)}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter Movie Names" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Movies</SelectLabel>
          <SelectItem value="betweenAandM">A-M</SelectItem>
          <SelectItem value="betweenMandZ">M-Z</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>


<Select onValueChange={(value)=>{setRatingFilterValue(value)}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter rating" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="lessThanSeven">Rated less than 7</SelectItem>
          <SelectItem value="greaterThanSeven">Rated more than 7</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>


    <Button onClick={getFilteredData}><Image className='w-[1.5rem]' src={filterIcon} alt="SideMenuOpener" priority={true}/></Button>
    </div>

     
    
    <div className="rounded-md borderw text-center ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="w-[33.33%] text-center"  key={header.id}>
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

    <div className="flex items-center justify-end space-x-2 py-4">
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
