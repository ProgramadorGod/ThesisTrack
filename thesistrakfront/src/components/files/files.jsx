import React, { useEffect, useState } from "react";
import "./files.css";
import axios from "axios";
import Loadingrectangle from "../loading/loading"
import Document from "./Document";

const Files = ({PortToUse}) =>{
    const [AllDocuments, setAllDocuments] = useState([]);
    const [VisibleDocuments, setVisibleDocuments] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const fetchDocuments = async() =>{
      try{
          const response = await axios.get(PortToUse+"api/documents/",{
            withCredentials:true,
          });
          setAllDocuments(response.data);
          localStorage.setItem('documents', JSON.stringify(response.data));
          setVisibleDocuments(response.data.slice(0,30));
      }catch(error){
        console.error('Error Trying To Fetch Documents: ',error );
      };
    };

    useEffect(()=>{
      const storedDocuments = localStorage.getItem("documents");

      if (storedDocuments){
        const parsedDocuments = JSON.parse(storedDocuments);
        setAllDocuments(parsedDocuments);
        setVisibleDocuments(parsedDocuments.slice(0,30));
        setisLoading(false);


      }
      else{
        const fetchData = async () =>{
          await fetchDocuments()
          setisLoading(false)

        }
        fetchData()
      }

    },[])
    
    const handleLoadMore = () =>{
      setVisibleDocuments(AllDocuments.slice(0,VisibleDocuments.length + 30));
    };

    if (isLoading){
      return <Loadingrectangle></Loadingrectangle>
    }

    // console.log(VisibleDocuments)


return (
  <div id='totaldocumentscontainer'>
    {VisibleDocuments.map((document) => (
      <Document key={document.id} document={document} />
    ))}

    {VisibleDocuments.length < AllDocuments.length && (
      <button onClick={handleLoadMore} className="load-more-button">Cargar más</button>
    )}
  </div>
);
};


export default Files;