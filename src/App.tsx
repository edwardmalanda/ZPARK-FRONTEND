import React from "react";
import { Dashboard } from "./modules/dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
import VehicleLookupPage from "./modules/vehicles/VehicleLookUp.tsx";






export const App: React.FC = () => {
  return (
<>
    <Routes>
  <Route path="/*" element={ <Dashboard/> } />
  <Route index element={<Dashboard/> } />
   <Route path="/vehicle-lookup" element={<VehicleLookupPage />} />
     
   </Routes> 
   </>
  );
};



