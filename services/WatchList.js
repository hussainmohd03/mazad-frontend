import Client from "./api";

export const addToWatchList = async (id) => {
  try {
    const response = await Client.post(`/watchlist/me/${id}`, {
      auctionId: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};
