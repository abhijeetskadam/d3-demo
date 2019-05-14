import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import "./styles.css";

function LineChart({ data, width, height, margin, gridLines }) {
  const h = height - 2 * margin;
  const w = width - 2 * margin;

  const points = data
    .map(p => ({
      x: new Date(p.x),
      y: p.y
    }))
    .sort((a, b) => b.x - a.x);

  const yFormat = d3.format(".2");

  //x scale
  const x = d3
    .scaleTime()
    .domain(d3.extent(points, d => d.x))
    .range([margin, w]);

  //y scale
  const y = d3
    .scaleLinear()
    .domain([d3.min(points, d => d.y), d3.max(points, d => d.y)])
    .range([h, margin]);

  const line = d3
    .line()
    .x(d => x(d.x))
    .y(d => y(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5));

  const xTicks = x.ticks(6).map((d, i) =>
    x(d) > margin && x(d) < w ? (
      <g key={`${i}`} transform={`translate(${x(d)},${h + margin})`}>
        <text>{d.toLocaleDateString("de")}</text>
        <text transform="translate(0, 15)">{d.toLocaleTimeString("de")}</text>
        <line x1="0" x2="0" y1="0" y2="5" transform="translate(0,-20)" />
      </g>
    ) : null
  );

  const yTicks = y.ticks(5).map((d, i) => (
    <g key={`${i}`} transform={`translate(${margin},${y(d)})`}>
      <text x="-12" y="5">
        {yFormat(d)}
      </text>
      <line stroke="#000" x2="-3" />
      {gridLines && (
        <line
          className="gridline"
          x1="0"
          x2={w - margin}
          y1="0"
          y2="0"
          transform="translate(-5,0)"
        />
      )}
    </g>
  ));

  return (
    <svg width={width} height={height}>
      <line className="axis" x1={margin} x2={w} y1={h} y2={h} />
      <line className="axis" x1={margin} x2={margin} y1={margin} y2={h} />
      <path d={line(points)} />
      <g className="axis__labels">{xTicks}</g>
      <g className="axis__labels">{yTicks}</g>
    </svg>
  );
}

LineChart.defaultProps = {
  width: 600,
  height: 400,
  margin: 10,
  gridLines: false
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.number
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  gridLines: PropTypes.bool
};

export default LineChart;
