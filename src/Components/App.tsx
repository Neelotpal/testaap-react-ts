import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Login";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="users/*" element={<Users />} /> */}
    </Routes>
  </BrowserRouter>



);


export default App;

