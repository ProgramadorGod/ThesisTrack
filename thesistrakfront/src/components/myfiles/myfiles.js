import React, { useState } from 'react'
import DocumentUpload from '../upload/uploadfiles'
import "./myfiles.css"
import { FaExpand, FaPlus } from 'react-icons/fa'
import NewFile from './NewFile'

const Myfiles = ({userid}) => {
  const [UploadVisible, setUploadVisible] = useState(false)
  

  const toggleUpload = () => {
    setUploadVisible(!UploadVisible);
  };

  
  return (
    <div className={`${UploadVisible ? "Uploading":""}`}>
      {UploadVisible ? (<NewFile setupladovisible={toggleUpload} userid={userid}/>):null}

      <div className={`MainContainer`}>
        <div className='MyFilesContainer'>
          <div className='CreateNewFile' onClick={toggleUpload}>
            <div>Create New File </div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
              <div className='AddButton'>
                <FaPlus></FaPlus> 
              </div>
              
            </div>
          </div>
          
        </div>
        
      </div>

      

    </div>
      
  )
}

export default Myfiles
