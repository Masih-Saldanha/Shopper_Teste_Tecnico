import React, { useState, useEffect } from "react";

import rideService from "../services/rideService";

const RideHistoryPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [driverId, setDriverId] = useState<string | undefined>(undefined);
  const [rides, setRides] = useState([]);
  const [error, setError] = useState<string | null>(null);

  async function handleFilter() {
    try {
      const response = await rideService.getRideHistory(userId, driverId ? parseInt(driverId) : undefined);
      console.log("response: ");
      console.log(response);
      setRides(response.data);
    } catch (err) {
      console.error("erro: ");
      console.error(err);
      setError("Erro ao buscar o histórico. Tente novamente.");
    }
  };

  return (
    <div>
      <h1>Histórico de Viagens</h1>
      <input
        type="text"
        placeholder="ID do Usuário"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <select onChange={(e) => setDriverId(e.target.value)} value={driverId}>
        <option value="">Todos os motoristas</option>
      </select>
      <button onClick={handleFilter}>Filtrar</button>
      {error ? <p>{error}</p> : <></>}
      <ul>
        {rides.map((ride: any) => (
          <li key={ride.id}>
            <p>{ride.date} - {ride.driver.name} - {ride.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideHistoryPage;
