import Client from "./api";

export const listAuctions = async () => {
  try {
    const response = await Client.get("/auctions");
    return response.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw error;
  }
};
