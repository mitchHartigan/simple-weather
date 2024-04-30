function parseLocalTime(timeStr) {
  let fragments = timeStr.split("T");
  return fragments[1].slice(0, 2);
}

export function genDailyGraph(hourlyForecast) {
  let periods = hourlyForecast.slice(0, 24);

  periods = periods.filter((period, i) => {
    let hour = new Date(period.startTime).getHours();
    return hour % 3 == 0;
  });
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

export function genHourlyGraph(hourlyForecast) {
  const periods = hourlyForecast;
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
