import React from "react";

export default function Card(props) {
  return (
    <div className="card" onClick={props.onClick}>
      <img className="image-robot" src={props.photo} alt="image1" />
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  );
}
