import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import TextareaAutosize  from 'react-textarea-autosize';
import { app } from '../../firebase';
import { getFirestore,addDoc, collection } from 'firebase/firestore'
import moment from 'moment/moment';
import ReplyList from './ReplyList';
import { useNavigate } from 'react-router-dom';



const ReplyPage = ({id}) => {
    const db = getFirestore(app);
    const email = sessionStorage.getItem('email');
    const [content, setContent] = useState('');
    const navi = useNavigate();
    
    const onWrite = async () => {
        const reply = {
            pid:id,
            email,
            content,
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }
        await addDoc(collection(db,'reply'), reply)
        setContent('')
    }

    const onClickLogin = () => {
        sessionStorage.setItem('target', '/post/'+id);
        navi('/login');
    }
    

    return (
        <div className='my-5'>
            {email ? 
                <Row className='justify-content-center'>
                    <Col md={10}>
                        
                        <TextareaAutosize 
                            className='textarea' 
                            value={content} 
                            onChange={(e)=>setContent(e.target.value)} 
                            placeholder='댓글을 입력하세요.'/>
                        <Button disabled={content===''} onClick={onWrite}>등록</Button>
                    
                    </Col>
                </Row>
                :
                <div>
                    <Button className='w-100 my-3' onClick={onClickLogin}>로그인</Button>
                </div>
            }
            <ReplyList pid={id}/>
        </div>
    )
}

export default ReplyPage
