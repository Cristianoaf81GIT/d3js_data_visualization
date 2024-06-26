async function draw() {
  // Data
  const dataset = await d3.json("data.json");

  const xAcessor = (d) => d.currently.humidity;

  // Dimensions
  let dimensions = {
    width: 800,
    height: 400,
    margins: 50,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

  // Draw Image
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr = svg
    .append("g") // <g>
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`,
    );

  // Scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAcessor))
    .range([0, dimensions.ctrWidth])
    .nice();

  // Draw bars
  ctr
    .selectAll("rect")
    .data(dataset)
    .join("rect")
    .attr("width", 5)
    .attr("height", 100)
    .attr("x", (d) => xScale(xAcessor(d)))
    .attr("y", 0);
}

draw();
