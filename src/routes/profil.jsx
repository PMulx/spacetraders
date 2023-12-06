import React from "react";
import { Link } from "react-router-dom";

export default function AddContactForm() {
  const storedId = localStorage.getItem("userId");
  if (!storedId) {
    window.location.href = "/";
  }
  const storedData = localStorage.getItem("userData");
  const parsedData = storedData ? JSON.parse(storedData) : null;

  return (
    <div>
      {" "}
      <Link to="/home">Retour</Link>
      <h1> PROFIL </h1>
      {parsedData ? (
        <ul>
          <li>Bonjour {parsedData.symbol} </li>
          <li>Crédits: {parsedData.credits}</li>
          <li>HeadQuarters: {parsedData.headquarters}</li>
          <li>Nombre de vaisseau: {parsedData.shipCount}</li>
          <li>Lieu de start: {parsedData.startingFaction}</li>
        </ul>
      ) : (
        <p>Aucune donnée trouvée pour votre agent.</p>
      )}{" "}
    </div>
  );
}
