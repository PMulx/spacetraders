import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddContactForm() {
  const storedId = localStorage.getItem("userId");
  if (!storedId) {
    window.location.href = "/";
  }
  const token = localStorage.getItem("token");
  const [agentData, setAgentData] = useState(null);
  const [shipData, setShipData] = useState(null);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await axios.get(
          `https://api.spacetraders.io/v2/my/agent`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.data;
          setAgentData(data);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'agent :",
          error
        );
      }
    };

    fetchAgentData();
  }, [token, setAgentData]);

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
          setShipData(data);
          console.log(data);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API :",
          error
        );
      }
    };

    fetchData();
  }, [token, setShipData]);

  return (
    <>
      <div className="page">
        <section className="menu">
          <h1 className="menu__logo">
            <img src="/public/images/logo.png" /> NovaPilot{" "}
          </h1>
          <div className="menu__link">
            <h3 className="h3__title"> GENERAL </h3>
            <Link to={"/dashboard"} className="menu__link--dashboard actif">
              {" "}
              <svg
                width="50"
                height="50"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 6.875C5.5 6.51033 5.64487 6.16059 5.90273 5.90273C6.16059 5.64487 6.51033 5.5 6.875 5.5H12.375C12.7397 5.5 13.0894 5.64487 13.3473 5.90273C13.6051 6.16059 13.75 6.51033 13.75 6.875V13.75C13.75 14.1147 13.6051 14.4644 13.3473 14.7223C13.0894 14.9801 12.7397 15.125 12.375 15.125H6.875C6.51033 15.125 6.16059 14.9801 5.90273 14.7223C5.64487 14.4644 5.5 14.1147 5.5 13.75V6.875ZM19.25 6.875C19.25 6.51033 19.3949 6.16059 19.6527 5.90273C19.9106 5.64487 20.2603 5.5 20.625 5.5H26.125C26.4897 5.5 26.8394 5.64487 27.0973 5.90273C27.3551 6.16059 27.5 6.51033 27.5 6.875V9.625C27.5 9.98967 27.3551 10.3394 27.0973 10.5973C26.8394 10.8551 26.4897 11 26.125 11H20.625C20.2603 11 19.9106 10.8551 19.6527 10.5973C19.3949 10.3394 19.25 9.98967 19.25 9.625V6.875ZM5.5 22C5.5 21.6353 5.64487 21.2856 5.90273 21.0277C6.16059 20.7699 6.51033 20.625 6.875 20.625H12.375C12.7397 20.625 13.0894 20.7699 13.3473 21.0277C13.6051 21.2856 13.75 21.6353 13.75 22V26.125C13.75 26.4897 13.6051 26.8394 13.3473 27.0973C13.0894 27.3551 12.7397 27.5 12.375 27.5H6.875C6.51033 27.5 6.16059 27.3551 5.90273 27.0973C5.64487 26.8394 5.5 26.4897 5.5 26.125V22ZM19.25 17.875C19.25 17.5103 19.3949 17.1606 19.6527 16.9027C19.9106 16.6449 20.2603 16.5 20.625 16.5H26.125C26.4897 16.5 26.8394 16.6449 27.0973 16.9027C27.3551 17.1606 27.5 17.5103 27.5 17.875V26.125C27.5 26.4897 27.3551 26.8394 27.0973 27.0973C26.8394 27.3551 26.4897 27.5 26.125 27.5H20.625C20.2603 27.5 19.9106 27.3551 19.6527 27.0973C19.3949 26.8394 19.25 26.4897 19.25 26.125V17.875Z"
                  stroke-width="2.5"
                />
              </svg>{" "}
              Dashboard{" "}
            </Link>
            <Link to={"/vaisseaux"} className="menu__link--vaisseaux">
              {" "}
              <svg
                width="50"
                height="50"
                viewBox="0 0 28 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5274 -0.0078125L17.3339 2.09711L20.9411 9.31135L20.469 11.1998L19.0075 10.9562L19.1927 10.339L19.3592 9.78397L14 8.71229L8.64087 9.78397L8.99255 10.9562L7.53104 11.1997L7.05896 9.31135L10.666 2.09723L13.4727 -0.0078125V3.27344H11.1875L10.25 5.14844L14 7.375L17.75 5.14844L16.8125 3.27344H14.5274V-0.0078125ZM25.5613 9.90965L27.3367 10.5015L26.547 12.2127L24.7883 11.9197L25.5613 9.90965ZM2.43872 9.90965L3.21181 11.9196L1.45306 12.2127L0.66333 10.5015L2.43872 9.90965ZM14 10.0305L17.1524 13.4695L15.4828 19.0352H12.5174L10.8477 13.4695L14 10.0305ZM15.4798 10.0837L18.0159 10.591L17.5052 12.2933L15.4798 10.0837ZM12.5203 10.0838L10.4948 12.2934L9.98419 10.591L12.5203 10.0838ZM18.7019 11.9745L27.2715 13.4027L24.1836 19.5789L18.3348 13.1983L18.7019 11.9745ZM9.29812 11.9745L9.66526 13.1983L3.81644 19.5788L0.728545 13.4027L9.29812 11.9745ZM17.982 14.3745L22.2125 18.9896L17.2581 16.7876L17.982 14.3745ZM10.0181 14.3745L10.742 16.7876L5.78753 18.9896L10.0181 14.3745ZM16.9525 17.806L18.631 18.552L17.3383 23.7227H14.5274V20.0898H16.2673L16.9525 17.806ZM11.0475 17.806L11.7327 20.0898H13.4727V23.7227H10.6618L9.36907 18.552L11.0475 17.806ZM21.711 19.9208L22.7718 20.3923L22.1868 21.66L21.2266 21.1799L21.711 19.9208ZM6.28909 19.9208L6.77343 21.1799L5.81325 21.66L5.22825 20.3923L6.28909 19.9208ZM17.2227 24.7773V26.5352H15.4649V24.7773H17.2227ZM12.5352 24.7773V26.5352H10.7774V24.7773H12.5352Z"
                  fill="#020202"
                />
              </svg>{" "}
              Vaisseaux{" "}
            </Link>
          </div>
          <p className="menu__made">
            {" "}
            <img src="/public/images/logo.png" /> 2023 Made by Mulx{" "}
          </p>
        </section>
        <section className="dashboard">
          <h2 className="h2__title"> Dashboard</h2>
          <div className="dashboard__divs">
            <div className="dashboard__ships">
              <h3 className="h3__title"> Vaisseaux possédés</h3>
              {shipData ? (
                shipData.map((ship, index) => (
                  <div className="dashboard__ships--ship" key={index}>
                    <div className="dashboard__ships--shipinfo">
                      <p className="symbol">{ship.symbol}</p>
                      <p className="nav">
                        {" "}
                        <svg
                          width="33"
                          height="29"
                          viewBox="0 0 33 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M29.4583 25.0833H2.54165C1.67082 25.0833 0.958318 25.7958 0.958318 26.6667C0.958318 27.5375 1.67082 28.25 2.54165 28.25H29.4583C30.3292 28.25 31.0417 27.5375 31.0417 26.6667C31.0417 25.7958 30.3292 25.0833 29.4583 25.0833ZM31.9442 10.2633C31.5958 8.99666 30.2975 8.25249 29.0308 8.58499L20.6233 10.8333L10.395 1.30166C10.1834 1.10108 9.92314 0.959088 9.63995 0.889679C9.35676 0.820269 9.06037 0.825834 8.77998 0.905824C7.70332 1.20666 7.19665 2.44166 7.75082 3.40749L13.1975 12.8442L5.32832 14.95L2.84248 12.9867C2.44665 12.6858 1.93998 12.575 1.44915 12.7017L0.926651 12.8442C0.419984 12.9708 0.182484 13.5567 0.451651 14L3.42832 19.1458C3.79248 19.7633 4.52082 20.0642 5.20165 19.89L30.25 13.1767C31.5167 12.8283 32.2767 11.53 31.9442 10.2633Z"
                            fill="#66CCFF"
                          />
                        </svg>{" "}
                        {ship.nav.status}
                      </p>
                      <p className="destination">
                        <svg
                          width="38"
                          height="38"
                          viewBox="0 0 38 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 19C20.8897 19 22.7019 18.2493 24.0381 16.9131C25.3743 15.5769 26.125 13.7647 26.125 11.875C26.125 9.98533 25.3743 8.17306 24.0381 6.83686C22.7019 5.50067 20.8897 4.75 19 4.75C17.1103 4.75 15.2981 5.50067 13.9619 6.83686C12.6257 8.17306 11.875 9.98533 11.875 11.875C11.875 13.7647 12.6257 15.5769 13.9619 16.9131C15.2981 18.2493 17.1103 19 19 19ZM19 21.375C16.4804 21.375 14.0641 20.3741 12.2825 18.5925C10.5009 16.8109 9.5 14.3946 9.5 11.875C9.5 9.35544 10.5009 6.93908 12.2825 5.15749C14.0641 3.37589 16.4804 2.375 19 2.375C21.5196 2.375 23.9359 3.37589 25.7175 5.15749C27.4991 6.93908 28.5 9.35544 28.5 11.875C28.5 14.3946 27.4991 16.8109 25.7175 18.5925C23.9359 20.3741 21.5196 21.375 19 21.375Z"
                            fill="#66CCFF"
                          />
                          <path
                            d="M19 19C19.3149 19 19.617 19.1251 19.8397 19.3478C20.0624 19.5705 20.1875 19.8726 20.1875 20.1875V29.6875C20.1875 30.0024 20.0624 30.3045 19.8397 30.5272C19.617 30.7499 19.3149 30.875 19 30.875C18.6851 30.875 18.383 30.7499 18.1603 30.5272C17.9376 30.3045 17.8125 30.0024 17.8125 29.6875V20.1875C17.8125 19.8726 17.9376 19.5705 18.1603 19.3478C18.383 19.1251 18.6851 19 19 19Z"
                            fill="#66CCFF"
                          />
                          <path
                            d="M14.25 24.0872V26.4979C10.0106 27.1771 7.125 28.6449 7.125 29.6875C7.125 31.0864 12.3168 33.25 19 33.25C25.6833 33.25 30.875 31.0864 30.875 29.6875C30.875 28.6425 27.9894 27.1771 23.75 26.4979V24.0872C29.2838 24.9019 33.25 27.1035 33.25 29.6875C33.25 32.965 26.8708 35.625 19 35.625C11.1293 35.625 4.75 32.965 4.75 29.6875C4.75 27.1011 8.71625 24.9019 14.25 24.0872Z"
                            fill="#66CCFF"
                          />
                        </svg>
                        {ship.nav.route.destination.type}
                      </p>
                    </div>
                    <Link to={"#"}>Voir plus de détails</Link>
                  </div>
                ))
              ) : (
                <p>Chargement des données...</p>
              )}
            </div>
            <div className="dashboard__logout">
              <h3 className="h3__title">
                {" "}
                Bonjour {agentData ? agentData.symbol : "Chargement..."}
              </h3>
              {agentData && (
                <>
                  <p>
                    {" "}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 8.66667C16.1159 8.66667 15.2681 8.31548 14.643 7.69036C14.0179 7.06523 13.6667 6.21739 13.6667 5.33333C13.6667 4.44928 14.0179 3.60143 14.643 2.97631C15.2681 2.35119 16.1159 2 17 2C17.8841 2 18.7319 2.35119 19.357 2.97631C19.9821 3.60143 20.3333 4.44928 20.3333 5.33333C20.3333 6.21739 19.9821 7.06523 19.357 7.69036C18.7319 8.31548 17.8841 8.66667 17 8.66667ZM17 8.66667V15.3333M17 15.3333C18.3261 15.3333 19.5979 15.8601 20.5355 16.7978C21.4732 17.7355 22 19.0073 22 20.3333C22 21.6594 21.4732 22.9312 20.5355 23.8689C19.5979 24.8065 18.3261 25.3333 17 25.3333C15.6739 25.3333 14.4021 24.8065 13.4645 23.8689C12.5268 22.9312 12 21.6594 12 20.3333C12 19.0073 12.5268 17.7355 13.4645 16.7978C14.4021 15.8601 15.6739 15.3333 17 15.3333ZM8.16667 26.6667L12.8333 23.3333M25.8333 26.6667L21.1667 23.3333M2 28.6667C2 29.5507 2.35119 30.3986 2.97631 31.0237C3.60143 31.6488 4.44928 32 5.33333 32C6.21739 32 7.06523 31.6488 7.69036 31.0237C8.31548 30.3986 8.66667 29.5507 8.66667 28.6667C8.66667 27.7826 8.31548 26.9348 7.69036 26.3096C7.06523 25.6845 6.21739 25.3333 5.33333 25.3333C4.44928 25.3333 3.60143 25.6845 2.97631 26.3096C2.35119 26.9348 2 27.7826 2 28.6667ZM25.3333 28.6667C25.3333 29.5507 25.6845 30.3986 26.3096 31.0237C26.9348 31.6488 27.7826 32 28.6667 32C29.5507 32 30.3986 31.6488 31.0237 31.0237C31.6488 30.3986 32 29.5507 32 28.6667C32 27.7826 31.6488 26.9348 31.0237 26.3096C30.3986 25.6845 29.5507 25.3333 28.6667 25.3333C27.7826 25.3333 26.9348 25.6845 26.3096 26.3096C25.6845 26.9348 25.3333 27.7826 25.3333 28.6667Z"
                        stroke="#66CCFF"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    {agentData.headquarters}
                  </p>
                  <p>
                    {" "}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_27_973)">
                        <path
                          d="M20 0C19.6287 0 19.2726 0.1475 19.01 0.41005C18.7475 0.672601 18.6 1.0287 18.6 1.4V33.4C18.6 33.7713 18.7475 34.1274 19.01 34.3899C19.2726 34.6525 19.6287 34.8 20 34.8C20.3713 34.8 20.7274 34.6525 20.9899 34.3899C21.2525 34.1274 21.4 33.7713 21.4 33.4V18.8H38.6C38.9713 18.8 39.3274 18.6525 39.5899 18.3899C39.8525 18.1274 40 17.7713 40 17.4V1.4C40 1.0287 39.8525 0.672601 39.5899 0.41005C39.3274 0.1475 38.9713 0 38.6 0H20.2C20.1661 0.00010266 20.1322 0.00143687 20.0984 0.004C20.0656 0.00151308 20.0328 0.000178926 20 0Z"
                          fill="#66CCFF"
                        />
                        <path
                          d="M15.2016 30.7168C10.964 31.316 8 32.7488 8 34.8572C8 37.6972 12.9524 40 20 40C27.0476 40 32 37.6976 32 34.8572C32 32.7484 29.036 31.316 24.7988 30.7172L24.2116 31.7168C27.4056 32.1596 29.6 33.0912 29.6 34.1716C29.6 35.6864 25.302 36.9144 20 36.9144C14.698 36.9144 10.4 35.6864 10.4 34.1716C10.3996 33.0948 12.58 32.1644 15.7836 31.7196C15.59 31.3852 15.3956 31.0516 15.2016 30.7168Z"
                          fill="#66CCFF"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_27_973">
                          <rect width="40" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    {agentData.startingFaction}
                  </p>
                  <Link to={"/"}> Se déconnecter </Link>
                </>
              )}
            </div>
            <div className="dashboard__money">
              <p>
                {" "}
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40 40C40 37.2375 32.165 35 22.5 35M40 40C40 42.7625 32.165 45 22.5 45C12.835 45 5 42.7625 5 40M40 40V52.3425C40 55.19 32.165 57.5 22.5 57.5C12.835 57.5 5 55.1925 5 52.3425V40M40 40C49.56 40 57.5 37.5325 57.5 35V10M22.5 35C12.835 35 5 37.2375 5 40M22.5 35C11.455 35 2.5 32.5325 2.5 30V17.5M22.5 12.5C11.455 12.5 2.5 14.7375 2.5 17.5M2.5 17.5C2.5 20.2625 11.455 22.5 22.5 22.5C22.5 25.0325 30.6325 27.5 40.1925 27.5C49.75 27.5 57.5 25.0325 57.5 22.5M57.5 10C57.5 7.2375 49.75 5 40.1925 5C30.6325 5 22.885 7.2375 22.885 10M57.5 10C57.5 12.7625 49.75 15 40.1925 15C30.635 15 22.885 12.7625 22.885 10M22.885 10V35.415"
                    stroke="#66CCFF"
                    stroke-width="2.5"
                  />
                </svg>
                {agentData ? agentData.credits : "Chargement..."}{" "}
              </p>
            </div>
            <div className="dashboard__cargo">
              <h3 className="h3__title">Minerais possédés</h3>
              {shipData ? (
                Object.values(shipData).map((ship, index) => (
                  <div key={index}>
                    {ship.cargo && ship.cargo.inventory ? (
                      ship.cargo.inventory.map((item, idx) => (
                        <div className="dashboard__cargo--units" key={idx}>
                          <p>{item.name}</p>
                          <p>{item.units}</p>
                        </div>
                      ))
                    ) : (
                      <p>Pas d'inventaire pour ce vaisseau.</p>
                    )}
                  </div>
                ))
              ) : (
                <p>Chargement des données...</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
