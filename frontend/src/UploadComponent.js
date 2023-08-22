import React, { useState } from 'react';

function UploadComponent() {
    const [file, setFile] = useState(null);
    const [sections, setSections] = useState({});
    const [selectedSections, setSelectedSections] = useState({});
    const [tailoredLatex, setTailoredLatex] = useState("");
    const [editingSection, setEditingSection] = useState(null);
    const [sectionIdentifier, setSectionIdentifier] = useState('');


    const handleSetSectionIdentifier = () => {
        fetch('/set_section_identifier', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                section_identifier: sectionIdentifier
            })
        });
    };
    

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

    // const generateTailoredLatex = () => {

    //     // Debugging
    //     // console.log("selectedSections:", selectedSections);
    //     // console.log("sections:", sections);

    //     const tailoredContent = Object.keys(selectedSections).filter(sectionTitle => selectedSections[sectionTitle]).map(sectionTitle => {
    //         return `\\section{${sectionTitle}}\n${sections[sectionTitle]}`;
    //     }).join("\n\n");

    //     console.log("tailoredContent:", tailoredContent);

    //     setTailoredLatex(tailoredContent);
    // };

    const generateTailoredLatex = () => {
        const orderedSectionTitles = Object.keys(sections); // This will have the rearranged order
    
        const tailoredContent = orderedSectionTitles.filter(sectionTitle => selectedSections[sectionTitle]).map(sectionTitle => {
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

    const handleSectionEdit = (sectionTitle, editedContent) => {
        setSections(prevSections => ({
            ...prevSections,
            [sectionTitle]: editedContent
        }));
    };


    const moveSection = (sectionTitle, direction) => {
        const sectionTitles = Object.keys(sections);
        const index = sectionTitles.indexOf(sectionTitle);

        const newSectionTitles = [...sectionTitles];
        newSectionTitles.splice(index, 1); // Remove the current title
        
        if (direction === "up") {
            newSectionTitles.splice(index - 1, 0, sectionTitle);
        } else {
            newSectionTitles.splice(index + 1, 0, sectionTitle);
        }

        const newSections = {};
        newSectionTitles.forEach(title => {
            newSections[title] = sections[title];
        });

        setSections(newSections);
    };
    
    

    return (
        <div>
        <div>
            <label>
                Section Identifier : 
                <input 
                    type="text" 
                    value={sectionIdentifier} 
                    onChange={e => setSectionIdentifier(e.target.value)} 
                    placeholder="Enter your LaTeX section identifier"
                />
            </label>
            <button onClick={handleSetSectionIdentifier}>Set Identifier</button>
        </div>

        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onUpload}>Upload</button>

            <div className="section-container">
                {Object.keys(sections).map((sectionTitle, index) => (
                    <div className="section-item" key={sectionTitle}>
                        <div className="section-row">
                            <input 
                                type="checkbox" 
                                className="section-checkbox"
                                checked={selectedSections[sectionTitle] || false} 
                                onChange={() => toggleSection(sectionTitle)} 
                            />
                            <label>{sectionTitle}</label>
                            <button onClick={() => {
                                if (editingSection === sectionTitle) {
                                    setEditingSection(null);
                                } else {
                                    setEditingSection(sectionTitle);
                                }
                            }}>Edit</button>
                            {index !== 0 && <button onClick={() => moveSection(sectionTitle, "up")}>↑</button>}
                            {index !== Object.keys(sections).length - 1 && <button onClick={() => moveSection(sectionTitle, "down")}>↓</button>}
                        </div>
                        
                        {editingSection === sectionTitle && (
                            <textarea 
                                value={sections[sectionTitle]}
                                onChange={e => handleSectionEdit(sectionTitle, e.target.value)}
                                rows="5" 
                                cols="50"
                            ></textarea>
                        )}
                    </div>
                ))}
            </div>



            <div className="section-container">
            {/* Add the Generate Button */}
            <button className="generate-button" onClick={generateTailoredLatex}>Generate</button>
            </div>
            {/* Display the Tailored LaTeX */}
            <textarea value={tailoredLatex} readOnly rows="10" cols="50"></textarea>

        </div>
        </div>
    );
}

export default UploadComponent;
