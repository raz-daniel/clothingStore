import { ChangeEvent, useEffect, useState } from 'react'
import './List.css'
import Card from '../card/Card'
import { useLocation, useSearchParams } from 'react-router-dom'
import Genre from '../../../models/genre/Genre'
import Book from '../../../models/book/Book'
import genresServices from '../../../services/genres'
import booksServices from '../../../services/books'

export default function List(): JSX.Element {

    const [genres, setGenres] = useState<Genre[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const location = useLocation()
    const newBookId = location.state?.newBookId
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    useEffect(() => {
        (async () => {
            try {
                const genres = await genresServices.getGenres()
                setGenres(genres)

                const allBooks = await booksServices.getAllBooks()

                if (searchTerm) {
                    const filteredBooks = allBooks.filter(book =>
                        book.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    setBooks(filteredBooks)
                } else {
                    setBooks(allBooks);
                }
            } catch (error) {
                alert(error)
            }
        })()
    }, [searchTerm])

    async function genreChanged(event: ChangeEvent<HTMLSelectElement>) {
        try {
            const selectedGenreId = event.currentTarget.value
            const books = await booksServices.getBooksPerGenre(selectedGenreId)

            // if (selectedGenreId) {
            //     const selectedGenre = genres.find(genre => genre.id === selectedGenreId)
            //     if (selectedGenre) {
            //         const booksWithGenre = books.map(book => ({
            //             ...book,
            //             genre: selectedGenre
            //         }))

            //         setBooks(booksWithGenre as Book[])
            //     } else {
            //         setBooks(books)
            //     }
            // } else {
                setBooks(books)
            // }
        } catch (error) {
            alert(error)
        }
    }

    function removeBook(id: string) {
        setBooks(books.filter(book => book.id !== id))
    }

    return (
        <div className='List'>

            <select onChange={genreChanged} defaultValue="">
                <option value="">Show All</option>
                {genres.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>

            <div className='CardContainer'>
                {books.map(b =>
                    <Card
                        key={b.id}
                        book={b}
                        removeBook={removeBook}
                        isNew={b.id === newBookId}
                    />
                )}
            </div>
        </div>
    )
}