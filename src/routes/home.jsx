import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddContactForm() {
  const storedId = localStorage.getItem("userId");
  if (!storedId) {
    window.location.href = "/";
  }
  const storedData = localStorage.getItem("userData");
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const name = parsedData.symbol;
  const token = localStorage.getItem("token");
  const headquarters = parsedData?.headquarters;
  const extractedParts = headquarters?.split("-", 2);
  const system = extractedParts?.join("-");
  const [shipyardData, setShipyardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.spacetraders.io/v2/systems/${system}/waypoints?traits=SHIPYARD`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.data;
          setShipyardData(data);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API :",
          error
        );
      }
    };

    // Appelez la fonction fetchData lors du rendu initial
    fetchData();
  }, [system, headquarters, token]);
  const handleGoButtonClick = (item) => {
    // Stocke la valeur item.symbol dans le localStorage
    localStorage.setItem("shipyard_symbol", item.symbol);

    // Redirige vers la page /buy
    window.location.href = "/buy";
  };

  return (
    <div>
      <h1> Bonjour {name} </h1>
      <Link to="/profil">Profil</Link>
      {/* Affichez les valeurs récupérées ici */}
      {shipyardData.map((item) => (
        <div key={item.symbol}>
          {/* Affichez les propriétés de chaque élément ici */}
          <p>Symbol: {item.symbol}</p>
          <p>Lieu: {item.type}</p>
          <p>
            Coordonnées: x({item.x}), y({item.y}){" "}
          </p>
          <button onClick={() => handleGoButtonClick(item)}> Go </button>
        </div>
      ))}
    </div>
  );
}
