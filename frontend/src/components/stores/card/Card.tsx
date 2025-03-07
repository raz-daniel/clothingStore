import { useEffect, useState } from 'react'
import './Card.css'
import Book from '../../../models/book/Book'
import booksServices from '../../../services/books'

interface CardProps {
    book: Book
    removeBook(id: string): void
    isNew?: boolean
}

export default function Card(props: CardProps): JSX.Element {

    const { id, name, summary, price, stock, genre } = props.book
    const { isNew } = props
    const [highlight, setHighlight] = useState(isNew || false)

    useEffect(() => {
        if (isNew) {
            setHighlight(true)
            const timer = setTimeout(() => {
                setHighlight(false)
            },2000)
            return () => clearTimeout(timer)
        }
    }, [isNew])

    async function deleteMe() {
        try {
            await booksServices.remove(id)
            props.removeBook(id)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className={`Card ${highlight ? 'highlight' : ''}`}>
            <h4>{name}</h4>
            <p>{summary}</p>
            <p>{genre.name}</p>
            <p>Price: ${price}</p>
            <p>Stock: {stock}</p>
            <div>
                <button onClick={deleteMe}>delete</button>
            </div>
        </div>

    )
}