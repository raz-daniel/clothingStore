import { useEffect, useState } from 'react'
import './Add.css'
import { useForm } from 'react-hook-form'
import Draft from '../../../models/book/Draft'
import { useNavigate } from 'react-router-dom'
import Genre from '../../../models/genre/Genre'
import genresServices from '../../../services/genres'
import booksServices from '../../../services/books'

export default function Add(): JSX.Element {
    const [genres, setGenres] = useState<Genre[]>([])
    useEffect(() => {
        (async () => {
            try {
                const genres = await genresServices.getGenres()
                setGenres(genres)
            } catch (error) {
                alert(error)
            }

        })()
    }, [])

    const { register, handleSubmit, formState } = useForm<Draft>()

    const navigate = useNavigate()

    async function submit(draft: Draft) {
        try {
            const newBook = await booksServices.add(draft)
            alert('Added Book')
            navigate('/books/list', { state: { newBookId: newBook.id } })
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='Add'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='book name' {...register('name', {
                    required: {
                        value: true,
                        message: 'must enter name'
                    }
                })}/>
                <span className='error'>{formState.errors.name?.message}</span>
                

                <input placeholder='summary' {...register('summary', {
                    required: {
                        value: true,
                        message: 'must enter summary'
                    },
                    minLength: {
                        value: 10,
                        message: 'must enter at least 10 letters'
                    }
                })}/>
                <span className='error'>{formState.errors.summary?.message}</span>

                <select defaultValue={''}{...register('genreId', {
                    required: {
                        value: true,
                        message: 'must choose genre'
                    }
                })}>
                    <option value="" disabled selected>Please select genre...</option>
                    {genres.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </select>
                <span className='error'>{formState.errors.genreId?.message}</span>

                <input placeholder='price' {...register('price', {
                    required: {
                        value: true,
                        message: 'must enter price'
                    },
                    min: {
                        value: 0,
                        message: 'price must be positive'
                    }
                })}/>
                <span className='error'>{formState.errors.price?.message}</span>

                <input placeholder='stock' {...register('stock', {
                    required: {
                        value: true,
                        message: 'must enter stock'
                    },
                    min: {
                        value: 0,
                        message: 'stock must be positive'
                    }
                })}/>
                <span className='error'>{formState.errors.stock?.message}</span>

                <button>Add Book</button>

            </form>
        </div>
    )
}