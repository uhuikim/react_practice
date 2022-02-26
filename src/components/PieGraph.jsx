import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieGraph = ({ data, title }) => {
  const pieChart = useRef();

  useEffect(() => {
    const pieData = d3.pie().value((d) => d.count)(data);

    const arc = d3.arc().innerRadius(0).outerRadius(200);
    var colors = d3.scaleOrdinal().domain(pieData).range(d3.schemeSet2);

    const svg = d3
      .select(pieChart.current)
      .attr('width', 500)
      .attr('height', 500)
      .append('g')
      .attr('transform', 'translate(250,250)');

    const tooldiv = d3.select('#chart').append('div').style('visibility', 'hidden').style('position', 'absolute');

    svg
      .append('g')
      .selectAll('path')
      .data(pieData)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors(i))
      .attr('stroke', 'white')
      .on('mouseover', (i, d) => {
        tooldiv.style('visibility', 'visible').text(`${d.data.item} ${d.data.count}`);
      })
      .on('mousemove', (e) => {
        tooldiv.style('top', e.pageY - 50 + 'px').style('left', e.pageX - 50 + 'px');
      })
      .on('mouseout', () => {
        tooldiv.style('visibility', 'hidden');
      });
  }, [data]);

  return (
    <div className="chartBox">
      <h2> {title} </h2>
      <div id="chart">
        <svg ref={pieChart} />
      </div>
    </div>
  );
};

export default PieGraph;
