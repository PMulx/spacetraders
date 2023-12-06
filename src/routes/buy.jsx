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
  const token = localStorage.getItem("token");
  const headquarters = parsedData?.headquarters;
  const extractedParts = headquarters?.split("-", 2);
  const system = extractedParts?.join("-");
  const shipyard_system = localStorage.getItem("shipyard_symbol");
  const [shipyardData, setShipyardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.spacetraders.io/v2/systems/${system}/waypoints/${shipyard_system}/shipyard`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response);
          const data = response.data.data;
          setShipyardData(data);
          console.log(data);
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
  }, [system, headquarters, token, shipyard_system]);

  return (
    <div>
      {shipyardData && shipyardData.transactions && (
        <div>
          <h2>Liste des vaisseaux disponibles :</h2>
          {shipyardData.transactions.map((transaction, index) => (
            <div key={index}>
              <p>Agent Symbol: {transaction.agentSymbol}</p>
              <p>Price: {transaction.price}</p>
              <p>Ship Symbol: {transaction.shipSymbol}</p>
              <p>Timestamp: {transaction.timestamp}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
