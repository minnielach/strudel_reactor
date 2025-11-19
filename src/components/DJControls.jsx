function DJControls({volume, onVolumeChange, onSave, onLoad, bassMute, onBassMuteChange, bassReverb, onBassReverbChange, bassPitch, onBassPitchChange, arpMute, onArpMuteChange, arpReverb, onArpReverbChange, arpPitch, onArpPitchChange, drumsMute, onDrumsMuteChange, drumsReverb, onDrumsReverbChange, drumsPitch, onDrumsPitchChange, drums2Mute, onDrums2MuteChange, drums2Reverb, onDrums2ReverbChange, drums2Pitch, onDrums2PitchChange}) {
    return (
        <>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" value={volume} onChange={onVolumeChange} id="volume_range"/>

            <h5>Bass Controls</h5>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={bassMute === 0} onChange={(e) => onBassMuteChange(e.target.checked ? 0:1)}/>
                <label className ="form-check-label">Mute Base</label>
            </div>

            <label>Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.1" value={bassReverb} onChange={(e) => onBassReverbChange(parseFloat(e.target.value))}/>
            
            <label>Pitch</label>
            <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={bassPitch} onChange={(e) => onBassPitchChange(parseFloat(e.target.value))}/>

            <h5>Arp Controls</h5>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={arpMute === 0} onChange={(e) => onArpMuteChange(e.target.checked ? 0:1)}/>
                <label className ="form-check-label">Mute Arp</label>
            </div>

            <label>Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.1" value={arpReverb} onChange={(e) => onArpReverbChange(parseFloat(e.target.value))}/>
            
            <label>Pitch</label>
            <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={arpPitch} onChange={(e) => onArpPitchChange(parseFloat(e.target.value))}/>

            <h5>Drums Controls</h5>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={drumsMute === 0} onChange={(e) => onDrumsMuteChange(e.target.checked ? 0:1)}/>
                <label className ="form-check-label">Mute Drums</label>
            </div>

            <label>Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.1" value={drumsReverb} onChange={(e) => onDrumsReverbChange(parseFloat(e.target.value))}/>
            
            <label>Pitch</label>
            <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={drumsPitch} onChange={(e) => onDrumsPitchChange(parseFloat(e.target.value))}/>


            <h5>Drums 2 Controls</h5>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={drums2Mute === 0} onChange={(e) => onDrums2MuteChange(e.target.checked ? 0:1)}/>
                <label className ="form-check-label">Mute Drums 2</label>
            </div>

            <label>Reverb</label>
            <input type="range" className="form-range" min="0" max="1" step="0.1" value={drums2Reverb} onChange={(e) => onDrums2ReverbChange(parseFloat(e.target.value))}/>
            
            <label>Pitch</label>
            <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={drums2Pitch} onChange={(e) => onDrums2PitchChange(parseFloat(e.target.value))}/>

            <hr />
            <button onClick={onSave} className="btn btn-secondary w-100 mt-2">Save</button>
            <button onClick={onLoad} className="btn btn-secondary w-100 mt-2">Load</button>
    </>
    );
}

export default DJControls;