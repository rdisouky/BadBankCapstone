import { Routes, Route, HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Withdraw from "./components/Withdraw";
import NavBar from "./components/NavBar";
import CreateAccount from "./components/CreateAccount";
import AllData from "./components/AllData";
import Login from "./components/Login";
import Deposit from "./components//Deposit";
import { AuthProvider } from "./auth.js";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Container } from "react-bootstrap";
import Transfer from "./components/Transfer";

const App = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createAccount/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/allData/" element={<ProtectedRoute><AllData /></ProtectedRoute>} />
            <Route path="/deposit/" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
            <Route path="/withdraw/" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
            <Route path="/transfer/" element={<ProtectedRoute><Transfer /></ProtectedRoute>} />
            <Route path="*" element={<h1>Page not Found</h1>} />
          </Routes>
        </Container>
      </AuthProvider>
    </HashRouter>
  );
};
export default App;