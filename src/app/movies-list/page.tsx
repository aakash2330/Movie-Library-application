import { formType } from "@/types/formTypes"
import {  columns } from "./colums"
import { DataTable } from "./data-table"

async function getData(): Promise<formType[]> {
  // Fetch data from your API here.
  return [
    {
        movieName:"name1",
        duration:"duration1",
        rating:"rating1"
    },
    {
        movieName:"name2",
        duration:"duration2",
        rating:"rating2"
    },
    {
        movieName:"name3",
        duration:"duration3",
        rating:"rating3"
    },
    {
        movieName:"name1",
        duration:"duration1",
        rating:"rating1"
    },
    {
        movieName:"name2",
        duration:"duration2",
        rating:"rating2"
    },
    {
        movieName:"name3",
        duration:"duration3",
        rating:"rating3"
    },
    {
        movieName:"name1",
        duration:"duration1",
        rating:"rating1"
    },
    {
        movieName:"name2",
        duration:"duration2",
        rating:"rating2"
    },
    {
        movieName:"name3",
        duration:"duration3",
        rating:"rating3"
    },
    {
        movieName:"name1",
        duration:"duration1",
        rating:"rating1"
    },
    {
        movieName:"name2",
        duration:"duration2",
        rating:"rating2"
    },
    {
        movieName:"name3",
        duration:"duration3",
        rating:"rating3"
    }
    // ...
  ]
}

export default async function moviesListPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
