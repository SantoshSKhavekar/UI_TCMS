import React, { useEffect, useState } from "react";

type plan = {
  id?: number;
  name: string;
  cost: number;
  validity: number;
  status: string;
};

const ChoosePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [plans, setPlans] = useState<plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/plans");

        const plansResult = await response.json();
        setPlans(plansResult);
      } catch (e) {
        console.log(e);
      }
    };

    fetchPlans();
  }, []);

  const handleSelect = async (plan: plan, planName: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/chooseplan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: plan.name,
          planCost: plan.cost,
          validity: plan.validity,
          planStatus: plan.status,
        }),
      });

      const result = await response.json();
      setMessage(result.message);
      setSelectedPlan(planName);
    } catch (e) {
      console.log(e);
      setMessage((e as Error).message);
    }
  };

  return (
    <div>
      <h2>Choose a New Plan and Check Message.</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <input
              type="radio"
              id={plan?.id?.toString()}
              value={plan.name}
              checked={selectedPlan === plan.name}
              onChange={() => handleSelect(plan, plan.name)}
            />
            <label htmlFor={plan?.id?.toString()}>
              {plan.name} - Cost: ${plan.cost}, Validity: {plan.validity} days,
              Status: {plan.status}
            </label>
          </li>
        ))}
      </ul>
      <p>
        {message} {selectedPlan}
      </p>
    </div>
  );
};

export default ChoosePlan;
