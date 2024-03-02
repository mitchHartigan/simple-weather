// take coordinates as string in url endpoint.
// coordinates are going to be supplied by us from the leaflet map and not by the end user.

export function parseCoordinates(str: String) {
  const coords = str.split(",");
  return { latitude: coords[0], longitude: coords[1] };
}

export async function getForecastRegion(
  latitude: any,
  longitude: any
): Promise<URL> {
  const url = `https://api.weather.gov/points/${latitude},${longitude}`;
  console.log("url", url);
  const response = await fetch(url);
  const result: any = await response.json();
  const endpoint = result.properties.forecast;
  return endpoint;
}

export async function getWeeklyForecast(url: URL) {
  const response = await fetch(url);
  const result: any = await response.json();
  console.log("result", result);
  const { periods } = result.properties;
  const { coordinates } = result.geometry;
  const polygonCoords = formatPolygon(coordinates[0]);
  return { periods, polygonCoords };
}

function formatPolygon(coordinates: any) {
  // strip duplicate starting coordinate.
  coordinates.splice(4, 1);

  // put latitude first in front of longitude. Not sure
  // why they are reversed in weather gov API response...
  for (let coordinate of coordinates) {
    coordinate.reverse();
  }

  return coordinates;
}
