import { formType } from "@/types/formTypes"
import {  columns } from "./colums"
import { DataTable } from "./data-table"
import axios from "axios"

async function getData(): Promise<formType[]> {
  // Fetch movie list here

  const {data} = await axios.get("http://localhost:3001/movie/list");  
  return data.movieList;
}

export default async function moviesListPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
