d3.json('data/forest.json').then((data) => {
    // Set up SVG container and dimensions
    const margin = { top: 20, right: 60, bottom: 50, left: 60 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Convert the data to an array of objects and prepare for stacking
    const dataset = [];
    Object.keys(data).forEach((year) => {
        const obj = { year };
        Object.entries(data[year]).forEach(([key, value]) => {
            obj[key] = value;
        });
        dataset.push(obj);
    });

    // Process data for stacking
    const keys = Object.keys(dataset[0]).filter((key) => key !== 'year');
    const stack = d3.stack().keys(keys);
    const stackedData = stack(dataset);

    // Define scales and axes
    const xScale = d3
        .scaleBand()
        .domain(dataset.map((d) => d.year))
        .range([0, width])
        .padding(0.1);
    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, (d) => d3.sum(keys, (k) => d[k]))])
        .nice()
        .range([height, 0]);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);
    svg.append('g').call(yAxis);

    // Create stacked bars with padding
    const barPadding = 1; // Small padding between rectangles
    const bars = svg
        .append('g')
        .selectAll('g')
        .data(stackedData)
        .enter()
        .append('g')
        .attr('fill', (d) => color(d.key))
        .selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.data.year))
        .attr('y', (d) => yScale(d[1]))
        .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
        .attr('width', xScale.bandwidth())
        .attr('stroke', '#fff') // White border
        .attr('stroke-width', 0.5) // Border width
        .attr('shape-rendering', 'crispEdges');

    // Add interactivity with tooltips and highlighting
    const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', '#fff')
        .style('border', '1px solid #000')
        .style('padding', '5px');

    bars.on('mouseover', function (e, d) {
        d3.select(this).attr('fill', (d) =>
            d3.color(color(d3.select(this.parentNode).datum().key)).brighter(1)
        ); // Highlight by making the color brighter
        tooltip
            .html(
                `Year: ${d.data.year}<br>${
                    d3.select(this.parentNode).datum().key
                }: ${d[1] - d[0]}`
            )
            .style('visibility', 'visible');
    })
        .on('mousemove', function (e) {
            tooltip
                .style('top', e.pageY - 10 + 'px')
                .style('left', e.pageX + 10 + 'px');
        })
        .on('mouseout', function () {
            d3.select(this).attr('fill', (d) =>
                color(d3.select(this.parentNode).datum().key)
            ); // Revert to original color
            tooltip.style('visibility', 'hidden');
        });
});
