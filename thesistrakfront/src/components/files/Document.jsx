import React from 'react';
import { RxFile, RxTokens } from 'react-icons/rx';

const Document = ({ document }) => {
    const isNotGoogleDriveLink = !document.url.includes('drive.google.com');


    const fileUrl = isNotGoogleDriveLink 
        ? `http://127.0.0.1:8000/media/${document.url}`
        : document.url;

    return (
        <div id="FileComponent" key={document.id}>
            <div className='ThesisContainer'>
                <div id='kind'>
                    <RxTokens id='logo' />
                    {document.code} {'\u00A0'} / {'\u00A0'} {document.carrer_name}
                </div>
                <div className='Title'>{document.title}</div>
                <div className='Description'>
                    Este documento fue realizado en la era previa al calendario B del 2024, sin embargo puedes analizar su descripción leyendo la introducción del documento, seguramente te pueda ser de mucha utilidad.
                </div>
                <div className='Year'>Year: {'\u00A0'} {document.year}</div>
                <div className='Author'>
                    <div>Authors: {'\u00A0'}</div>
                    {document.authors.map((author, index) => (
                        <span key={index}>
                            {author}
                            {index < document.authors.length - 1 && ' \u00A0 - \u00A0 '}
                        </span>
                    ))}
                </div>
                <div className='DownloadButton'>
                    <a id='DownloadText' href={fileUrl} target="_blank" rel="noopener noreferrer">
                        <RxFile className='icondoc' /> {isNotGoogleDriveLink ? 'Accede Ahora (Documento Digital)' : 'Accede Ahora (Libro Electrónico)'}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Document;
