function PlayButtons({ onPlay , onStop }) {
    // buttons for the play and stop functions
    return (
        <>
        <div className="btn-group" role="group" aria-label="Basic mixed styles example"> 
        <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
        <button id="stop" className="btn btn-outline-primary" onClick={onStop}>Stop</button>
        </div>
        </>
    );
}

export default PlayButtons; 