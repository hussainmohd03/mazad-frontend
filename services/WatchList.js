import Client from "./api";

export const addToWatchList = async (id) => {
  try {
    const response = await Client.put(`watchlist/me/add/${id}`, {
      auctionId: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

export const removeFromWatchList = async (id) => {
  try {
    const response = await Client.put(`watchlist/me/remove/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
};

export const getWatchList = async () => {
  try {
    const response = await Client.get("watchlist/me");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};
