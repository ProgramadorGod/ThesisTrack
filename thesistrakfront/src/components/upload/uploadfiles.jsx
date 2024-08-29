import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./uploadfiles.css"

const DocumentUpload = ({userid}) => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([parseInt(userid)]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [docType, setDocType] = useState('');
  const [selectedType, setSelectedType] = useState([]);

  
  useEffect(() => {
    // Fetch users and docTypes
    axios.get('http://127.0.0.1:8000/users/',{
    // Incluir cookies en la solicitud
    withCredentials: true,



    }).then(response => {
      

      console.log(response.data)
      console.log(userid)
      const FiltredUsers = (response.data).filter(user => user.id !== userid)
      console.log("looool", FiltredUsers)
      setUsers(FiltredUsers);

    });


    axios.get('http://127.0.0.1:8000/documents/types/').then(response => {
      setDocTypes(response.data);
    });
  }, []);

  
  const handleUserChange = (e) => {
    const options = e.target.options;
    const selectedUsers = [parseInt(userid)];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedUsers.push(options[i].value);
      }
    }

    
    setSelectedUsers(selectedUsers);
  };



  const handleTypeChange = (e) => {
    const options = e.target.options;
    const selectedType = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedType.push(options[i].value);
      }
    }
    
    setSelectedType(selectedType);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    selectedUsers.forEach(user => data.append('users', user));
    data.append('title', title);
    data.append('filee', file);
    data.append('description', description);
    selectedType.forEach(user => data.append('doc_type', selectedType));
    console.log("selected users: ", selectedUsers)
    
    console.log("userss:", data.users)
    axios.post('http://127.0.0.1:8000/documents/upload/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'X-CSRFToken': getCookie('csrftoken') 

      },
      withCredentials:true,
    })
    .then(response => {
      console.log(response.data);
      alert("Submitted successfully")
    })
    .catch(error => {
      console.error('Error uploading document:', error);
    });
  };


  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  return (
    <>
      <form onSubmit={handleSubmit} id='FORMULARY'>
        <div id='userscontainer' className='ItemFormContainer'>
          <label htmlFor="users" id='UserText'>Users</label>
          <select  name="users" id="users" onChange={handleUserChange}>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>
        <div className='ItemFormContainer'>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className='ItemFormContainer'>
          <label htmlFor="file">File</label>
          <input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <div className='ItemFormContainer'>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className='ItemFormContainer'>
          <label htmlFor="docType">Doc Type</label>
          <select name="docType" id="docType" onChange={handleTypeChange} required>
            {docTypes.map(docType => (
              <option key={docType.id} value={docType.id}>{docType.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Upload Document</button>
      </form>
      

      


    </>

  );
};

export default DocumentUpload;
