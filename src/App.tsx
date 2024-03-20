import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import RegisterCustomer from "./components/RegisterCustomer";
import ChoosePlan from "./components/ChoosePlan";
import CustomerDetailsTable from "./components/CustomerDetailsTable";
import { UserProvider } from "./components/userContext";
import RenewPlan from "./components/RenewPlan";
import UpgradePlan from "./components/UpgraedDowngradePlan";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <div>
            <Routes>
              <Route path="/" element={<RegisterCustomer />} />
              <Route path="/choosePlan" element={<ChoosePlan />} />
              <Route path="/dashboard" element={<CustomerDetailsTable />} />
              <Route path="/renewPlan" element={<RenewPlan />} />
              {/* <Route path="/upgradeDowngradePlan" element={<UpgradePlan />} /> */}
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
