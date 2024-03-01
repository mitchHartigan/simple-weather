export async function fetchData() {
  const response = await fetch("/dummy");
  const result = await response.json();
  console.log("result", result);
  const { message } = result;
  return message;
}
