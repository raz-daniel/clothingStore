import axios from "axios"
import Draft from "../models/book/Draft"
import Book from "../models/book/Book"

class Books {

    async getAllBooks(): Promise<Book[]> {
        const response = await axios.get<Book[]>(`${import.meta.env.VITE_REST_SERVER_URL}/books`)
        return response.data
    }

    async getBooksPerGenre(genreId: string): Promise<Book[]> {
        const response = await axios.get<Book[]>(`${import.meta.env.VITE_REST_SERVER_URL}/books/${genreId}`)
        return response.data
    }

    async add(draft: Draft): Promise<Book> {
        const response = await axios.post<Book>(`${import.meta.env.VITE_REST_SERVER_URL}/books/`, draft)
        return response.data
    }

    async remove(id: string): Promise<boolean> {
        const response = await axios.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/books/${id}`)
        return response.data
    }
}

const booksServices = new Books()
export default booksServices