import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import rideService from "../services/rideService";
import GeneralContext from "../contexts/generalContext";
import { BodyConfirmRide } from "../types";
import formatUtils from "../utils/formatUtils";
import Loading from "../components/Loading";

const RideOptionsPage: React.FC = () => {
  const general = useContext(GeneralContext);
  const {
    customerId, origin,
    destination, estimateRideData,
    driversList, urlSafePolyline,
  } = general || {
    customerId: "", origin: "",
    destination: "", estimateRideData: null,
    driversList: [], urlSafePolyline: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSelectDriver(driverId: number, driverName: string, driverValue: number) {
    try {
      setIsLoading(true);
      setErrorMessage(null);
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

      setSuccessMessage("Viagem solicitada com sucesso! Aguarde um momento e você será redirecionado.");
      setTimeout(() => {
        navigate("/ride-history");
      }, 3000);
    } catch (err: any) {
      setErrorMessage(err.response.data.error_description || "Ocorreu um erro ao solicitar a viagem.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {
        isLoading ? (
          <Loading message="Processando sua solicitação..." />
        ) : (
          <>
            <Title>Opções de Viagem</Title>
            <MapContainer>
              <MapImage
                src={`https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${urlSafePolyline}&markers=color:green|label:A|${origin}&markers=color:red|label:B|${destination}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                alt="Mapa"
              />
            </MapContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
            {
              driversList.length > 0 ? (
                <>
                  <Table>
                    <TableHead>
                      <tr>
                        <TableHeaderCell>Nome</TableHeaderCell>
                        <TableHeaderCell>Descrição</TableHeaderCell>
                        <TableHeaderCell>Veículo</TableHeaderCell>
                        <TableHeaderCell>Avaliação</TableHeaderCell>
                        <TableHeaderCell>Valor da viagem</TableHeaderCell>
                        <TableHeaderCell>Ação</TableHeaderCell>
                      </tr>
                    </TableHead>
                    <tbody>
                      {driversList.map((driver) => (
                        <TableRow key={driver.id}>
                          <TableCell>{driver.name}</TableCell>
                          <TableCell>{driver.description}</TableCell>
                          <TableCell>{driver.vehicle}</TableCell>
                          <TableCell>
                            {driver.review.rating}/5
                            <br />
                            <small>{driver.review.comment}</small>
                          </TableCell>
                          <TableCell>{formatUtils.formatValue(driver.value)}</TableCell>
                          <TableCell>
                            <Button
                              disabled={!!successMessage}
                              onClick={() =>
                                handleSelectDriver(driver.id, driver.name, driver.value)
                              }
                            >
                              Escolher {driver.name}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </>
              ) : (
                <NoDriversContainer>
                  <NoDriversMessage>
                    Nenhum motorista disponível para essa corrida no momento.
                    Pontos de origem e destino muito próximos.
                  </NoDriversMessage>
                </NoDriversContainer>
              )
            }
          </>
        )
      }
    </Container>
  );

};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const MapImage = styled.img`
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHead = styled.thead`
  tr {
    background-color: #f4f4f4;
    text-align: left;
  }
`;

const TableHeaderCell = styled.th`
  white-space: nowrap;
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoDriversContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NoDriversMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff4d4d;
  background-color: #fff5f5;
  border: 1px solid #ffcccc;
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
  font-size: 30px;
`;

const SuccessMessage = styled.div`
  margin-top: 15px;
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  font-size: 30px;
`;

export default RideOptionsPage;
