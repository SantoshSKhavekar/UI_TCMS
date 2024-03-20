import React, { useEffect, useState } from "react";
import "./CustomerDetailsTables.css";
import { useUser } from "./userContext";
import TabComponent from "./TabComponent";
import { useNavigate } from "react-router-dom";
import UpgradePlan from "./UpgraedDowngradePlan";

type Plan = {
  id: string;
  name: string;
  cost: number;
  validity: string;
  status: string;
};
type Customers = {
  name: string;
  email: string;
  phone: string;
  address: string;
  selectedPlan: {
    id: string;
    name: string;
    cost: number;
    validity: string;
    status: string;
  };
};

const CustomerDetailsTable = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customers[]>([]);
  const [message, setMessage] = useState<string>("");
  const [currentPlan, setCurrentPlan] = useState<Plan>();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers");

        const customersResult = await response.json();
        setCustomers(customersResult);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, [message]);

  const handleRenewPlan = async (plan: Plan) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/renewplan/${plan.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            validity: plan.validity,
            status: "Active",
          }),
        }
      );

      const result = await response.json();
      setMessage(result.message);
    } catch (e) {
      console.log(e);
      setMessage((e as Error).message);
    }
  };

  const handleUpgradePlan = async (plan: Plan) => {
    setCurrentPlan(plan);
  };

  const handleUpgrade = (option: any) => {
    // Perform action based on the upgrade option
    console.log(`Upgrading to Plan ${option}`);
  };

  return (
    <div>
      <div>
        {user?.type === "NewUser" && <TabComponent />}

        <label>
          User type: {user?.type !== "NewUser" ? "Existing User" : "New User"}
        </label>
      </div>

      <h2>Customer Details</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Plan Name</th>
            <th>Cost</th>
            <th>Validity(Days)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>

              <td>{customer.selectedPlan.name}</td>
              <td>${customer.selectedPlan.cost}</td>
              <td>{customer.selectedPlan.validity}</td>
              <td>{customer.selectedPlan.status}</td>

              <td>
                {user.type !== "NewUser" &&
                  customer.selectedPlan.status !== "Active" && (
                    <>
                      <button
                        onClick={() => {
                          handleRenewPlan(customer.selectedPlan);
                          // navigate("/renewPlan");
                        }}
                      >
                        Renew
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        // onClick={() => {
                        //   navigate("/upgradeDowngradePlan");
                        // }}
                        onClick={() => {
                          handleUpgradePlan(customer.selectedPlan);
                          // navigate("/renewPlan");
                        }}
                      >
                        Upgrade / Downgrade
                      </button>
                    </>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{message}</p>
      {currentPlan && (
        <UpgradePlan currentPlan={currentPlan} onUpgrade={handleUpgrade} />
      )}
    </div>
  );
};

export default CustomerDetailsTable;
