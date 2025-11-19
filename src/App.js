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
import ProcButtons from './components/ProcButtons';
import PreprocessTextarea from './components/PreprocessTextarea';
import { Preprocess } from './utils/PreprocessLogic';
import { saveSettings, loadSettings } from './utils/SaveandLoad';
import AudioGraph from './components/AudioD3Graph';

let globalEditor = null;

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        if (!globalEditor) return;
        let outputText = Preprocess({ inputText: procText, volume: volume, bassMute : bassMute, bassReverb : bassReverb, bassPitch : bassPitch, arpMute : arpMute, arpReverb : arpReverb, arpPitch : arpPitch, drumsMute : drumsMute, drumsReverb : drumsReverb, drumsPitch : drumsPitch, drums2Mute : drums2Mute, drums2Reverb : drums2Reverb, drums2Pitch : drums2Pitch});
        globalEditor.setCode(outputText);
        globalEditor.evaluate()
    }

    const handleStop = () => {
        if (!globalEditor) return;
        globalEditor.stop()
    }

    const [procText, setProcText] = useState(stranger_tune)

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

    const HandleSave = () => {
        const settings = {volume: volume, bassMute : bassMute, bassReverb : bassReverb, bassPitch : bassPitch, arpMute : arpMute, arpReverb : arpReverb, arpPitch : arpPitch, drumsMute : drumsMute, drumsReverb : drumsReverb, drumsPitch : drumsPitch, drums2Mute : drums2Mute, drums2Reverb : drums2Reverb, drums2Pitch : drums2Pitch};
        saveSettings(settings);
        alert("Saved!");
    };

    const HandleLoad = () => {
        const loaded = loadSettings();
        if (!loaded) {
            return alert("Saved settings not found!")
        };

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

    // useEffect for volume
    useEffect(() => {
        if (state == "play") {
            handlePlay();
        }
    }, [volume, bassMute, bassReverb, bassPitch, arpMute, arpReverb, arpPitch, drumsMute, drumsReverb, drumsPitch, drums2Mute, drums2Reverb, drums2Pitch]);


    // useEffect for proctext
    useEffect(() => {
        if (globalEditor) {
            globalEditor.setCode(procText);
        }
    }, [procText]);

    useEffect(() => {

    if (!hasRun.current) {

        document.addEventListener("d3Data", (event) => {
            setGraphAudio(event.detail);
        });

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


return (
    <div className="py-2 mt-2 container my-4">
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                    <PreprocessTextarea value={procText} onChange={(e) => setProcText(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <nav>
                            <ProcButtons/>
                            <br />
                            <PlayButtons onPlay={() => {setState("play"); handlePlay()}} onStop={() => {setState("stop"); handleStop()}}/>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <DJControls volume={volume} onVolumeChange={(e) => setVolume(parseFloat(e.target.value))}
                        onSave = {HandleSave} onLoad = {HandleLoad}
                        bassMute = {bassMute} onBassMuteChange={setBassMute} bassReverb={bassReverb} onBassReverbChange={setBassReverb} bassPitch={bassPitch} onBassPitchChange={setBassPitch}
                        arpMute = {arpMute} onArpMuteChange={setArpMute} arpReverb={arpReverb} onArpReverbChange={setArpReverb} arpPitch={arpPitch} onArpPitchChange={setArpPitch}
                        drumsMute = {drumsMute} onDrumsMuteChange={setDrumsMute} drumsReverb={drumsReverb} onDrumsReverbChange={setDrumsReverb} drumsPitch={drumsPitch} onDrumsPitchChange={setDrumsPitch}
                        drums2Mute = {drums2Mute} onDrums2MuteChange={setDrums2Mute} drums2Reverb={drums2Reverb} onDrums2ReverbChange={setDrums2Reverb} drums2Pitch={drums2Pitch} onDrums2PitchChange={setDrums2Pitch}
                    />

{console.log("GRAPH AUDIO:", graphAudio)}

                    <h5 className="mt-3">Audio Graph - PlaceHolder</h5>
                    <AudioGraph data={graphAudio}/>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}