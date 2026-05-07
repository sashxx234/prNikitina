import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Reg } from "./components/Reg";
import { Auth } from "./components/Auth";
// import { Req } from "./components/Req";
// import { FormReq } from "./components/FormReq";
// import { Adm } from "./components/Adm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Reg />} />
        {/* <Route path="/requests" element={<Req />} />
        <Route path="/new-request" element={<FormReq />} /> */}
        {/* <Route path="/admin" element={<Adm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;