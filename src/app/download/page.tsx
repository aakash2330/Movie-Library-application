"use client"

import { Button } from "@/components/ui/button";


async function downloadCsv (){

    try {
        const res = await fetch('http://localhost:3001/movie/download'); // Adjust URL accordingly
        const blob = await res.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'movieList.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Download error:', error);
      }
    };

export default function DownloadPage(){
    return<div className="flex items-center justify-center h-screen"><Button onClick={downloadCsv}>Download Movie List</Button></div>
}