export async function getForecast(lat, lng) {
  const response = await fetch(`http://localhost:3000/forecast/${lat},${lng}`);
  const result = await response.json();
  return result;
}
