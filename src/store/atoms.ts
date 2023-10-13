import { formType, movieDataType } from "@/types/formTypes";
import { atom } from "recoil";


export const movieListAtom=atom<formType[]>({
    key:"movieListAtom",
    default:[]
})


export const editMovieAtom=atom<movieDataType>({
    key:"editMovieAtom",
    default:{
        movieName:"",
        duration:0,
        rating:0,
    }
})