"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EditformAttributesType, editFormSchmea, editFormSchmeaType, formAttributesType, formSchema, formType } from "@/types/formTypes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRecoilState } from "recoil"
import { editMovieAtom } from "@/store/atoms"
import axios from "axios"



export default function EditMoviesPage(){


    const [orignalMovieData , setorignalMovieData] = useRecoilState(editMovieAtom)


    const form = useForm<editFormSchmeaType>({
        resolver: zodResolver(editFormSchmea), //default values for the form
        defaultValues: {
          duration:"",
          rating:""
        },
      })


  async function onFormSubmit(values: editFormSchmeaType){
    //post request to save movie in db
    console.log({values});
    const newMovieData : formType = {movieName:orignalMovieData.movieName,...values}
    console.log({orignalMovieData,newMovieData})
    const {data} = await axios.put("http://localhost:3001/movie/edit",{orignalMovieData,newMovieData})
    console.log(data)

  }

  const formAttributes:EditformAttributesType[] = [{
    name:"duration",
    label:"Duration",
    placeholder:`${orignalMovieData.duration}`,
    description:"How long is the movie ?"
  },{
    name:"rating",
    label:"Rating",
    placeholder:`${orignalMovieData.rating}`,
    description:"Rating out of 10"
  }]


    return(<div className="flex flex-col h-screen items-center justify-center gap-[5rem]">
        <h1 className="text-[#c0fb50]">{`Edit ${orignalMovieData.movieName}`}</h1>
      <div className="w-[20rem]">
        <Form  {...form}>
        <FormField
              key="movieName"
              name="movieName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie Name</FormLabel>
                  <FormControl>
                    <Input disabled={true} placeholder={orignalMovieData.movieName} {...field}/>
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> 


          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
            {formAttributes.map((formfield,index)=>{
              return  <FormField
              key={index}
              control={form.control}
              name={formfield.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formfield.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={formfield.placeholder} {...field}/>
                  </FormControl>
                  <FormDescription>
                  {formfield.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> 
            })}
            <br/>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        </div>
        </div>
      )
}


