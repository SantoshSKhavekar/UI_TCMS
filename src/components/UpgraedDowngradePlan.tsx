import React, { useState } from "react";

type Plan = {
  id: string;
  name: string;
  cost: number;
  validity: string;
  status: string;
};

interface props {
  currentPlan: Plan;
  onUpgrade: (option: any) => void;
}
const UpgradePlan = ({ currentPlan, onUpgrade }: props) => {
  const [upgradeOption, setUpgradeOption] = useState("1"); // Default to option 1
  const [message, setMessage] = useState<string>("");

  const handleUpgradeOptionChange = (event: any) => {
    setUpgradeOption(event.target.value);
  };

  const handleUpgradeClick = async () => {
    // Pass the selected upgrade option to the parent component
    try {
      console.log(upgradeOption);
      const response = await fetch(
        `http://localhost:5000/api/updowngrade/${currentPlan.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPlanName: currentPlan.name,
            newPlanName: upgradeOption,
            cost: upgradeOption,
            validity: currentPlan.validity,
            status: "Active",
          }),
        }
      );

      const result = await response.json();
      onUpgrade(upgradeOption);
      setMessage(result.message);
    } catch (e) {
      console.log(e);
      setMessage((e as Error).message);
    }
  };

  return (
    <div>
      <h2>Upgrade Your Plan</h2>
      <div>
        <p>Current Plan: {currentPlan.name}</p>
      </div>
      <div>
        <h3>Upgrade Options</h3>
        <label>
          <input
            type="radio"
            value="2"
            checked={upgradeOption === "2"}
            onChange={handleUpgradeOptionChange}
          />
          Upgrade to Plan 2 - Cost: ${currentPlan.cost + 100}
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="3"
            checked={upgradeOption === "3"}
            onChange={handleUpgradeOptionChange}
          />
          Upgrade to Plan 3 - Cost: ${currentPlan.cost + 200}
        </label>
      </div>
      <button onClick={handleUpgradeClick}>Upgrade</button>
      <p>{message}</p>
    </div>
  );
};

export default UpgradePlan;
