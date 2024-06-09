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
                {document.users.map(user =>{
                  <div id='authorname'> {user.username} </div> 

                })}
              </div>

              <div 
                className='DownloadButton'                
                
                >
                
                <a id='DownloadText' href={document.filee} > <RxFile className='icondoc'></RxFile>     Accede Ahora (Libro Electrónico) </a>
                {/* <div>{document.id}</div> */}
              </div>

          </div>
        </div>
      ))}
  
      



    
    
    </div>

  )
}

export default Files


// TESIS LAUREADAS, OBTENER INSIGNIA DE SOBRESALIENTE.
// FUTURO DE LOS ESTUDIANTES PODER DEMOSTRAR EL PRESTIGIO Y LA IMPORTANCIA DE SUS PROYECTOS QUE TUVIERON EN LA INSTITUCIÓN
// RELACIONAR PROYECTOS 
// VOTACIONES PARA FINANCIAR PROYECTOS
// UNIPAZ PUEDE DEMOSTRAR CON SOLIDEZ QUE PROYECTOS EXISTEN
// MEJORAR EL CONOCIMIENTO DE LOS ESTUDIANTES PARA DESARROLLAR PROYECTOS Y PRESUPUESTOS 
// ETIQUETA DE PROYECTOS CON PRESUPUESTOS
// ESTRELLAS NIVEL DE PRESTIGIO

