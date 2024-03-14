function parseLocalTime(timeStr) {
  let fragments = timeStr.split("T");
  return fragments[1].slice(0, 2);
}

export function genGraphData(hourlyForecast) {
  const periods = hourlyForecast.slice(0, 8);
  const graphData = [];

  for (let period of periods) {
    const { startTime, temperature, icon } = period;
    const point = {
      time: parseLocalTime(startTime),
      temperature,
      icon,
    };
    graphData.push(point);
  }

  return graphData;
}

export function celsiusToFahrenheit(value) {
  return Math.abs(value * (9 / 5) + 32);
}

export function metresToFeet(value) {
  return Math.round(value * 3.281);
}
