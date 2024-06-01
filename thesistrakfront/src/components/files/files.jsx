import React, { useEffect, useState } from 'react'
import "./files.css"
import axios from 'axios'
import { RxCheckCircled, RxCheckbox, RxFile, RxQuestionMark, RxTokens } from 'react-icons/rx'
import Profile from '../profile'

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

  const handleDocumentClick = (documentid) => {
    console.log("CLICKED THE DOCUMENT : ", documentid)
  }

  return (
    <div id='totaldocumentscontainer'>
      {/* <Profile/> */}

      {Documents.map((document)=>(
        <div id="FileComponent">
          <div className='ThesisContainer'>
            <div id='kind'> <RxTokens id='logo'/> {document.doc_type.name} </div>
              <div className='Title'>{document.title}</div>
              <div className='Description'> {document.description}</div>
              <div className='Author'> 
                <div> Author:</div> 
                <div id='authorname'> {document.user.username} </div> 
              </div>

              <a 
                className='DownloadButton'                
                href={document.filee} 
                >
                
                <div id='DownloadText' onClick={handleDocumentClick(document.id)}> <RxFile className='icondoc'></RxFile>     Accede Ahora (Libro Electrónico) </div>
                {/* <div>{document.id}</div> */}
              </a>

          </div>
        </div>
      ))}
  
      



    
    
    </div>

  )
}

export default Files
