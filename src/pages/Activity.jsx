import NavBar from "../components/NavBar";
import { useState, useEffect, useContext } from "react";
import AuctionBox from "../components/AuctionBox";
import Notificiation from "../components/Notification";
import UserContext from "../context/UserContext";
import EmptyPage from "../components/EmptyPage";
import { io } from "socket.io-client";
import Client from "../../services/api";
const socket = io("wss://mazad-704ecf2af46e.herokuapp.com");

const Activity = ({ notification, setNotification }) => {
  const [auctions, setAuctions] = useState([]);
  const [activeButton, setActiveButton] = useState("Bids");
  const [userPurchases, setUserPurchases] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserAuctions = async () => {
      const response = await Client.get(`/auctions/me/user`);
      setAuctions(response.data.response);
    };
    const getUserPurchases = async () => {
      const response = await Client.get(`/auctions/me/purchases`);
      console.log(response.data.purchases);
      setUserPurchases(response.data.purchases);
    };
    getUserAuctions();
    getUserPurchases();
  }, []);

  return (
    <div className="activity-page">
      {notification && (
        <Notificiation
          notification={notification}
          setNotification={setNotification}
        />
      )}
      <header>
        <p className="activity-header">Activity</p>
        <div className="toggle-buttons">
          <button
            className={activeButton === "Bids" ? "active" : ""}
            onClick={() => setActiveButton("Bids")}
          >
            Bids
          </button>
          <button
            className={activeButton === "Purchases" ? "active" : ""}
            onClick={() => {
              setActiveButton("Purchases");
            }}
          >
            Purchases
          </button>
        </div>
        <div className="auctions-search-filter">
          <input type="text" name="search" placeholder="Search" />
          <span>
            <img src="/design-images/filter-icon.png" alt="filter-auctions" />
          </span>
        </div>
      </header>
      <main>
        {activeButton === "Bids" ? (
          auctions.length === 0 ? (
            <EmptyPage image="/design-images/no-assets-found.svg" />
          ) : (
            <div className="auctions-grid">
              {auctions.map((auction) => (
                <AuctionBox
                  key={auction._id}
                  auction={auction}
                  activeButton={activeButton}
                />
              ))}
            </div>
          )
        ) : userPurchases.length === 0 ? (
          <EmptyPage image="/design-images/no-assets-found.svg" />
        ) : (
          <div className="auctions-grid">
            {userPurchases.map((purchase) => (
              <AuctionBox
                key={purchase._id}
                auction={purchase}
                activeButton={activeButton}
              />
            ))}
          </div>
        )}
      </main>
      <NavBar />
    </div>
  );
};

export default Activity;
