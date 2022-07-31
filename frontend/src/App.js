import "./App.css";
import AdminNavbar from "./Components/Admin/AdminNavbar";
import { BrowserRouter } from "react-router-dom";
import ListRoutes from "./Routes/ListRoutes";
function App() {
  return (
    <BrowserRouter>
      <AdminNavbar />
      <ListRoutes />
    </BrowserRouter>
  );
}

export default App;
