import axios from "axios"
import Item from "../models/item/Item"
import Draft from "../models/item/Draft"

class Items {

    async getAllItems(): Promise<Item[]> {
        const response = await axios.get<Item[]>(`${import.meta.env.VITE_REST_SERVER_URL}/items`)
        return response.data
    }

    async getItemsPerCategory(categoryId: string): Promise<Item[]> {
        const response = await axios.get<Item[]>(`${import.meta.env.VITE_REST_SERVER_URL}/items/category/${categoryId}`)
        return response.data
    }

    async add(draft: Draft): Promise<Item> {
        const response = await axios.post<Item>(`${import.meta.env.VITE_REST_SERVER_URL}/items/`, draft)
        return response.data
    }

    async remove(id: string): Promise<boolean> {
        const response = await axios.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/items/${id}`)
        return response.data
    }
}

const itemsServices = new Items()
export default itemsServices