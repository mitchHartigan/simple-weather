import React from "react";

export function Overview(props) {
  const { periods } = props.forecast.properties;
  return (
    <div>
      <h1>Overview</h1>
      <img
        src={periods[0].icon}
        width="120px"
        height="120px"
        alt="weather icon"
      />
      <h1>{periods[0].name}</h1>
      <h2>{periods[0].shortForecast}</h2>
      <h3>{periods[0].detailedForecast}</h3>
    </div>
  );
}
