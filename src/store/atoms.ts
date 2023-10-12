import { formType } from "@/types/formTypes";
import { atom } from "recoil";


export const movieListAtom=atom<formType[]>({
    key:"movieListAtom",
    default:[]
})