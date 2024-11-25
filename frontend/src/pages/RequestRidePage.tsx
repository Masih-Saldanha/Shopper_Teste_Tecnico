import { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import rideService from "../services/rideService";
import GeneralContext, { EstimateRideData } from "../contexts/generalContext";

const RequestRidePage: React.FC = () => {
  const general = useContext(GeneralContext);
  const {
    customerId, setCustomerId,
    origin, setOrigin,
    destination, setDestination,
    estimateRideData, setEstimateRideData,
    driversList, setDriversList,
    urlSafePolyline, setUrlSafePolyline,
    driversListFromDatabase, setDriversListFromDatabase,
  } = general || {
    customerId: "", setCustomerId: () => { },
    origin: "", setOrigin: () => { },
    destination: "", setDestination: () => { },
    estimateRideData: null, setEstimateRideData: () => { },
    driversList: [], setDriversList: () => { },
    urlSafePolyline: "", setUrlSafePolyline: () => { },
    driversListFromDatabase: [], setDriversListFromDatabase: () => { },
  };

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const responseEstimateRide: AxiosResponse<EstimateRideData> = await rideService.estimateRide(customerId, origin, destination);
      console.log("response: ");
      console.log(responseEstimateRide);
      setEstimateRideData(responseEstimateRide.data);
      setDriversList(responseEstimateRide.data.options);

      const responseEncodedPolylineData: AxiosResponse<string> = await rideService.getEncodedPolylineData(
        { origin: responseEstimateRide.data.origin, destination: responseEstimateRide.data.destination }
      );

      setUrlSafePolyline(responseEncodedPolylineData.data);

      navigate("/ride-options");
    } catch (err: any) {
      console.error("erro: ", err);
      setError(err.response.data.error_description);
      alert(err.response.data.error_description);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID do Usuário"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Endereço de Origem"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Endereço de Destino"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <button type="submit">Estimar Viagem</button>
      {error ? <p>{error}</p> : <></>}
    </form>
  );
};

export default RequestRidePage;
