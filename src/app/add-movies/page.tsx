"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formAttributesType, formSchema, formType } from "@/types/formTypes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"



export default function AddMoviesPage(){

    const form = useForm<formType>({
        resolver: zodResolver(formSchema), //default values for the form
        defaultValues: {
          movieName: "",
          duration:"",
          rating:""
        },
      })


  async function onFormSubmit(values: formType){
    //post request to save movie in db
    const {data} = await axios.post("http://localhost:3001/movie/add",values)  
    console.log(data)
  }

  const formAttributes:formAttributesType[] = [{
    name:"movieName",
    label:"Movie Name",
    placeholder:"Star Wars",
    description:"Please enter the name of movie you'd like to add"
  },{
    name:"duration",
    label:"Duration",
    placeholder:"120",
    description:"How long is the movie ?"
  },{
    name:"rating",
    label:"Rating",
    placeholder:"",
    description:"Rating out of 10"
  }]


    return(<div className="flex flex-col h-screen items-center justify-center">
      <div className="w-[20rem]">
        <Form  {...form}>
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
                    <Input placeholder={formfield.placeholder} {...field} />
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


