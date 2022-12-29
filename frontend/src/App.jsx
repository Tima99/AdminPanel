import { Register } from "./features/Register";
import { Login } from "./features/Login";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateUser } from "./features/CreateUser";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/home" element={<Home />}>
                <Route path="/home/createUser" element={<CreateUser />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
