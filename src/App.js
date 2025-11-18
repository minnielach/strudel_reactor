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

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        if (!globalEditor) return;
        let outputText = Preprocess({ inputText: procText, volume: volume});
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

    const HandleSave = () => {
        const settings = {volume: volume};
        saveSettings(settings);
        alert("Saved!");
    };

    const HandleLoad = () => {
        const loaded = loadSettings();
        if (!loaded) {
            return alert("Saved settings not found!")
        };

        setVolume(loaded.volume);
        alert("Loaded");

    };

    // useEffect for volume
    useEffect(() => {
        if (state == "play") {
            handlePlay();
        }
    }, [volume]);


    // useEffect for proctext
    useEffect(() => {
        if (globalEditor) {
            globalEditor.setCode(procText);
        }
    }, [procText]);

    useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
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
                    />
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}