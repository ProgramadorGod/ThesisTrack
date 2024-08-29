import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './myfiles.css';
import { FaPlus } from 'react-icons/fa';
import NewFile from './NewFile';
import { useAppContext } from '../../AppContext';
import Document from '../files/Document';

const Myfiles = ({ userid }) => {
  const [UploadVisible, setUploadVisible] = useState(false);
  const [MyDocuments, setMyDocuments] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const { PortToUse } = useAppContext();

  const toggleUpload = () => {
    setUploadVisible(!UploadVisible);
  };

  const fetchMyDocuments = async () => {
    try {
      const response = await axios.get(`${PortToUse}api/my-docs/`, {
        withCredentials: true,
      });
      setMyDocuments(response.data.results);
    } catch (error) {
      console.error('Error fetching my documents: ', error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDocuments();
  }, []); // Arreglo de dependencias vacío para ejecutar solo una vez

  return (
    <div className={`${UploadVisible ? 'Uploading' : ''}`}>
      {UploadVisible && <NewFile setupladovisible={toggleUpload} userid={userid} />}

      <div className="MainContainer">
        <div className="MyFilesContainer">
          <div className="CreateNewFile" onClick={toggleUpload}>
            <div>Create New File</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div className="AddButton">
                <FaPlus />
              </div>
            </div>
          </div>

          <div className="MyDocumentsList">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              MyDocuments.map((document) => (
                <Document key={document.id} document={document}/>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myfiles;
