import React, { useEffect, useState } from 'react'
import "./files.css"
import axios from 'axios'
import { RxCheckCircled, RxCheckbox, RxQuestionMark, RxTokens } from 'react-icons/rx'

const Files = () => {
  const [Documents, setDocuments] = useState([]);

  useEffect(()=>{
    const fetchDocuments = async () =>{
      const response = await axios.get("http://127.0.0.1:8000/documents/",{
        withCredentials: true,
      });
      setDocuments(response.data);
    };
    fetchDocuments();
  },[])


  return (
    <div id='totaldocumentscontainer'>
      
      {Documents.map((document)=>(
        <div id="FileComponent">
          <div className='ThesisContainer'>
            <div id='kind'> <RxTokens id='logo'/> Articulo Investigativo </div>
              <div className='Title'>{document.title}</div>
              <div className='Description'> {document.description}</div>
              <a className='DownloadButton' href={document.filee}>Accede Ahora (Libro Electrónico) </a>

          </div>
        </div>
      ))}
  
      



    
    
    </div>

  )
}

export default Files
