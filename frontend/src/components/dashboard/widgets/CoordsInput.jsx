import React, { useEffect, useState } from "react";
import styled from "styled-components";

export function CoordsInput(props) {
  const { lat, lng } = props.forecast.coordinates;
  const [value, setValue] = useState(`${lat},${lng}`);
  const [error, setError] = useState(false);

  useEffect(() => {
    const { lat, lng } = props.forecast.coordinates;
    const newValue = `${lat},${lng}`;
    setValue(newValue);
  }, []);

  // Warning! Copy and pasted from copilot lmao
  function isValidCoordinates(s) {
    const pattern =
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    return pattern.test(s);
  }

  function parseCoordString(str) {
    const coords = str.split(",");
    return { lat: coords[0], lng: coords[1].trim() };
  }

  function handleSubmit() {
    if (isValidCoordinates(value)) {
      const newCoords = parseCoordString(value);
      console.log("newCoords", newCoords);
      props.updateCoords(newCoords);
    }
  }

  // watch the value of the input.
  // if it changes, call update Coords with the new value as a parameter.

  return (
    <Container>
      <Input
        onBlur={handleSubmit}
        error={error}
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
      />
    </Container>
  );
}

const Container = styled.div``;

const Input = styled.input`
  font-family: Roboto;
`;
