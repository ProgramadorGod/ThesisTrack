import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./NewFile.css";
import { useAppContext } from '../../AppContext';

const NewFile = ({ setupladovisible, userid }) => {
    const [users, setUsers] = useState([]);
    const [docTypes, setDocTypes] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([parseInt(userid)]);
    const [Title, setTitle] = useState('');
    const [Carrer, setCarrer] = useState('');
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [docType, setDocType] = useState('');
    const [selectedType, setSelectedType] = useState([]);

    const { PortToUse } = useAppContext();

    const fetchDocTypes = async () => {
        try {
            const response = await axios.get(PortToUse + "api/doc-types/", {
                withCredentials: true,
            });
            setDocTypes(response.data);
        } catch (error) {
            console.error("Error fetching document types", error);
        }
    };


    const fetchCarrers = async () => {
        try {
            const response = await axios.get(PortToUse + "api/carrers/", {
                withCredentials: true,
            });
            setCarrer(response.data);
        } catch (error) {
            console.error("Error fetching document types", error);
        }
    };



    useEffect(() => {
        fetchDocTypes();
        fetchCarrers();
    }, []); // Lista de dependencias vacía para ejecutar solo una vez

    return (
        <div className='NewFileContainer' onClick={setupladovisible}>
            <div className='FileBlock' onClick={(e) => e.stopPropagation()}>
                <form>
                    <select
                        value={Carrer}
                        onChange={(e) => setCarrer(e.target.value)}

                    >
              

                        

                    </select>


                    <input
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título"
                    />
                    <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                    >
                        {docTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </form>
            </div>
        </div>
    );
};

export default NewFile;
