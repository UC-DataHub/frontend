'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";


export default function DatasetPage() {

  const { dataset } = useParams();

  return (
    <main className="max-w-[90%] mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
      <h1 className="text-3xl font-bold mb-6"> {dataset.replace(/_/g, ' ')} Page</h1>


      
    </main>
  );
}


