import axios from "axios"
import Genre from "../models/genre/Genre"


class Genres {

    async getGenres(): Promise<Genre[]> {
        const response = await axios.get<Genre[]>(`${import.meta.env.VITE_REST_SERVER_URL}/genres`)
        return response.data
    }
}

const genresServices = new Genres()
export default genresServices