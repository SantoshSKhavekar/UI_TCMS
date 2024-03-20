import React, { useState } from "react";
import { useUser } from "./userContext";
import { useNavigate } from "react-router-dom";
import "./TabComponent.css";

const TabComponent = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Choose New Plan");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Choose New Plan") {
      navigate("/choosePlan");
    } else if (tab === "Renew Plan") {
      navigate("/renewPlan");
    } else if (tab === "Upgrade/Downgrade Plan") {
      navigate("/upgradeDowngradePlan");
    }
  };

  return (
    <div>
      <div className="tab-buttons">
        <button
          onClick={() => handleTabClick("Choose New Plan")}
          className={activeTab === "Choose New Plan" ? "active" : ""}
        >
          Choose New Plan
        </button>
        {/* <button
          onClick={() => handleTabClick("Renew Plan")}
          className={activeTab === "Renew Plan" ? "active" : ""}
        >
          Renew Plan
        </button>
        <button
          onClick={() => handleTabClick("Upgrade/Downgrade Plan")}
          className={activeTab === "Upgrade/Downgrade Plan" ? "active" : ""}
        >
          Upgrade/Downgrade Plan
        </button> */}
      </div>
    </div>
  );
};

export default TabComponent;
