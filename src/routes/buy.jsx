import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

export default function AddContactForm() {
  const storedId = localStorage.getItem("userId");
  if (!storedId) {
    window.location.href = "/";
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storedData = localStorage.getItem("userData");
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const token = localStorage.getItem("token");
  const headquarters = parsedData?.headquarters;
  const extractedParts = headquarters?.split("-", 2);
  const system = extractedParts?.join("-");
  const shipyard_system = localStorage.getItem("shipyard_symbol");
  const [shipyardData, setShipyardData] = useState(null);
  const [userMoney, setUserMoney] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `https://api.spacetraders.io/v2/systems/${system}/waypoints/${shipyard_system}/shipyard`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response1.status === 200) {
          const data1 = response1.data.data;
          setShipyardData(data1);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API 1 :",
          error
        );
      }
    };

    fetchData();

    const fetchUserMoney = async () => {
      try {
        const response2 = await axios.get(
          "https://api.spacetraders.io/v2/my/agent",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response2.status === 200) {
          const money = response2.data.data.credits;
          setUserMoney(money);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API 2 :",
          error
        );
      }
    };

    fetchUserMoney();
  }, [system, headquarters, token, shipyard_system]);

  const handleBuyClick = async (shipType, waypointSymbol) => {
    try {
      const response = await axios.post(
        "https://api.spacetraders.io/v2/my/ships",
        {
          shipType,
          waypointSymbol,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error purchasing ship:", error);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <p> Votre argent actuellement : {userMoney}</p>
      {shipyardData && shipyardData.ships && shipyardData.ships.length > 0 ? (
        <div>
          <h2>Liste des vaisseaux disponibles :</h2>
          {shipyardData.ships.map((ship, index) => (
            <div key={index}>
              <p>Nom: {ship.name}</p>
              <p>Prix: {ship.purchasePrice}</p>
              <p>Type de vaisseau: {ship.type}</p>
              <p>Description: {ship.description}</p>
              <button
                onClick={() => handleBuyClick(ship.type, shipyardData.symbol)}
              >
                Acheter
              </button>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun vaisseau n'est à vendre actuellement</p>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Purchase Confirmation"
      >
        <div>
          <p>Votre achat a été effectué avec succès !</p>
          <button onClick={handleCloseModal}>OK</button>
        </div>
      </Modal>
    </div>
  );
}
