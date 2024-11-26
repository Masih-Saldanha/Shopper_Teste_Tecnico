import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import rideService from "../services/rideService";
import GeneralContext from "../contexts/generalContext";
import { BodyConfirmRide } from "../types";
import formatUtils from "../utils/formatUtils";

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
  const navigate = useNavigate();

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

      navigate("/ride-history");
    } catch (err: any) {
      alert(err.response.data.error_description);
    }
  };

  return (
    <Container>
      <Title>Opções de Viagem</Title>
      <MapContainer>
        <MapImage
          src={`https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${urlSafePolyline}&markers=color:green|label:A|${origin}&markers=color:red|label:B|${destination}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          alt="Mapa"
        />
      </MapContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Descrição</TableHeaderCell>
            <TableHeaderCell>Carro</TableHeaderCell>
            <TableHeaderCell>Avaliação</TableHeaderCell>
            <TableHeaderCell>Valor (R$)</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
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
              <TableCellValue>{formatUtils.formatValue(driver.value)}</TableCellValue>
              <TableCell>
                <Button
                  onClick={() => handleSelectDriver(driver.id, driver.name, driver.value)}
                >
                  Escolher {driver.name}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
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

const TableCellValue = styled.td`
  white-space: nowrap;
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

export default RideOptionsPage;
