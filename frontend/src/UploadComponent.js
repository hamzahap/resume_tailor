import React, { useState } from 'react';

function UploadComponent() {
    const [file, setFile] = useState(null);
    const [sections, setSections] = useState({});
    const [selectedSections, setSelectedSections] = useState({});
    const [tailoredLatex, setTailoredLatex] = useState("");

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
            setSelectedSections(Object.keys(data.sections).reduce((acc, sectionTitle) => {
                acc[sectionTitle] = true;  // Initially, all sections are selected
                return acc;
            }, {}));
        }
        
    };

    const generateTailoredLatex = () => {

        console.log("selectedSections:", selectedSections);
        console.log("sections:", sections);

        const tailoredContent = Object.keys(selectedSections).filter(sectionTitle => selectedSections[sectionTitle]).map(sectionTitle => {
            return `\\section{${sectionTitle}}\n${sections[sectionTitle]}`;
        }).join("\n\n");

        console.log("tailoredContent:", tailoredContent);

        setTailoredLatex(tailoredContent);
    };
    

    
    const toggleSection = (sectionTitle) => {
        setSelectedSections(prevSelected => ({
            ...prevSelected,
            [sectionTitle]: !prevSelected[sectionTitle]
        }));
    };
    

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onUpload}>Upload</button>
            <div>
                {Object.keys(sections).map((sectionTitle, index) => (
                    <div key={index}>
                        <input 
                            type="checkbox" 
                            checked={selectedSections[sectionTitle]} 
                            onChange={() => toggleSection(sectionTitle)}
                        />
                        {sectionTitle}
                    </div>
                ))}
            </div>



            {/* Add the Generate Button */}
            <button onClick={generateTailoredLatex}>Generate</button>

            {/* Display the Tailored LaTeX */}
            <textarea value={tailoredLatex} readOnly rows="10" cols="50"></textarea>

        </div>
    );
}

export default UploadComponent;
