function PlayButtons({ onPlay , onStop }) {
    // style 
    const buttonStyle = {
        backgroundColor : "#8F00FF",
        color: "white",
        border: "white"

    };
    // buttons for the play and stop functions
    return (
        <>
        <div className="btn-group" role="group" aria-label="Basic mixed styles example"> 
        <button id="play" className="btn btn-secondary w-100 mt-2" onClick={onPlay} style={buttonStyle}>Play</button>
        <button id="stop" className="btn btn-secondary w-100 mt-2" onClick={onStop} style={buttonStyle}>Stop</button>
        </div>
        </>
    );
}

export default PlayButtons; 