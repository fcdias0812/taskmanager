/*
*Informações Importantes*
Ordem que foi criado o contexto:

1 - Criando o contexto (Informações que vão ser repassadas para o sistema)
2 - Tipando o contexto (Informações que vão ser repassadas para o sistema)
3 - Criando o provider do contexto (Camada que fica em volta do sistema)
4 - Retornando o provider com a aplicação (children) dentro dele.
5 - Criando os estados do que vai ser passado para o sistema
6 - Resto da lógia. . .
*/

import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";

// 2 - Tipando o contexto (Informações que vão ser repassadas para o sistema)
interface AuthContextProps {
  signed: boolean;
  user: UserProps | null;
}

interface UserProps {
  uid: string;
  email: string | null;
  name: string | null;
}

// 1 - Criando o contexto (Informações que vão ser repassadas para o sistema)
export const AuthContext = createContext({} as AuthContextProps);

// 3 - Criando o provider do contexto (Camada que fica em volta do sistema)
export function AuthProvider({ children }: { children: ReactNode }) {
  // 5 - Criando os estados do que vai ser passado para o sistema
  const [signed, setSigned] = useState(true); // Vai ser útil na proteção de rotas (Verifica se está logado)
  const [user, setUser] = useState<UserProps | null>(null); // Passa as informações do usuário para o sistema

  // Verifica se o usuário está ou não logado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });
        setSigned(true);
      } else {
        setSigned(false);
        setUser(null);
      }
    });

    // Ao desmontar, ele cancela o olheiro
    return () => {
      unsub();
    };
  }, []);

  // 4 - Retornando o provider com a aplicação (children) dentro dele.
  // value -> O que vai ser passado para o sistema, que está no contexto
  return (
    <AuthContext.Provider value={{ signed, user }}>
      {children}
    </AuthContext.Provider>
  );
}
