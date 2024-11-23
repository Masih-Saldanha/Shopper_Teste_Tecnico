import { useContext, useEffect, useState } from "react";

import Loading from "../components/Loading";
import GeneralContext from "../contexts/generalContext";
import networkRequests from "../actions/networkRequests";
import styled from "styled-components";

function Main() {
  const general = useContext(GeneralContext);
  const { global, teste } = general;
  const [health, setHealth] = useState("Sem resposta ainda");

  useEffect(() => {
    console.log(process.env.REACT_APP_BASE_URL);
    networkRequests
      .getHealth()
      .then((response) => {
        console.log("response: ");
        console.log(response);
        setHealth(response.data);
      })
      .catch((e) => {
        console.log("erro: ");
        console.log(e);
      })
  }, []);

  return (
    <>
      <Loading message={`CARREGANDO MAIN PAGE`}></Loading>
      <Message>{global}</Message>
      <Message>{teste} Backend: {health}</Message>
    </>
  )
}

const Message = styled.h2`
    margin: 16px 0;
    text-align: center;
    color: #6D6D6D;
`

export default Main;