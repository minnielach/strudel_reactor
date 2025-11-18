function DJControls({volume, onVolumeChange, onSave, onLoad}) {
    return (
        <>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" value={volume} onChange={onVolumeChange} id="volume_range"/>

            <div className="form-check"> 
                <input className="form-check-input" type="checkbox" value="" id="drums"/> 
                <label className="form-check-label" htmlFor="drums">
                     drums
                </label> 
            </div> 
            <div className="form-check"> 
                <input className="form-check-input" type="checkbox" value="" id="basslines"/> 
                <label className="form-check-label" htmlFor="basslines">
                     basslines
                </label> 
            </div> 
            <div className="form-check"> 
                <input className="form-check-input" type="checkbox" value="" id="appregaitor1"/> 
                <label className="form-check-label" htmlFor="appregaitor1">
                    appregaitor1
                </label> 
            </div> 
            <div className="form-check"> 
                <input className="form-check-input" type="checkbox" value="" id="appregaitor2"/> 
                <label className="form-check-label" htmlFor="appregaitor2">
                    appregaitor2
                </label> 
            </div> 
            
            <hr />
            <button onClick={onSave} className="btn btn-secondary w-100 mt-2">Save</button>
            <button onClick={onLoad} className="btn btn-secondary w-100 mt-2">Load</button>
    </>
    );
}

export default DJControls;