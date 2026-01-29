import * as d3 from "d3";
import {useEffect, useRef} from "react";

export default function AudioGraph({data, graphStyle}) {
    const ref = useRef(); // reference for svg
    const frame = useRef(); // stores frame 

    useEffect(() => {

        // Create a placeholder for the graph of 50 random values
        const audioData = Array.from({length:50}, ()=> Math.random()*100);

        const svg = d3.select(ref.current);
        const width = 300;
        const height = 100;

        // set the width and height 
        svg.attr("width", width).attr("height", height);

        // remove old graph
        svg.selectAll("*").remove();

        // set the x Scale which is the point's position 
        const xScale = d3.scaleLinear().domain([0, audioData.length - 1]).range([0, width]);

        // set the y Scale which is the height of the graph 
        const yScale = d3.scaleLinear().domain([d3.min(audioData), d3.max(audioData)]).range([height, 0]);

        // creates a curve line to form waves
        const line = d3.line().x((_, i) => xScale(i)).y(d => yScale(d)).curve(d3.curveBasis);

        // variables set 
        let path = null;
        let bars = null;

        // if lines is selected 
        if (graphStyle === 'lines') {
            path = svg.append("path").datum(audioData).attr("fill", "none").attr("stroke", "#8F00FF").attr("stroke-width", 2);
        }

        // if bars is selected
        else if (graphStyle === 'bars') {
            const xBand = d3.scaleBand().domain(d3.range(audioData.length)).range([0, width]).padding(0.1);
            bars = svg.selectAll("rect").data(audioData).enter().append("rect").attr("x", (_,i) => xBand(i)).attr("width",xBand.bandwidth()).attr("fill", "#8F00FF");
        }

        // loop to create the animation for the waves for each frame (time movement and sin wave)
        function animate() {
            const audioData = Array.from({length:50}, (_, i) => {
                const t = Date.now() * 0.004;
                const wave = Math.sin(t + i + 0.3);
                return 60 + wave * 40 + Math.random() *5;
            });

            // update line shape
            if (graphStyle === 'lines') {
                path.datum(audioData).attr("d",line);
            }

            if (graphStyle === 'bars') {
                bars.data(audioData).attr("y", d => yScale(d)).attr("height", d => height - yScale(d));
            }

            // store the frame 
            frame.current = requestAnimationFrame(animate);
        }

        // start the animation
        animate();

        return ()=> cancelAnimationFrame(frame.current);

    }, [data, graphStyle]);

    return <svg ref={ref}></svg>

}