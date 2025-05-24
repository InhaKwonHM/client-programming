import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Form, InputGroup, Row } from 'react-bootstrap';
import BookPage from './BookPage';
import { BsCart2 } from "react-icons/bs";
import { app } from '../firebase'
import { getDatabase, ref, set, get } from 'firebase/database'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


const HomePage = () => {

    const db = getDatabase(app);
    const [loading, setLoading] = useState(false);
    const uid = sessionStorage.getItem('uid');
    const navi = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [query, setQuery] = useState('리액트')
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);


    const callAPI = async () => {
        const url = "https://dapi.kakao.com/v3/search/book?target=title"
        const config = {
            headers: {
                Authorization: "KakaoAK " + process.env.REACT_APP_KAKAO_REST_KEY
            },
            params: {
                query: query,
                size: 12,
                page: page
            }
        }
        const res = await axios.get(url, config);

        setDocuments(res.data.documents);
        setLast(Math.ceil(res.data.meta.pageable_count / 12))
    }

    useEffect(() => {
        callAPI();
    }, [page]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (query === '') {
            alert("검색어를 입력하세요!");
        } else {
            setPage(1);
            callAPI();
        }
    }

    const onClickCart = (book) => {
        if(uid) {
            //장바구니에 넣기
            get(ref(db,`cart/${uid}/${book.isbn}`))
            .then(snapshot=> {
                if(snapshot.exists()) {
                    alert('장바구니에 이미 존재합니다.')
                }
                else {
                    const date = moment(new Date()).format('YYYY-MM-DD HH:mm-ss');
                    set(ref(db, `cart/${uid}/${book.isbn}`), { ...book, date });
                    alert('장바구니 추가 완료')
                }
            })
        }
        else {
            navi('/login')
        }
    }

    if(loading) return <h1 className='text-center my-5'>로딩중......</h1>

    return (
        <div>
            <h1 className='my-4 text-center'>홈페이지</h1>

            <Row className='mb-3'>
                <Col>
                    <Form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control
                                onChange={(e) => setQuery(e.target.value)}
                                value={query} />
                            <Button type="submit">검색</Button>
                        </InputGroup>
                    </Form>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>

            <Row>
                {documents.map(doc =>
                    <Col lg={2} md={3} xs={6} className='mb-2'>
                        <Card>
                            <Card.Body>
                                <BookPage book = {doc}/>
                            </Card.Body>
                            <Card.Footer>
                                <div className='text-truncate'>{doc.title}</div>
                                <Row>
                                    <Col>
                                        {doc.sale_price}원
                                    </Col>
                                    <Col className='text-end cart'>
                                        <BsCart2 onClick={()=>onClickCart(doc)}/>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
            <div className='text-center my-3'>
                <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}> 이전 </Button>
                <span className='mx-3'> {page} / {last} </span>
                <Button
                    disabled={page === last}
                    onClick={() => setPage(page + 1)}> 다음 </Button>
            </div>
        </div>
    )
}

export default HomePage
