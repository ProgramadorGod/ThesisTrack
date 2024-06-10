import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentUpload = () => {
  const [users, setUsers] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [docType, setDocType] = useState('');

  useEffect(() => {
    // Fetch users and docTypes
    axios.get('http://127.0.0.1:8000/users/').then(response => {
      setUsers(response.data);
    });
    axios.get('http://127.0.0.1:8000/document-types/').then(response => {
      setDocTypes(response.data);
    });
  }, []);

  const handleUserChange = (e) => {
    const options = e.target.options;
    const selectedUsers = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedUsers.push(options[i].value);
      }
    }
    setSelectedUsers(selectedUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    selectedUsers.forEach(user => data.append('users', user));
    data.append('title', title);
    data.append('filee', file);
    data.append('description', description);
    data.append('doc_type', docType);

    axios.post('http://127.0.0.1:8000/documents/upload/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error uploading document:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="users">Users</label>
        <select multiple name="users" id="users" onChange={handleUserChange}>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} required />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div>
        <label htmlFor="docType">Doc Type</label>
        <select name="docType" id="docType" onChange={(e) => setDocType(e.target.value)} required>
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
