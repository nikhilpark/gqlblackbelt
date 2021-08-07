import React from 'react'
import {gql,useQuery} from '@apollo/client'

const getBooks = gql`
    {
        books{
            name
            author{
                name
            }
        }
    }
`


const BookList = () => {

    const {loading,error,data} = useQuery(getBooks)
    console.log(data)
    if (loading) return <p>...loadng</p>
    if (error) return <p>ERROR - {error.message}</p>
    return (
        <div>
            <ul id="book-list">
                {data.books.map((book)=>{return(
                    <li>{book.name} written by {book.author.name}</li>
                )})}
            </ul>
        </div>
    )
}

export default BookList;
 