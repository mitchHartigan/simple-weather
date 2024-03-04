import React from "react";

export function Overview(props) {
  const { periods } = props.forecast.properties;
  console.log("periods", periods);
  return (
    <div>
      <h1>Overview</h1>
      <h1>{periods[0].name}</h1>
      <h2>{periods[0].shortForecast}</h2>
      <h3>{periods[0].detailedForecast}</h3>
    </div>
  );
}
