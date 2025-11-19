import * as d3 from "d3";
import {useEffect, useRef} from "react";

export default function AudioGraph({data}) {
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

        // set the x Scale which is the point's position 
        const xScale = d3.scaleLinear().domain([0, audioData.length - 1]).range([0, width]);

        // set the y Scale which is the height of the graph 
        const yScale = d3.scaleLinear().domain([d3.min(audioData), d3.max(audioData)]).range([height, 0]);

        // creates a curve line to form waves
        const line = d3.line().x((_, i) => xScale(i)).y(d => yScale(d)).curve(d3.curveBasis);

        // remove the old lines before the new ones
        svg.selectAll("*").remove();

        // sets colour and stroke-width and sets the path
        const path = svg.append("path").datum(audioData).attr("fill", "none").attr("stroke","#8F00FF").attr("stroke-width", 2);

        // loop to create the animation for the waves for each frame (time movement and sin wave)
        function animate() {
            const audioData = Array.from({length:50}, (_, i) => {
                const t = Date.now() * 0.004;
                const wave = Math.sin(t + i + 0.3);
                return 60 + wave * 40 + Math.random() *5;
            });

            // update line shape
            path.datum(audioData).attr("d",line);

            // store the frame 
            frame.current = requestAnimationFrame(animate);
        }

        // start the animation
        animate();

        return ()=> cancelAnimationFrame(frame.current);

    }, [data]);

    return <svg ref={ref}></svg>

}