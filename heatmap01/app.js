async function draw(el, scale) {
  // Data
  const dataset = await d3.json("data.json");
  dataset.sort((a, b) => a - b);

  console.log(`dataset: ${JSON.stringify(dataset, null, 4)}`);
  // Dimensions
  let dimensions = {
    width: 600,
    height: 150,
  };

  const box = 30;

  // Draw Image
  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  // Scales
  let colorScale;

  if (scale === "linear") {
    colorScale = d3
      .scaleLinear()
      // returns an array with min and max values
      .domain(d3.extent(dataset))
      // d3js calculates css colors variations between white and red (numerically) accordingly with domain)
      .range(["white", "red"]);
  } else if (scale === "quantize") {
    colorScale = d3
      .scaleQuantize()
      .domain(d3.extent(dataset))
      .range(["white", "pink", "red"]);
  } else if (scale === "quantile") {
    console.log(`escale = ${scale}`);
    console.log(`d3.scaleQuantile = ${d3.scaleQuantile}`);
    colorScale = d3
      .scaleQuantile()
      .domain(dataset)
      .range(["white", "pink", "red"]);
  }

  // Rectangles
  svg
    .append("g")
    .attr("transform", "translate(2, 2)")
    .attr("stroke", "black")
    .attr("fill", "#ddd")
    .selectAll("rect")
    .data(dataset)
    .join("rect")
    .attr("width", box - 3)
    .attr("height", box - 3)
    .attr("x", (_d, i) => box * (i % 20)) // 0, 30, 60
    .attr("y", (_d, i) => box * ((i / 20) | 0))
    .attr("fill", colorScale);
}

draw("#heatmap1", "linear");
draw("#heatmap2", "quantize");
draw("#heatmap3", "quantile");
