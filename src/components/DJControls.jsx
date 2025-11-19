function DJControls({volume, onVolumeChange, onSave, onLoad, bassMute, onBassMuteChange, bassReverb, onBassReverbChange, bassPitch, onBassPitchChange, arpMute, onArpMuteChange, arpReverb, onArpReverbChange, arpPitch, onArpPitchChange, drumsMute, onDrumsMuteChange, drumsReverb, onDrumsReverbChange, drumsPitch, onDrumsPitchChange, drums2Mute, onDrums2MuteChange, drums2Reverb, onDrums2ReverbChange, drums2Pitch, onDrums2PitchChange}) {
    return (
        <>

            {/* volume slider */} 
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" value={volume} onChange={onVolumeChange} id="volume_range"/>

            {/* bass mute checkbox */} 
            <h5>Bass Controls</h5>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={bassMute === 0} onChange={(e) => onBassMuteChange(e.target.checked ? 0:1)}/>
                <label className ="form-check-label">Mute Base</label>
            </div>

            {/* bass reverb slider */} 
            <label>Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.1" value={bassReverb} onChange={(e) => onBassReverbChange(parseFloat(e.target.value))}/>
            
            {/* bass pitch slider */} 
            <label>Pitch</label>
            <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={bassPitch} onChange={(e) => onBassPitchChange(parseFloat(e.target.value))}/>

            {/* arp mute checkbox */} 
            <h5>Arp Controls</h5>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={arpMute === 0} onChange={(e) => onArpMuteChange(e.target.checked ? 0:1)}/>
                <label className ="form-check-label">Mute Arp</label>
            </div>

            {/* arp reverb slider */} 
            <label>Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.1" value={arpReverb} onChange={(e) => onArpReverbChange(parseFloat(e.target.value))}/>
            
            {/* arp pitch slider */} 
            <label>Pitch</label>
            <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={arpPitch} onChange={(e) => onArpPitchChange(parseFloat(e.target.value))}/>

            {/* drums mute checkbox */} 
            <h5>Drums Controls</h5>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={drumsMute === 0} onChange={(e) => onDrumsMuteChange(e.target.checked ? 0:1)}/>
                <label className ="form-check-label">Mute Drums</label>
            </div>

            {/* drums reverb slider */} 
            <label>Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.1" value={drumsReverb} onChange={(e) => onDrumsReverbChange(parseFloat(e.target.value))}/>
            
            {/* drums pitch slider */} 
            <label>Pitch</label>
            <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={drumsPitch} onChange={(e) => onDrumsPitchChange(parseFloat(e.target.value))}/>

            {/* drums 2 mute checkbox */} 
            <h5>Drums 2 Controls</h5>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={drums2Mute === 0} onChange={(e) => onDrums2MuteChange(e.target.checked ? 0:1)}/>
                <label className ="form-check-label">Mute Drums 2</label>
            </div>

            {/* drums 2 reverb slider */} 
            <label>Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.1" value={drums2Reverb} onChange={(e) => onDrums2ReverbChange(parseFloat(e.target.value))}/>
            
            {/* drums 2 pitch slider */} 
            <label>Pitch</label>
            <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={drums2Pitch} onChange={(e) => onDrums2PitchChange(parseFloat(e.target.value))}/>

            <hr />
            {/* save and load button */} 
            <button onClick={onSave} style={{backgroundColor: "#8F00FF", color: "white", border: "white"}} className="btn btn-secondary w-100 mt-2">Save</button>
            <button onClick={onLoad} style={{backgroundColor: "#8F00FF", color: "white", border: "white"}} className="btn btn-secondary w-100 mt-2">Load</button>
    </>
    );
}

export default DJControls;