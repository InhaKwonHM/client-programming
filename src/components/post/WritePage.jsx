import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {app} from '../../firebase'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const WritePage = () => {
    const db = getFirestore(app);
    const [form, setForm] = useState({
        email: sessionStorage.getItem('email'),
        date:'',
        title:'',
        body:''
    });
    const {title, body} = form;
    const navi = useNavigate();

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if(title==='' || body ==='') {
            console.log('test')
            alert(`${!title&&!body?'제목 과 내용':(!title?'제목':'내용')}을 입력하세요!`);
        } else {
            const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            addDoc(collection(db,'post'), {...form, date});
            navi('/post')
        }
    }

    const onReset = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            title:'',
            body:''
        })
    }
    return (
        <div>
            <h1 className='text-center my-5'>글쓰기</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Form onSubmit={onSubmit} onReset={onReset}>
                        <Form.Control 
                            name='title' value={title}
                            placeholder='제목을 입력하세요.' 
                            className='mb-3' 
                            onChange={onChange}
                            />
                        <Form.Control
                            name='body' value={body}
                            as='textarea' rows={10} placeholder='내용을 입력하세요.' 
                            onChange={onChange}
                            />
                        <div className='mt-3 text-center'>
                            <Button type='submit' className='px-5 mx-2' variant='success'>등록</Button>
                            <Button type='reset' className='px-5' variant='secondary'>취소</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default WritePage
