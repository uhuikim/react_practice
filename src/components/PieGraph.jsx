import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieGraph = ({ data, title }) => {
  const pieChart = useRef();

  useEffect(() => {
    const pieData = d3.pie().value((d) => d.count)(data);

    const arc = d3.arc().innerRadius(0).outerRadius(200);
    const colors = d3.scaleOrdinal(['#ffa822', '#134e6f', '#ff6150', '#1ac0c6', '#dee0e6']);

    const svg = d3
      .select(pieChart.current)
      .attr('width', 600)
      .attr('height', 600)
      .style('background-color', 'yellow')
      .append('g')
      .attr('transform', 'translate(300,300)');

    const tooldiv = d3
      .select('#chart')
      .append('div')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background-color', 'red');

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
  }, []);

  return (
    <>
      <h2> {title} </h2>
      <div id="chart">
        <svg ref={pieChart} />
      </div>
    </>
  );
};

export default PieGraph;
