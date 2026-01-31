function DJControls({volume, onVolumeChange, bassMute, onBassMuteChange, bassReverb, onBassReverbChange, bassPitch, onBassPitchChange, arpMute, onArpMuteChange, arpReverb, onArpReverbChange, arpPitch, onArpPitchChange, drumsMute, onDrumsMuteChange, drumsReverb, onDrumsReverbChange, drumsPitch, onDrumsPitchChange, drums2Mute, onDrums2MuteChange, drums2Reverb, onDrums2ReverbChange, drums2Pitch, onDrums2PitchChange, selectInstrument, onInstrumentChange, graphStyle, onGraphStyleChange}) {
    return (
        <>
           
            {/* drop box for instrument editor*/}
            <div className="dropdown">
                <div className="mb-3">
                    <h5 className="neonTitle">Select Instrument</h5>
                    <select className="form-select" value={selectInstrument} onChange={onInstrumentChange}>
                        <option value="bass">Bass</option>
                        <option value="arp">Arp</option>
                        <option value="drums">Drums</option>
                        <option value="drums2">Second Drums</option>
                    </select>
                </div>
            </div>

            {/* bass mute checkbox, reverb slider, pitch slider */} 
            {selectInstrument == "bass" && (
                <>
                <h5 className="neonTitle">Bass Controls</h5>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={bassMute === 0} onChange={(e) => onBassMuteChange(e.target.checked ? 0:1)}/>
                    <label className ="form-check-label">Mute Base</label>
                </div>

                <label >Reverb</label>
                <input type="range" className="form-range" min="0" max="1" step="0.1" value={bassReverb} onChange={(e) => onBassReverbChange(parseFloat(e.target.value))}/>

                <label>Pitch</label>
                <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={bassPitch} onChange={(e) => onBassPitchChange(parseFloat(e.target.value))}/>
                </>
            )}

            {/* arp mute checkbox, reberb slider, pitch slider */} 
            {selectInstrument == "arp" && (
                <>
                <h5 className="neonTitle">Arp Controls</h5>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={arpMute === 0} onChange={(e) => onArpMuteChange(e.target.checked ? 0:1)}/>
                    <label className ="form-check-label">Mute Arp</label>
                </div>

                <label>Reverb</label>
                <input type="range" className="form-range" min="0" max="1" step="0.1" value={arpReverb} onChange={(e) => onArpReverbChange(parseFloat(e.target.value))}/>
                
                <label>Pitch</label>
                <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={arpPitch} onChange={(e) => onArpPitchChange(parseFloat(e.target.value))}/>
                </>

            )}

            {/* drums mute checkbox, reverb slider, pitch slider */} 
            {selectInstrument == "drums" && (
                <>  
                <h5 className="neonTitle">Drums Controls</h5>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={drumsMute === 0} onChange={(e) => onDrumsMuteChange(e.target.checked ? 0:1)}/>
                    <label className ="form-check-label">Mute Drums</label>
                </div>

                <label>Reverb</label>
                <input type="range" className="form-range" min="0" max="1" step="0.1" value={drumsReverb} onChange={(e) => onDrumsReverbChange(parseFloat(e.target.value))}/>
                
                <label>Pitch</label>
                <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={drumsPitch} onChange={(e) => onDrumsPitchChange(parseFloat(e.target.value))}/>
                </>
            )}

            {/* drums 2 mute checkbox, reverb slider, pitch slider */} 
            {selectInstrument == "drums2" && (
                <>
                <h5 className="neonTitle">Drums 2 Controls</h5>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={drums2Mute === 0} onChange={(e) => onDrums2MuteChange(e.target.checked ? 0:1)}/>
                    <label className ="form-check-label">Mute Drums 2</label>
                </div>

                <label>Reverb</label>
                <input type="range" className="form-range" min="0" max="1" step="0.1" value={drums2Reverb} onChange={(e) => onDrums2ReverbChange(parseFloat(e.target.value))}/>
                
                <label>Pitch</label>
                <input type="range" className="form-range" min="0.2" max="2" step="0.1" value={drums2Pitch} onChange={(e) => onDrums2PitchChange(parseFloat(e.target.value))}/>
                </>
            )}

            <hr />
            {/* radio buttons for graph styles */}
            {/* lines */}
            <h5 className="neonTitle">Sound Waves</h5>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="graphStyle" value="lines" checked={graphStyle === "lines"} onChange={onGraphStyleChange}/>
                <label className="form-check-label">Lines</label>
            </div>

            {/* bars */}
            <div className="form-check">
                <input className="form-check-input" type="radio" name="graphStyle" value="bars" checked={graphStyle === "bars"} onChange={onGraphStyleChange}/>
                <label className="form-check-label">Bars</label>
            </div>

    </>
    );
}

export default DJControls;