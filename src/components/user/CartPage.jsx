import React, { useEffect, useState } from 'react'
import {app} from '../../firebase'
import {getDatabase, ref, onValue, remove} from 'firebase/database'
import { Button, Table } from 'react-bootstrap';
import BookPage from '../BookPage';
import { RiDeleteBin2Line } from "react-icons/ri";

const CartPage = () => {
    const uid = sessionStorage.getItem('uid');
    const [loading, setLoading] = useState(false);
    const [books,setBooks] = useState([]);
    const db = getDatabase(app);
    const getCart = () => {
        setLoading(true)
        onValue(ref(db,`cart/${uid}`), snapshot=>{
            const rows=[]
            snapshot.forEach(row=>{
                rows.push({key:row.key, ...row.val()})
            })
            setBooks(rows);
            setLoading(false);
        });
    }

    useEffect(() => {
        getCart();
    },[]);
    const onClickRemove = (book) => {
        if(window.confirm(`'${book.title}' 을(를) 삭제하시겠습니까?`)) {
            remove(ref(db, `cart/${uid}/${book.isbn}`));
        }
    }

    if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
    return (
        <div>
            <h1 className='my-4 text-center'>장바구니</h1>
            <Table>
                <thead>
                    <tr>
                        <td></td>
                        <td>제목</td>
                        <td>등록일</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book=>
                        <tr key={book.isbn}>
                            <td width={50}><BookPage book={book}/></td>
                            <td>{book.title}</td>
                            <td>{book.date}</td>
                            <td><Button variant='outline-danger' size="sm" onClick={()=>onClickRemove(book)}><RiDeleteBin2Line   size="20"/></Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default CartPage
