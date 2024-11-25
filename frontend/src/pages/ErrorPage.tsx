import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => navigate("/");
    redirect();
  }, []);

  return <Loading message="Essa página não existe, redirecionando você para a página inicial"></Loading>
}

export default ErrorPage;