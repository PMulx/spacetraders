import React, { useState } from "react";
import axios from "axios";

export default function UserList() {
  const [token, setToken] = useState("");
  localStorage.removeItem("userId");
  localStorage.removeItem("userData");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://api.spacetraders.io/v2/my/agent",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.data;
        const id = data.accountId;
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("userId", id);
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  return (
    <div>
      <h1 className="title">Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Token: </label> <br /> <br />
        <input
          type="text"
          name="username"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />{" "}
        <br /> <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
