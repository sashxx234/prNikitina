import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Reg } from "./components/Reg";
import { Auth } from "./components/Auth";
import { Req } from "./components/Req";
import { FormReq } from "./components/FormReq";
// import { Adm } from "./components/Adm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Navigate />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/req" element={<Req />} />
        <Route path="/form-req" element={<FormReq />} />
        {/* <Route path="/admin" element={<Adm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;