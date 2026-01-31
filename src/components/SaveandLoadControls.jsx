function SaveandLoadControls({onSave, onLoad, mixName, onMixNameChange, savedMix, selectMix, onSelectMixChange})
{
    return (
        <>
        {/* text input to save a mix name */}
        <input type="text" className="form-control" value={mixName} onChange={onMixNameChange} placeholder="Type your mix name!"/>

        {/* save and load button */} 
        <button onClick={onSave} style={{backgroundColor: "#8F00FF", color: "white", border: "white"}} className="btn btn-secondary">Save</button>

                {/* a dropdown menu to select your saved mixes */}
                <select className="form-select" value={selectMix} onChange={onSelectMixChange}>
            <option value="">Select your mix!</option>
            {savedMix.map(m => (
                <option key={m.name} value={m.name}>{m.name}</option>
            ))}
        </select>

        <button onClick={onLoad} style={{backgroundColor: "#8F00FF", color: "white", border: "white"}} className="btn btn-secondary">Load</button>

        </>
    );
}

export default SaveandLoadControls

