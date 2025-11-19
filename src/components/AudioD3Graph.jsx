import * as d3 from "d3";
import {useEffect, useRef} from "react";

export default function AudioGraph({data}) {
    const ref = useRef();
    const frame = useRef();

    useEffect(() => {

        const audioData = Array.from({length:50}, ()=> Math.random()*100);

        const svg = d3.select(ref.current);
        const width = 300;
        const height = 100;

        svg.attr("width", width).attr("height", height);

        const xScale = d3.scaleLinear().domain([0, audioData.length - 1]).range([0, width]);

        const yScale = d3.scaleLinear().domain([d3.min(audioData), d3.max(audioData)]).range([height, 0]);

        const line = d3.line().x((_, i) => xScale(i)).y(d => yScale(d)).curve(d3.curveBasis);

        svg.selectAll("*").remove();

        const path = svg.append("path").datum(audioData).attr("fill", "none").attr("stroke","#8F00FF").attr("stroke-width", 2);

        function animate() {
            const audioData = Array.from({length:50}, (_, i) => {
                const t = Date.now() * 0.004;
                const wave = Math.sin(t + i + 0.3);
                return 60 + wave * 40 + Math.random() *5;
            });

            path.datum(audioData).attr("d",line);

            frame.current = requestAnimationFrame(animate);
        }

        animate();

        return ()=> cancelAnimationFrame(frame.current);

    }, [data]);

    return <svg ref={ref}></svg>

}