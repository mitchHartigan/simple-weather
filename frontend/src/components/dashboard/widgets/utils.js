function parseLocalTime(timeStr) {
  let fragments = timeStr.split("T");
  return fragments[1].slice(0, 2);
}

export function genGraphData(hourlyForecast) {
  const periods = hourlyForecast.slice(0, 8);
  const graphData = [];

  for (let period of periods) {
    const { startTime, temperature } = period;
    const point = {
      time: parseLocalTime(startTime),
      temperature: temperature,
    };
    graphData.push(point);
  }

  return graphData;
}
