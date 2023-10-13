import { Button } from '@/components/ui/button'
import Image from 'next/image'
import menuIcon from "../components/ui/navbar/icons8-menu-64.png"



export default function Home() {
  return (
    <div className='h-screen flex flex-col items-center justify-center text-[#c0fb50] gap-[3rem]'>
    <h1 >WELCOME TO MOVIE LIBRARY</h1>
    <p className='flex items-center justify-center gap-[0.5rem]'>Click on <Image className='w-[1.5rem]' src={menuIcon} alt="SideMenuOpener" priority={true}/> {"for menu (bottom left)"} </p>
    </div>
    
  )
}
