import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [shipData, setShipData] = useState([]);

  const [scanResult, setScanResult] = useState([]);

  const [navigateData, setNavigateData] = useState(null);

  const handleNavigate = async (shipSymbol, waypointSymbol) => {
    try {
      const response = await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/navigate`,
        {
          waypointSymbol: waypointSymbol,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.data;
        console.log(data);
        setNavigateData(data);
        // Ajoutez ici la logique supplémentaire si nécessaire
        window.location.reload();
      } else {
        console.log(response);
        // Gérez l'erreur selon vos besoins
      }
    } catch (error) {
      console.error("Erreur lors de la navigation :", error);
      // Gérez l'erreur selon vos besoins
    }
  };

  const handleOrbit = async (shipSymbol) => {
    try {
      const response = await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Le vaisseau est revenu en orbite avec succès !");
        // Ajoutez ici la logique supplémentaire si nécessaire

        // Rafraîchissez la page
        window.location.reload();
      } else {
        console.log(response);
        // Gérez l'erreur selon vos besoins
      }
    } catch (error) {
      console.error("Erreur lors de l'opération de retour en orbite :", error);
      // Gérez l'erreur selon vos besoins
    }
  };

  const handleDock = async (shipSymbol) => {
    try {
      const response = await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Le vaisseau s'est posé avec succès !");
        window.location.reload();
        // Ajoutez ici la logique supplémentaire si nécessaire
      } else {
        console.log(response);
        // Gérez l'erreur selon vos besoins
      }
    } catch (error) {
      console.error("Erreur lors de l'opération de docking :", error);
      // Gérez l'erreur selon vos besoins
    }
  };

  const handleSellCargo = async (shipSymbol, cargoSymbol, maxUnits) => {
    const unitsToSell = prompt(
      `Combien d'unités de ${cargoSymbol} voulez-vous vendre ? (maximum: ${maxUnits})`
    );

    if (unitsToSell === null || isNaN(unitsToSell)) {
      alert("Veuillez entrer un nombre valide.");
      return;
    }

    const sellPayload = {
      symbol: cargoSymbol,
      units: parseInt(unitsToSell),
    };

    try {
      const response = await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/sell`,
        sellPayload,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(
          `Vente réussie de ${unitsToSell} unités de ${cargoSymbol}.`
        );
        // Rafraîchissez la page ou effectuez d'autres actions nécessaires
        window.location.reload();
      } else {
        console.log(response);
        // Gérez l'erreur selon vos besoins
      }
    } catch (error) {
      console.error("Erreur lors de la vente du cargo :", error);
      // Gérez l'erreur selon vos besoins
    }
  };

  const handleScanWaypoints = async (shipSymbol) => {
    try {
      const response = await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/scan/waypoints`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const data = response.data.data;
        const waypoints = data.waypoints || [];
        console.log(waypoints);
        setScanResult(waypoints);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Erreur lors du scan des waypoints :", error);
      setScanResult("Erreur lors du scan des waypoints.");
    }
  };

  const handleRefuel = async (shipSymbol) => {
    try {
      const response = await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/refuel`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Le vaisseau a été ravitaillé en carburant avec succès !");
        // Ajoutez ici la logique supplémentaire si nécessaire
        window.location.reload();
      } else {
        console.log(response);
        // Gérez l'erreur selon vos besoins
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'opération de ravitaillement en carburant :",
        error
      );
      // Gérez l'erreur selon vos besoins
    }
  };

  const [showMarket, setShowMarket] = useState(false);

  const handleDiscoverMarket = async (systemSymbol, waypointSymbol) => {
    try {
      const response = await axios.get(
        `https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.data;
        console.log(data);
        setShowMarket(data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du marché :",
        error
      );
    }
  };

  const [survey, setSurvey] = useState(null);
  const handleSurvey = async (shipSymbol) => {
    try {
      const response = await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/survey`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const data = response.data.data;
        console.log("survey data", data);
        const surveyData = data.surveys[1];

        // Mettez à jour l'état de l'enquête avec la nouvelle valeur
        setSurvey(surveyData);

        // Ajoutez ici la logique supplémentaire si nécessaire
      } else {
        console.log(response);
        // Gérez l'erreur selon vos besoins
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'enquête :", error);
      // Gérez l'erreur selon vos besoins
    }
  };

  const handleExtractResources = async (shipSymbol, surveys) => {
    try {
      if (!surveys || surveys.length === 0) {
        console.error("Aucune enquête disponible.");
        return;
      }

      const surveyToUse = surveys[0];
      const response = await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`,
        {
          survey: surveyToUse, // Assurez-vous d'ajuster cette partie selon la structure attendue par l'API
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const data = response.data.data;
        console.log(data);
        // Ajoutez ici la logique supplémentaire si nécessaire
      } else {
        console.log(response);
        // Gérez l'erreur selon vos besoins
      }
    } catch (error) {
      console.error("Erreur lors de l'extraction des ressources :", error);
      // Gérez l'erreur selon vos besoins
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.spacetraders.io/v2/my/ships`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.data;
          console.log(data);
          setShipData(data);
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

  return (
    <div>
      <h1> Vos vaisseaux </h1>
      {shipData.map((item) => (
        <div key={item.symbol}>
          <ul>
            {" "}
            Vaisseau :<li> Symbol : {item.symbol}</li>
            <li> Nom : {item.engine.name}</li>
            <li> Symbole : {item.engine.symbol}</li>
            <li> Description : {item.engine.description}</li>
            <li> Condition : {item.engine.condition}</li>
          </ul>
          <ul>
            {" "}
            Equipage :<li> Capacité total : {item.crew.capacity}</li>
            <li> Capacité actuel : {item.crew.current}</li>
          </ul>
          <button
            onClick={() =>
              handleDiscoverMarket(
                item.nav.systemSymbol,
                item.nav.waypointSymbol
              )
            }
          >
            Découvrir le Market
          </button>

          {showMarket && showMarket ? (
            <div>
              <h2>Données du Market :</h2>
              <ul>
                {showMarket.tradeGoods.map((tradeGood, index) => (
                  <li key={index}>
                    <p>Symbol: {tradeGood.symbol}</p>
                    <p>Type: {tradeGood.type}</p>
                    <p>Volume de commerce: {tradeGood.tradeVolume}</p>
                    <p>Offre: {tradeGood.supply}</p>
                    <p>Activité: {tradeGood.activity}</p>
                    {tradeGood.purchasePrice && (
                      <p>Prix d'achat: {tradeGood.purchasePrice}</p>
                    )}
                    {tradeGood.sellPrice && (
                      <p>Prix de vente: {tradeGood.sellPrice}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Cliquez sur le bouton pour découvrir le Market.</p>
          )}
          <ul>
            {" "}
            Cargo :<li> Capacité total : {item.cargo.capacity}</li>
            <li> Capacité actuel : {item.cargo.units}</li>
            <li>
              {" "}
              Ressource :{" "}
              {item.cargo.inventory
                .filter((carg) => carg.units > 0)
                .map((carg) => (
                  <div key={carg.symbol}>
                    {carg.symbol} ({carg.units})
                    {item.nav.status === "DOCKED" && (
                      <button
                        onClick={() =>
                          handleSellCargo(item.symbol, carg.symbol, carg.units)
                        }
                      >
                        Vendre
                      </button>
                    )}
                  </div>
                ))}
            </li>
          </ul>
          {item.nav.status === "IN_ORBIT" && (
            <div>
              <button onClick={() => handleSurvey(item.symbol)}>
                Créer un survey
              </button>
              <button
                onClick={() => handleExtractResources(item.symbol, survey)}
              >
                Extraire des ressources
              </button>
            </div>
          )}
          <ul>
            {" "}
            Carburant :<li> Carburant total : {item.fuel.capacity}</li>
            <li> Carburant actuel : {item.fuel.current}</li>
          </ul>
          <ul>
            <li> Status : {item.nav.status}</li>
            {item.nav.status === "IN_ORBIT" && (
              <button onClick={() => handleDock(item.symbol)}>Se poser</button>
            )}
            {item.nav.status === "DOCKED" && (
              <>
                <button onClick={() => handleOrbit(item.symbol)}>
                  Passer en orbite
                </button>
                <button onClick={() => handleRefuel(item.symbol)}>
                  Remettre de l'essence
                </button>
              </>
            )}
            <li> flightMode : {item.nav.flightMode}</li>
            <li>
              Planète actuel : {item.nav.systemSymbol} |{" "}
              {item.nav.waypointSymbol} - {item.nav.route.destination.type}
            </li>
            <li> Cooldown : {item.cooldown.remainingSeconds} </li>
          </ul>
          {item.nav.status === "IN_ORBIT" && (
            <button onClick={() => handleScanWaypoints(item.symbol)}>
              Scannez les waypoints
            </button>
          )}
          <hr />
          <h2>Symboles des waypoints scannés :</h2>
          {Array.isArray(scanResult) ? (
            <ul>
              {scanResult.map((waypoint) => (
                <li key={waypoint.symbol}>
                  <div>
                    <p>Symbol: {waypoint.symbol}</p>
                    <p>
                      X, Y: {waypoint.x}, {waypoint.y}
                    </p>
                    <p>
                      Traits Symbol:{" "}
                      {waypoint.traits.map((trait) => trait.symbol).join(", ")}
                    </p>
                    <p>Type: {waypoint.type}</p>
                    {waypoint.symbol === item.nav.waypointSymbol ? (
                      <p>Actuel</p>
                    ) : (
                      <button
                        onClick={() =>
                          handleNavigate(item.symbol, waypoint.symbol)
                        }
                      >
                        Y naviguer
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun waypoint scanné pour le moment.</p>
          )}

          {navigateData && (
            <div>
              <h2>Informations de navigation :</h2>
              <p>Fuel actuel : {navigateData.fuel.current}</p>
              <p>Heure d'arrivée : {navigateData.nav.route.arrival}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
