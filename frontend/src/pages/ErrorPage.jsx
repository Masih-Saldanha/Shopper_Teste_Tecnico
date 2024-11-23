import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";

function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => navigate("/"), []);

  return <Loading message="Essa página não existe, redirecionando você para a página inicial"></Loading>
}

export default ErrorPage;