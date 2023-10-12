
"use client"


import { formType } from "@/types/formTypes"
import {  columns } from "./colums"
import { DataTable } from "./data-table"
import axios from "axios"
import { error } from "console";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil"
import { movieListAtom } from "@/store/atoms"



export default  function moviesListPage() {

  const [data , setData] = useRecoilState(movieListAtom)
 
  async function getData(){
    // Fetch movie list here
  try{

    const res = await axios.get("http://localhost:3001/movie/list"); 
    setData(res.data.movieList) 
    return data;
    
  }catch(error) {
    console.log(error)
  
  }
    
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
