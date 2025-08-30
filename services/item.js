
import Client from "./api";

export const createItem = async (itemData) => {
    const response = await Client.post("/items", itemData)
    console.log(response.data);
}


