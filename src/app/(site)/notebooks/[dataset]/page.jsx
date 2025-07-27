'use client';

// import NotebookPage from "@/react-jupyter/NotebookPage";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

/* DATASET NOTEBOOKS SHOULD BE IN JSON FORMAT, NOT IPYNB */
import condensationNotebook from './Condensation_Dataset.json';
import boilingNotebook from './Boiling_Dataset.json';
import immersionCoolingNotebook from './Immersion_Cooling_Dataset.json';
import { FaGoogle } from "react-icons/fa";
// import "react-ipynb-renderer/dist/styles/dorkula.css";
import { useRef } from "react";
import NotebookPage from "@/react-jupyter/NotebookPage";


export default function NotebookPageWrapper() {

  const { dataset } = useParams();
  const [notebook, setNotebook] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (dataset === "Condensation_Dataset") {
      setNotebook(condensationNotebook);
    } else if (dataset === "Boiling_Dataset") {
      setNotebook(boilingNotebook);
    } else if (dataset === "Immersion_Cooling_Dataset") {
      setNotebook(immersionCoolingNotebook);
    } else {
      setNotebook(null);
    }
  }, [dataset]);

  return (
    <main className="max-w-[90%] mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
      <h1 className="text-3xl font-bold mb-6"> {dataset.replace(/_/g, ' ')} Notebook</h1>


      {notebook ? (
        <>
          <a
              onClick={() => window.open('https://colab.research.google.com/drive/1gcy1rJ9nVLGaoEcYvkf3sCZQIPFoQeAk?usp=sharing', '_blank')}
              className="text-blue-600 hover:underline"
              hidden={dataset !== "Condensation_Dataset"}
          >
            Open in Google Colab
            <FaGoogle className="inline ml-1" />
          </a>
          <NotebookPage ipynb={notebook} />
          {/* <IpynbRenderer
            ipynb={notebook}
            // syntaxTheme={"darcula"}
            // onLoad={() => {
            //   console.log("loaded", ref.current);
            // }}
            ref={ref}
          /> */}
        </>

      )
      : (
        <div className="text-center">
          <p>Loading dataset... </p>
        </div>
      )}
    </main>
  );
}


