import { useState } from "react";

import MainLayout from "./layout/main/Main";
import Chat from "./pages/chat/Chat";
import Authentication from "./pages/authentication/Authentication";

function App() {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };
  return (
    <MainLayout>
      {isAuthenticated ? (
        <Chat />
      ) : (
        <Authentication onAuthSuccess={handleAuthSuccess} />
      )}
    </MainLayout>
  );
}

export default App;
