
import Client from "./api";

export const createItem = async (itemData) => {
    const response = await Client.post("/items", itemData)
    console.log(response.data);
}

export const getSellerItems = async () => {
    const response = await Client.get("/items")
    console.log(response.data);
    return response.data;
}
