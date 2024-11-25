import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GeneralContext, { Driver, EstimateRideData } from "./contexts/generalContext";
import ErrorPage from "./pages/ErrorPage";
import HealthPage from "./pages/HealthPage";
import RequestRidePage from "./pages/RequestRidePage";
import RideOptionsPage from "./pages/RideOptionsPage";
import RideHistoryPage from "./pages/RideHistoryPage";

function App() {
  const [customerId, setCustomerId] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [estimateRideData, setEstimateRideData] = useState<EstimateRideData | null>(null);
  const [driversList, setDriversList] = useState<Driver[]>([]);
  const [urlSafePolyline, setUrlSafePolyline] = useState<string>("");

  const contextValue = useMemo(() => ({
    global: "Contexto Global",
    teste: "Teste",
    customerId, setCustomerId, origin, setOrigin,
    destination, setDestination, estimateRideData, setEstimateRideData,
    driversList, setDriversList, urlSafePolyline, setUrlSafePolyline
  }), [customerId, origin, destination, estimateRideData, driversList, urlSafePolyline]);

  return (
    <GeneralContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<ErrorPage />}></Route>
          <Route path="/health" element={<HealthPage />}></Route>
          <Route path="/" element={<RequestRidePage />} />
          <Route path="/ride-options" element={<RideOptionsPage />} />
          <Route path="/ride-history" element={<RideHistoryPage />} />
        </Routes>
      </BrowserRouter>
    </GeneralContext.Provider>
  );
}

export default App;
