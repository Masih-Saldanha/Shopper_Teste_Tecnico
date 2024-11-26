import { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import rideService from "../services/rideService";
import GeneralContext from "../contexts/generalContext";
import { EstimateRideData } from "../types";

const RequestRidePage: React.FC = () => {
  const general = useContext(GeneralContext);
  const {
    customerId, setCustomerId,
    origin, setOrigin,
    destination, setDestination,
    setEstimateRideData, setDriversList,
    setUrlSafePolyline,
  } = general || {
    customerId: "", setCustomerId: () => { },
    origin: "", setOrigin: () => { },
    destination: "", setDestination: () => { },
    setEstimateRideData: () => { }, setDriversList: () => { },
    setUrlSafePolyline: () => { },
  };
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const responseEstimateRide: AxiosResponse<EstimateRideData> = await rideService.estimateRide(customerId, origin, destination);
      setEstimateRideData(responseEstimateRide.data);
      setDriversList(responseEstimateRide.data.options);

      const responseEncodedPolylineData: AxiosResponse<string> = await rideService.getEncodedPolylineData(
        { origin: responseEstimateRide.data.origin, destination: responseEstimateRide.data.destination }
      );
      setUrlSafePolyline(responseEncodedPolylineData.data);

      navigate("/ride-options");
    } catch (err: any) {
      setEstimateRideData(null);
      setDriversList([]);
      setUrlSafePolyline("");
      alert(err.response.data.error_description);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <h1>Solicitar Viagem</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="ID do Usuário"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
          <FormInput
            type="text"
            placeholder="Endereço de Origem"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
          <FormInput
            type="text"
            placeholder="Endereço de Destino"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <SubmitButton type="submit">Estimar Viagem</SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );

};

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  max-width: 400px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 20px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default RequestRidePage;
