import React from "react";
// import { useAppContext } from "../AppContext";

const Card = ({ hour, temperature, humidity, windSpeed, value, goToHome }) => {
  return (
    <div className="card" onClick={goToHome}>
      <div className="hour">{hour}</div>
      <ItemCard span1={"Temperature:"} span2={temperature} />
      <ItemCard span1={"Humidity:"} span2={humidity} />
      <ItemCard span1={"Wind Speed:"} span2={windSpeed} />
      <ItemCard
        span1={"Evaporation Rate :"}
        span2={`${value} kg/m² per hour`}
        className={`${value < 0.9 ? "with-range" : "exceeded"}`}
      />
    </div>
  );
};

export default Card;

const ItemCard = ({ span1, span2, className }) => {
  return (
    <div className="item-card">
      <span>{span1}</span>
      <span className={className}>{span2}</span>
    </div>
  );
};
