import React, { useState } from 'react';

function UploadComponent() {
    const [file, setFile] = useState(null);
    const [sections, setSections] = useState([]);
    const [selectedSections, setSelectedSections] = useState([]);
    

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.sections) {
            setSections(data.sections);
            setSelectedSections(data.sections);  // Initially, all sections are selected
        }
    };

    const toggleSection = (section) => {
        if (selectedSections.includes(section)) {
            setSelectedSections(prevSections => prevSections.filter(s => s !== section));
        } else {
            setSelectedSections(prevSections => [...prevSections, section]);
        }
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onUpload}>Upload</button>
            <div>
                {sections.map((section, index) => (
                    <div key={index}>
                        <input 
                            type="checkbox" 
                            checked={selectedSections.includes(section)} 
                            onChange={() => toggleSection(section)}
                        />
                        {section}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UploadComponent;
