import React from "react";
export default function Modal(props) {
  return (
    <>
      <div className="modal modal-hide">
        <div>
          <img src={props.photo} alt=""></img>
          <h2>{props.name}</h2>
          <p>{props.email}</p>
          <p>{props.phone}</p>
          <button onClick={props.onClick}>Retour</button>
        </div>
      </div>
    </>
  );
}
