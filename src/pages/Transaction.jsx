import { useEffect, useState } from "react";
import Client from "../../services/api";
import { BASE_URL } from "../../globals";
import TransactionBox from "../components/TransactionBox";
import EmptyPage from "../components/EmptyPage";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getTransactionHistory = async () => {
      const response = await Client.get(`${BASE_URL}/users/me/transactions`);
      setTransactions(response.data);
    };
    getTransactionHistory();
  }, []);
  return (
    <>
      <div className="transactions-page">
        <div className="transactions-header">
          <img
            onClick={() => navigate(-1)}
            src="/design-images/back-arrow-with-circle.svg"
            alt="back"
          />
          <div className="change-pass-header">Transaction history</div>
        </div>
        {transactions.length === 0 ? (
          <div className="no-transaction-container">
            {" "}
            <EmptyPage image={"/design-images/transaction_not_found.svg"} />
            <p className="main-text-transaction">No transactions found</p>
            <p className="sub-text-transac">
              View and refer back to all the transactions you have made here{" "}
            </p>
          </div>
        ) : (
          <div className="transactions-grid">
            {transactions &&
              transactions.map((transaction) => (
                <TransactionBox
                  key={transaction._id}
                  transaction={transaction}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Transaction;
