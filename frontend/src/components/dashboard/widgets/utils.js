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
  let periods = hourlyForecast;

  periods = periods.filter((period, i) => {
    let hour = new Date(period.startTime).getHours();
    return hour % 2 == 0;
  });

  const graphData = [];

  for (let period of periods) {
    const {
      startTime,
      temperature,
      relativeHumidity,
      probabilityOfPrecipitation,
      dewpoint,
      icon,
      apparentTemperature,
      sunshineDuration,
      uvIndex,
      cloudCover,
      pressureMsl,
      surfacePressure,
    } = period;

    console.log(surfacePressure);

    const point = {
      time: parseLocalTime(startTime),
      date: formatDate(startTime),
      temperature,
      cloudCover,
      uvIndex: Math.round(uvIndex),
      sunshineDuration: Math.round(sunshineDuration),
      apparentTemperature: Math.round(apparentTemperature),
      precipitation: probabilityOfPrecipitation.value,
      relativeHumidity: relativeHumidity.value,
      dewpoint: celsiusToFahrenheit(dewpoint.value),
      pressureMsl,
      surfacePressure,
      icon,
    };

    graphData.push(point);
  }

  return graphData;
}

export function celsiusToFahrenheit(value) {
  return Math.round(Math.abs(value * (9 / 5) + 32));
}

export function metresToFeet(value) {
  return Math.round(value * 3.281);
}

function formatDate(dateString) {
  const date = new Date(dateString);

  // Get the full month name
  const month = date.toLocaleString("default", { month: "long" });

  // Extract the day of the month
  const day = date.getDate();

  // Add the ordinal suffix
  const suffix = getOrdinalSuffix(day);

  // Construct the final formatted string
  const formattedDate = `${month} ${day}${suffix}`;

  return formattedDate;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
