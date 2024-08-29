import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./NewFile.css";
import { useAppContext } from '../../AppContext';

const NewFile = ({ setupladovisible, userid }) => {
    const [docTypes, setDocTypes] = useState([]);
    const [carrers, setCarrers] = useState([]);
    const [stages, setStages] = useState([]);
    const [title, setTitle] = useState('');
    const [carrer, setCarrer] = useState('');
    const [stage, setStage] = useState('');
    const [code, setCode] = useState('');
    const [visible, setVisible] = useState(true);
    const [file, setFile] = useState(null); // Asegúrate de que sea null
    const [description, setDescription] = useState('');
    const [docType, setDocType] = useState('');
    const [progressPercentage, setProgressPercentage] = useState(100); // Valor por defecto al 100%
    const [error, setError] = useState('');

    const { PortToUse, getCookie } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('code', code);
        formData.append('title', title);
        formData.append('is_visible', visible);
        formData.append('description', description);
        formData.append('year', '2024');
        formData.append('file', file); // Archivo debe estar presente
        formData.append('progress_percentage', progressPercentage);
        formData.append('document_type', docType);
        formData.append('carrer', carrer);
        formData.append('stage', stage);

        try {
            const response = await axios.post(PortToUse + "api/file_docs/", formData, {
                headers: {
                    'Accept': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                withCredentials: true,
            });
            console.log("File uploaded successfully", response.data);
            setError(''); // Limpiar mensaje de error
            setupladovisible(false)
        } catch (error) {
            console.error("Error uploading file", error);
            setError('Error al subir el archivo.'); // Mensaje de error genérico
        }
    };

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
        } catch (error) {
            console.error("Error fetching carrers", error);
        }
    };

    const fetchStages = async () => {
        try {
            const response = await axios.get(PortToUse + "api/doc-stages/", {
                withCredentials: true,
            });
            setStages(response.data);
        } catch (error) {
            console.error("Error fetching document stages", error);
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
                <form onSubmit={handleSubmit}>
                    {error && <div className="error">{error}</div>} {/* Mostrar mensaje de error */}
                    
                    <select
                        value={carrer}
                        onChange={(e) => setCarrer(e.target.value)}
                        className='CarrerField'
                    >
                        <option value="">Choose a carrer</option>
                        {carrers.map((carrer) => (
                            <option key={carrer.id} value={carrer.id}>
                                {carrer.name}
                            </option>
                        ))}
                    </select>

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />

                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                    />

                    <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                    >
                        <option value="">Document Type</option>
                        {docTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                    >
                        <option value="">Stage</option>
                        {stages.map((stage) => (
                            <option key={stage.id} value={stage.id}>
                                {stage.stage}
                            </option>
                        ))}
                    </select>

                    <div className="progressContainer">
                        <label htmlFor="progress">Progress (%): {progressPercentage}%</label>
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

                    <button type='submit'>Upload Document</button>
                </form>
            </div>
        </div>
    );
};

export default NewFile;
