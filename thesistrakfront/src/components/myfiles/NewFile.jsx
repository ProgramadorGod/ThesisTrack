import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./NewFile.css";
import { useAppContext } from '../../AppContext';

const NewFile = ({ setupladovisible, userid }) => {
    const [users, setUsers] = useState([]);
    const [docTypes, setDocTypes] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([parseInt(userid)]);
    const [Title, setTitle] = useState('');
    const [Carrers, setCarrers] = useState([]);
    const [Stages, setStages] = useState([]);
    const [Stage, setStage] = useState('');
    const [Code , setCode ] = useState('');
    const [Visible, setVisible]  = useState(true);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [docType, setDocType] = useState('');
    const [selectedType, setSelectedType] = useState([]);
    const [Carrer, setCarrer] = useState('')
    const [progressPercentage, setProgressPercentage] = useState(100); // Valor por defecto al 100%


    const { PortToUse } = useAppContext();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('code', 'Not official')
        formData.append('title', Title);
        formData.append('is_visible', Visible)
        formData.append('description', description);
        formData.append('year', '2024');
        formData.append('file', file);
        formData.append('progress_percentage','20')
        formData.append('document_type', docType);


        try{
            const response = await axios.post(PortToUse + "api/file_docs/", formData, {
                withCredentials:true,
            });
            console.log("File uploaded successfully", response.data);


        }catch (error){

            console.error("Error uploading file", error);

        }





    }

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

            setCarrers(response.data);
            console.log( "lol: ",response.data);
            response.data.map((carrer)=>{
                console.log(carrer.name)
            })

        } catch (error) {
            console.error("Error fetching document types", error);
        }
    };



    const fetchStages = async () => {
        try {
            const response = await axios.get(PortToUse + "api/doc-stages/", {
                withCredentials: true,
            });

            setStages(response.data);
            console.log( "lol: ",response.data);
        

        } catch (error) {
            console.error("Error fetching document types", error);
        }
    };





    useEffect(() => {
        fetchDocTypes();
        fetchCarrers();
        fetchStages();
        
    }, []); // Lista de dependencias vacía para ejecutar solo una vez

    return (
        <div className='NewFileContainer' onClick={setupladovisible}>
            <div className='FileBlock' onClick={(e) => e.stopPropagation()}>
                <form>
                    <select
                        value={Carrer}
                        onChange={(e) => setCarrer(e.target.value)}

                    >
                        
                        {Carrers.map((carrer)=> (
                            <option key={carrer.id} value={carrer.id}> 
                                {carrer.name}
                            </option>
                        ))}                      

                    </select>


                    <input
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título"
                    />
                    
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Desciption'
                    
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

                    <select
                        value={Stage}
                        onChange={(e) => setStage(e.target.value)}

                    >
                        
                        {Stages.map((stage)=> (
                            <option key={stage.id} value={stage.id}> 
                                {stage.stage}
                            </option>
                        ))}

                        

                    </select>

                    <div className="progressContainer">
                        <label htmlFor="progress">Progreso (%): {progressPercentage}%</label>
                        <input
                            type="range"
                            id="progress"
                            min="0"
                            max="100"
                            value={progressPercentage}
                            onChange={(e) => setProgressPercentage(e.target.value)}
                        />
                    </div>

                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button type='submit'> Subir archivo </button>
                </form>
            </div>
        </div>
    );
};

export default NewFile;
