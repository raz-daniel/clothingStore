import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header(): JSX.Element {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const navigate = useNavigate()

    function handleSearch() {
        if (searchTerm.trim()) {
            navigate(`/books/list?search=${searchTerm}`)
        }
    }

    return (
        <div className='Header'>

            <div>
                <nav>
                    <NavLink to="books/list">Books</NavLink>
                    <NavLink to="books/add">Add Book</NavLink>
                    <NavLink to="/home">Home</NavLink>
                </nav>
            </div>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }}>
                    <input
                        placeholder='search a book...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type='submit'>Search</button>
                </form>
            </div>

        </div>
    )
}