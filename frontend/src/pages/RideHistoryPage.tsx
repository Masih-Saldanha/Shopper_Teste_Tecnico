import React, { useState, useEffect } from "react";
import styled from "styled-components";

import rideService from "../services/rideService";
import driverService from "../services/driverService";
import { DriverFromDatabase, Ride } from "../types";
import formatUtils from "../utils/formatUtils";

const RideHistoryPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [driverId, setDriverId] = useState<string | undefined>(undefined);
  const [drivers, setDrivers] = useState<DriverFromDatabase[]>([]);
  const [rides, setRides] = useState<Ride[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    driverService
      .getDriversListFromDatabase()
      .then((response) => {
        setErrorMessage(null);
        setDrivers(response.data);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error_description || "Ocorreu um erro ao buscar a lista de motoristas. Reinicie a página.");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  }, []);

  async function handleFilter() {
    try {
      setErrorMessage(null);
      const response = await rideService.getRideHistory(userId, driverId ? parseInt(driverId) : undefined);
      setRides(response.data.rides);
    } catch (err: any) {
      setRides([]);
      setErrorMessage(err.response.data.error_description || "Ocorreu um erro ao buscar o histórico de viagens.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <Container>
      <h1>Histórico de Viagens</h1>
      <FilterContainer>
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
      </FilterContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <RideList>
        {rides.length > 0 ? (
          rides.map((ride) => (
            <RideCard key={ride.id}>
              <RideInfo>
                <strong>Data e hora da viagem:</strong> {formatUtils.formatDate(ride.date)}
              </RideInfo>
              <RideInfo>
                <strong>Nome do motorista:</strong> {ride.driver.name}
              </RideInfo>
              <RideInfo>
                <strong>Origem:</strong> {ride.origin}
              </RideInfo>
              <RideInfo>
                <strong>Destino:</strong> {ride.destination}
              </RideInfo>
              <RideInfo>
                <strong>Distância percorrida:</strong> {formatUtils.formatDistance(ride.distance)}
              </RideInfo>
              <RideInfo>
                <strong>Tempo de viagem:</strong> {formatUtils.formatDuration(ride.duration)}
              </RideInfo>
              <RideInfo>
                <strong>Valor da viagem:</strong> {formatUtils.formatValue(ride.value)}
              </RideInfo>
            </RideCard>
          ))
        ) : (
          <NoHistoryContainer>
            <NoHistoryMessage>Faça uma busca para exibir o histórico</NoHistoryMessage>
          </NoHistoryContainer>
        )}
      </RideList>

    </Container>
  );
};

const Container = styled.div`
  h1 {
    text-align: center;
  }
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;

  input, select, button {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  button {
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const RideList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const RideCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const RideInfo = styled.p`
  margin: 5px 0;
  font-size: 14px;

  strong {
    font-weight: 600;
  }
`;

const NoHistoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  text-align: center;
`;

const NoHistoryMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #6c757d;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  margin-top: 15px;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  font-size: 14px;
`;

export default RideHistoryPage;
