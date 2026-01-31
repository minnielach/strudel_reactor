function VolumeSlider({volume, onVolumeChange})
{
    return (
        <>
        {/* volume slider */} 
        <input type="range" className="form-range" min="0" max="2" step="0.01" value={volume} onChange={onVolumeChange} id="volume_range"/>
        
        </>
    )

}

export default VolumeSlider;
