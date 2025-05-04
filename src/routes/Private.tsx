import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

// Caso o usuário tente acessar as rotas protegidas diretamente pela url, irá passar por essa verificação
export function Private({ children }: { children: ReactNode }) {
  const { signed } = useContext(AuthContext);

  if (!signed) {
    return <Navigate to="/" />;
  }

  return children;
}
