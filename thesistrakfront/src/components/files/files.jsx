import React, { useEffect, useState } from 'react';
import "./files.css";
import axios from 'axios';
import { RxCheckCircled, RxCheckbox, RxFile, RxQuestionMark, RxTokens } from 'react-icons/rx';
import Profile from '../profile/profile';
import Loadingrectangle from '../loading/loading';

const Files = ({ PortToUse }) => {
  const [Documents, setDocuments] = useState([]);
  const [Carrers, setCarrers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  const fetchDocuments = async () => {
    const response = await axios.get(PortToUse + "api/documents/", {
      withCredentials: true,
    });
    setDocuments(response.data);
  };

  const fetchCarrers = async () => {
    const response = await axios.get(PortToUse + "api/carrers/", {
      withCredentials: true,
    });
    setCarrers(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchDocuments(), fetchCarrers()]);
      setIsLoading(false); // Termina la carga después de obtener los datos
    };

    fetchData();
  }, []);

  const handleDocumentClick = (documentid) => {
    console.log("CLICKED THE DOCUMENT : ", documentid);
  };

  if (isLoading) {
    return <Loadingrectangle />; // Muestra el componente de carga mientras se cargan los datos
  }

  return (
    <div id='totaldocumentscontainer'>
      {/* <Profile /> */}
      
      {Documents.map((document) => (
        <div id="FileComponent" key={document.id}>
          <div className='ThesisContainer'>
            <div id='kind'>
              <RxTokens id='logo' />
              {document.code} {'\u00A0'} / {'\u00A0'} {document.carrer_name}
            </div>
            <div className='Title'>{document.title}</div>
            <div className='Description'> {document.description}</div>
            <div className='Author'>
              <div>Author:</div>
              {document.authors.map((author, index) => (
                <span key={index}> {author}{'\u00A0'}-{'\u00A0'}</span>
              ))}
            </div>
            <div className='DownloadButton'>
              <a id='DownloadText' href={document.url}>
                <RxFile className='icondoc' /> Accede Ahora (Libro Electrónico)
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Files;
