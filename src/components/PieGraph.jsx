import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieGraph = ({ data, title }) => {
  const pieChart = useRef();

  useEffect(() => {
    const width = 500;
    const height = 500;
    const margin = 50;

    const radius = Math.min(width, height) / 2.3 - margin;
    const pieData = d3.pie().value((d) => d.count)(data);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcLabel = (() => {
      const radius = (Math.min(width, height) / 2) * 0.77;
      return d3.arc().innerRadius(radius).outerRadius(radius);
    })();

    var colors = d3.scaleOrdinal().domain(pieData).range(d3.schemeSet2);

    const svg = d3.select(pieChart.current).attr('width', width).attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    g.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('fill', (d, i) => colors(i))
      .attr('stroke', 'white')
      .attr('d', arc);

    g.selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .text(function (d) {
        return `${d.data.item} : ${d.data.count}`;
      })
      .attr('transform', (d) => `translate(${arcLabel.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-weight', 'bold')
      .style('font-size', 14);
  }, []);

  return (
    <div>
      <h2> {title} </h2>
      <div id="chart">
        <svg ref={pieChart} />
      </div>
    </div>
  );
};

export default PieGraph;
