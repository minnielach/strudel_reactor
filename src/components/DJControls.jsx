function DJControls({volume, onVolumeChange}) {
    return (
        <>
            <div className="input-group mb-3">
            <span className="input-group-text" id="cpm_label">setCPM</span>
            <input type="text" className="form-control" id="cpm_text_input"placeholder="120" aria-label="CPM" aria-describedby="cpm_label"/>
            </div>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range"/>

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
            
    </>
    );
}

export default DJControls;