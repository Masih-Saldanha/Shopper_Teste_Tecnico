import React, { useState, useEffect } from "react";

import rideService from "../services/rideService";
import driverService from "../services/driverService";
import { DriverFromDatabase, Ride } from "../contexts/generalContext";

const RideHistoryPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [driverId, setDriverId] = useState<string | undefined>(undefined);
  const [drivers, setDrivers] = useState<DriverFromDatabase[]>([]);
  const [rides, setRides] = useState<Ride[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(process.env.REACT_APP_BASE_URL);
    driverService
      .getDriversListFromDatabase()
      .then((response) => {
        console.log("getDriversListFromDatabase: ", response.data);
        setDrivers(response.data);
      })
      .catch((err) => {
        console.error("erro: ", err);
        alert(err.response.data.error_description);
      });
  }, []);

  async function handleFilter() {
    try {
      const response = await rideService.getRideHistory(userId, driverId ? parseInt(driverId) : undefined);
      console.log("driverListFromDatabase: ", response);
      setRides(response.data.rides);
    } catch (err: any) {
      console.error("erro: ", err);
      alert(err.response.data.error_description);
      setError(err.response.data.error_description);
    }
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString("pt-BR");
    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    return `${formattedDate} - ${formattedTime}`;
  }
  

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
      <select onChange={(e) => setDriverId(e.target.value || undefined)} value={driverId || ""}>
        <option value="">Nenhum motorista selecionado</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.id.toString()}>
            {driver.nome}
          </option>
        ))}
      </select>
      <button onClick={handleFilter}>Filtrar</button>
      {error ? <p>{error}</p> : <></>}
      <ul>
        {rides.map((ride) => (
          <li key={ride.id}>
            <p>{formatDate(ride.date)} - {ride.driver.name} - {ride.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideHistoryPage;
