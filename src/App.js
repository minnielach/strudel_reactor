import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import PreprocessTextarea from './components/PreprocessTextarea';
import { Preprocess } from './utils/PreprocessLogic';
import { saveSettings, loadSettings, loadByName } from './utils/SaveandLoad';
import AudioGraph from './components/AudioD3Graph';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

let globalEditor = null;

export default function StrudelDemo() {

    const hasRun = useRef(false);

    // created the refs for the web audio and animation frames to allow rerendering
    const analyser = useRef(null);
    const requestAnimationFrames = useRef(null);

    // starts reading the audio signals 
    const startAnalyser = () => {
        // if the animation is already occuring, dont reloop it
        if (requestAnimationFrames.current) return;

        // get the audio context
        const audioContext = getAudioContext();

        /// create the analayser 
        if (!analyser.current) {
            analyser.current = audioContext.createAnalyser();
            // give the analyser a window size of 256 so it is smoother
            analyser.current.fftSize = 256;
        }

        // create a buffer of an array to hold data
        const bufferLength = analyser.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // ensures that the analyser keeps reading the audio
        const tick = () => {
            // grabs the audio data and fills them into the array
            analyser.current.getByteFrequencyData(dataArray);
            // saves the array
            setGraphAudio(Array.from(dataArray));
            // continues to the next frame
            requestAnimationFrames.current = requestAnimationFrame(tick);
        };

        tick();

    };

    // stops reading the analyser data
    const stopAnalyser = () => {
        // if animation is occuring then stops it
        if (requestAnimationFrames.current) {
            // cancles animal frames
            cancelAnimationFrame(requestAnimationFrames.current);
            // animation frames will then = null
            requestAnimationFrames.current = null;
        }
    }

    // handles starting and evaluating the audio 
    const handlePlay = () => {
        if (!globalEditor) return;
        let outputText = Preprocess({ inputText: procText, volume: volume, bassMute : bassMute, bassReverb : bassReverb, bassPitch : bassPitch, arpMute : arpMute, arpReverb : arpReverb, arpPitch : arpPitch, drumsMute : drumsMute, drumsReverb : drumsReverb, drumsPitch : drumsPitch, drums2Mute : drums2Mute, drums2Reverb : drums2Reverb, drums2Pitch : drums2Pitch});
        globalEditor.setCode(outputText);
        globalEditor.evaluate()

        // start analyser when music is playing
        startAnalyser();
    }

    // handles stopping the audio
    const handleStop = () => {
        if (!globalEditor) return;
        globalEditor.stop()

        // stops analyser when music is paused
        stopAnalyser();
    }

    // use states
    const [selectInstrument, setSelectInstrument] = useState("bass");

    const [procText, setProcText] = useState(stranger_tune);

    const [volume, setVolume] = useState(1);

    const [state, setState] = useState("stop");    

    const[bassMute, setBassMute] = useState(1);
    const[bassReverb, setBassReverb] = useState(0.2);
    const[bassPitch, setBassPitch] = useState(1);

    const[arpMute, setArpMute] = useState(1);
    const[arpReverb, setArpReverb] = useState(0.2);
    const[arpPitch, setArpPitch] = useState(1);

    const[drumsMute, setDrumsMute] = useState(1);
    const[drumsReverb, setDrumsReverb] = useState(0.2);
    const[drumsPitch, setDrumsPitch] = useState(1);

    const[drums2Mute, setDrums2Mute] = useState(1);
    const[drums2Reverb, setDrums2Reverb] = useState(0.2);
    const[drums2Pitch, setDrums2Pitch] = useState(1);

    const [graphAudio, setGraphAudio] = useState ([]);
    const [graphStyle, setGraphStyle] = useState ("lines");

    const [mixName, setMixName] = useState ("");
    const [savedMix, setSavedMix] = useState ([]);
    const [selectMix, setSelectMix] = useState ("");


    // handles saving the settings to the local storage (taking into account all the variables)
    const HandleSave = () => {
        const settings = {volume: volume, bassMute : bassMute, bassReverb : bassReverb, bassPitch : bassPitch, arpMute : arpMute, arpReverb : arpReverb, arpPitch : arpPitch, drumsMute : drumsMute, drumsReverb : drumsReverb, drumsPitch : drumsPitch, drums2Mute : drums2Mute, drums2Reverb : drums2Reverb, drums2Pitch : drums2Pitch};
        // saves mixes by their name
        const updateList = saveSettings(settings, mixName)
        setSavedMix(updateList);
        alert("Saved!");
    };

    // loads the saved settings from local storage
    const HandleLoad = () => {
        // returns the name and settings and  if there is no saved settings, then alerts user if not found
        const loadName = loadByName(selectMix);
        if (!loadName) {
            return alert("Saved settings not found!")
        };

        // loads settings of picked mix name
        const loaded = loadName.settings

        setVolume(loaded.volume);
        setBassMute(loaded.bassMute);
        setBassReverb(loaded.bassReverb);
        setBassPitch(loaded.bassPitch);
        setArpMute(loaded.arpMute);
        setArpReverb(loaded.arpReverb);
        setArpPitch(loaded.arpPitch);
        setDrumsMute(loaded.drumsMute);
        setDrumsReverb(loaded.drumsReverb);
        setDrumsPitch(loaded.drumsPitch);
        setDrums2Mute(loaded.drums2Mute);
        setDrums2Reverb(loaded.drums2Reverb);
        setDrums2Pitch(loaded.drums2Pitch);
        alert("Loaded");

    };

    // useEffect for all variables so if any changes happen, they will update those settings
    useEffect(() => {
        if (state == "play") {
            handlePlay();
        }
    }, [volume, bassMute, bassReverb, bassPitch, arpMute, arpReverb, arpPitch, drumsMute, drumsReverb, drumsPitch, drums2Mute, drums2Reverb, drums2Pitch]);

    // useEffect for loading settings 
    useEffect(() => {
        setSavedMix(loadSettings());
    }, []);

    // useEffect for proctext
    useEffect(() => {
        if (globalEditor) {
            globalEditor.setCode(procText);
        }
    }, [procText]);

    useEffect(() => {

    if (!hasRun.current) {

        //document.addEventListener("d3Data", (event) => {
           // setGraphAudio(event.detail);
        // });

        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        globalEditor.setCode(procText);
    }

}, [procText]);

// UI display
return (
    <div className="py-2 mt-2 container my-4">
        <h2>Strudel Demo</h2>
        <main>
        <div className="container-fluid">
                <div className="row">

                    <div className="col-md-8">
                    <PreprocessTextarea value={procText} onChange={(e) => setProcText(e.target.value)} />
                    <div id="editor" style={{marginTop: "20px", overflowY: "auto", height: "650px"}}></div>
                    <div id="output"></div>
                    </div>
                    <div className="col-md">
                        <nav>
                            <PlayButtons onPlay={() => {setState("play"); handlePlay()}} onStop={() => {setState("stop"); handleStop()}}/>
                            <br />
                            <br />
                            <DJControls volume={volume} onVolumeChange={(e) => setVolume(parseFloat(e.target.value))}

                            selectInstrument={selectInstrument} onInstrumentChange={(e) => setSelectInstrument(e.target.value)}
                        
                            bassMute = {bassMute} onBassMuteChange={setBassMute} bassReverb={bassReverb} onBassReverbChange={setBassReverb} bassPitch={bassPitch} onBassPitchChange={setBassPitch}
                            arpMute = {arpMute} onArpMuteChange={setArpMute} arpReverb={arpReverb} onArpReverbChange={setArpReverb} arpPitch={arpPitch} onArpPitchChange={setArpPitch}
                            drumsMute = {drumsMute} onDrumsMuteChange={setDrumsMute} drumsReverb={drumsReverb} onDrumsReverbChange={setDrumsReverb} drumsPitch={drumsPitch} onDrumsPitchChange={setDrumsPitch}
                            drums2Mute = {drums2Mute} onDrums2MuteChange={setDrums2Mute} drums2Reverb={drums2Reverb} onDrums2ReverbChange={setDrums2Reverb} drums2Pitch={drums2Pitch} onDrums2PitchChange={setDrums2Pitch}
                            mixName = {mixName} onMixNameChange={(e) => setMixName(e.target.value)} savedMix={savedMix} selectMix={selectMix} onSelectMixChange={(e) => setSelectMix(e.target.value)}
                            onSave = {HandleSave} onLoad = {HandleLoad}
                            graphStyle={graphStyle} onGraphStyleChange={(e) => setGraphStyle(e.target.value)}
                            />
                            <AudioGraph data={graphAudio} graphStyle={graphStyle}/>
                        </nav>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}