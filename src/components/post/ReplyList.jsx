import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { getFirestore, collection, query, orderBy, where, onSnapshot,  doc, setDoc, deleteDoc } from 'firebase/firestore'
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { MdDeleteForever, MdEdit } from "react-icons/md";

const ReplyList = ({ pid }) => {
    const sessionEmail = sessionStorage.getItem('email');
    const db = getFirestore(app);
    const [replys, setReplys] = useState([]);
    const getList = () => {
        const q=query(collection(db,'reply'),where('pid', '==', pid),orderBy('date','desc'))
        onSnapshot(q, snapshot=>{
            let rows=[];
            snapshot.forEach(row=>{
                rows.push({id:row.id, ...row.data()})
            })
            const data = rows.map(row => 
                row && {...row, ellipsis: true, edit: false, text: row.content}
            );
            setReplys(data);
        })
    }

    useEffect(()=>{
        getList();
    },[])

    const onClickContents = (id) => {
        const data = replys.map(reply=>reply.id===id ? 
            {...reply, ellipsis:!reply.ellipsis}: reply);
        setReplys(data);
    }

    const onClickUpdate = (id) => {
        const data = replys.map(reply=>reply.id===id ? 
            {...reply, edit:!reply.edit} : reply);
        setReplys(data);
    }
    
    const onClickSave = async (id) => {
        if(window.confirm(`${id} 댓글을 갱신하시겠습니까?`)){
            const data = replys.find(reply => reply.id === id);
            const reply = {
                pid: data.pid, 
                content: data.content, 
                date: data.date, 
                email: data.email
            }
            await setDoc(doc(db, 'reply', id), reply);
        }
    }

    const onClickDelete = async (id) => {
        if(window.confirm(`${id} 댓글을 삭제하시겠습니까?`)){
            await deleteDoc(doc(db, 'reply', id));
        }
    }

    const onChangeContents = (id, e)=> {
        const data = replys.map(reply=> reply.id===id ? 
            {...reply, content:e.target.value}: reply);
        setReplys(data);
    }

    const onClickCancel = (r) => {
        const data = replys.map(reply=>reply.id===r.id ? 
            {...reply, edit:false, content:reply.text} : reply);
        setReplys(data);
    }


    return (
        <Row className='justify-content-center'>
            <Col md={10}>
                {
                    replys.map(reply=>
                    <div key={reply.id} className='my-5'>
                        <Row>
                            <Col className='text-muted'>
                                {reply.date}:{reply.email}
                            </Col>
                            {reply.email === sessionEmail && !reply.edit &&
                                <Col className='text-end'>
                                    <MdEdit onClick={()=>onClickUpdate(reply.id)} className='edit' title="수정"/>
                                    <MdDeleteForever onClick={()=>onClickDelete(reply.id)} className='delete' title="삭제"/>
                                </Col>
                            }
                        </Row>
                        {reply.edit ? 
                            <Form>
                                <TextareaAutosize className='textarea'
                                    onChange={(e)=>onChangeContents(reply.id, e)}
                                    value={reply.content}/>  
                                <div className='text-end'>
                                    <Button 
                                        size='sm' variant='primary' className='mx-2' 
                                        onClick={() => onClickSave(reply.id)}
                                        disabled={reply.text===reply.content}>저장</Button>
                                    <Button 
                                        onClick={()=>onClickCancel(reply)} 
                                        size='sm' variant='secondary'>취소</Button>
                                </div>      
                            </Form>
                            :
                            <div onClick={()=>onClickContents(reply.id)} style={{cursor:'pointer'}}
                                className={reply.ellipsis ? 'ellipsis2' : ''}>
                                    <p style={{whiteSpace:'pre-wrap'}}>{reply.content}</p>
                            </div>
                        }
                        </div>
                    )
                }
            </Col>
        </Row>
    )
}

export default ReplyList
