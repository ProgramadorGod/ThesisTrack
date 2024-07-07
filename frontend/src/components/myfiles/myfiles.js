import React, { useState } from 'react'
import DocumentUpload from '../upload/uploadfiles'

const Myfiles = ({userid}) => {
  const [UploadVisible, setUploadVisible] = useState(false)

  return (
    <div>
      
      {UploadVisible ? (<DocumentUpload userid={userid}/>):null}

    </div>
      
  )
}

export default Myfiles
