import React, { useState } from "react";

type plan = {
  id: number;
  name: string;
  price: number;
};
const plans: plan[] = [
  { id: 1, name: "Basic Plan", price: 20 },
  { id: 2, name: "Standard Plan", price: 40 },
  { id: 3, name: "Premium Plan", price: 60 },
];

const RenewPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const handleSelect = (plan: string) => {
    setSelectedPlan(plan);
    // onSelectPlan(plan);
  };

  return (
    <div>
      <h2>Choose a New Plan</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <input
              type="radio"
              id={plan.id.toString()}
              value={plan.name}
              checked={selectedPlan === plan.name}
              onChange={() => handleSelect(plan.name)}
            />
            <label htmlFor={plan.id.toString()}>
              {plan.name} - ${plan.price}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenewPlan;
