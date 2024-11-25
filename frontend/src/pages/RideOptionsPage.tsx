import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import rideService from "../services/rideService";
import GeneralContext, { BodyConfirmRide } from "../contexts/generalContext";
import driverService from "../services/driverService";

const RideOptionsPage: React.FC = () => {
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
  const navigate = useNavigate();

  console.log("estimateRideData: ", estimateRideData)
  console.log("driversList: ", driversList)

  async function handleSelectDriver(driverId: number, driverName: string, driverValue: number) {
    try {
      const body: BodyConfirmRide = {
        customer_id: customerId,
        origin,
        destination,
        distance: estimateRideData?.distance,
        duration: estimateRideData?.duration,
        driver: {
          id: driverId,
          name: driverName
        },
        value: driverValue
      };
      await rideService.confirmRide(body);
      console.log("Percurso registrado");

      const driverListFromDatabase = await driverService.getDriversListFromDatabase();
      console.log("driverListFromDatabase: ", driverListFromDatabase);
      setDriversListFromDatabase(driverListFromDatabase.data);
      
      navigate("/ride-history");
    } catch (err: any) {
      console.error(err);
      alert(err.response.data.error_description);
    }
  };

  return (
    <div>
      <h1>Opções de Viagem</h1>
      <div>
        <img src={`https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${urlSafePolyline}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`} alt="Mapa" />
      </div>
      <ul>
        {driversList.map((driver) => (
          <li key={driver.id}>
            <p>Nome: {driver.name} - Descrição: {driver.description} - Carro: {driver.vehicle} - Avaliação: {driver.review.rating}/5. {driver.review.comment} - Valor da viagem: R$ {driver.value}</p>
            <button onClick={() => handleSelectDriver(driver.id, driver.name, driver.value)}>Escolher {driver.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideOptionsPage;
