import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./uploadfiles.css";

const DocumentUpload = ({ userid }) => {
  const [users, setUsers] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([parseInt(userid)]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/', { withCredentials: true })
      .then(response => {
        const filteredUsers = response.data.filter(user => user.id !== userid);
        setUsers(filteredUsers);
      });

    axios.get('http://127.0.0.1:8000/documents/types/')
      .then(response => {
        setDocTypes(response.data);
      });
  }, [userid]);

  const handleUserChange = (e) => {
    const options = e.target.options;
    const selected = [parseInt(userid)];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(parseInt(options[i].value));
      }
    }
    setSelectedUsers(selected);
  };

  const handleTypeChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedType(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    selectedUsers.forEach(user => data.append('users', user));
    data.append('title', title);
    data.append('filee', file);
    data.append('description', description);
    selectedType.forEach(type => data.append('doc_type', type));

    axios.post('http://127.0.0.1:8000/documents/upload/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      withCredentials: true,
    })
    .then(response => {
      alert("Submitted successfully");
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
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  return (
    <form onSubmit={handleSubmit} id='FORMULARY'>
      <div className='ItemFormContainer'>
        <label htmlFor="users">Users</label>
        <select multiple name="users" id="users" onChange={handleUserChange}>
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
        <select multiple name="docType" id="docType" onChange={handleTypeChange} required>
          {docTypes.map(docType => (
            <option key={docType.id} value={docType.id}>{docType.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Upload Document</button>
    </form>
  );
};

export default DocumentUpload;