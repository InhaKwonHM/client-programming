import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { getFirestore, collection, query, orderBy, where, onSnapshot } from 'firebase/firestore'
import { Col, Row } from 'react-bootstrap';

const ReplyList = ({ pid }) => {
    const db = getFirestore(app);
    const [replys, setReplys] = useState([]);
    const getList = () => {
        const q=query(collection(db,'reply'),where('pid', '==', pid),orderBy('date','desc'))
        onSnapshot(q, snapshot=>{
            let rows=[];
            snapshot.forEach(row=>{
                rows.push({id:row.id, ...row.data()})
            })
            setReplys(rows);
        })
    }

    useEffect(()=>{
        getList();
        console.log(replys)
    },[])
    return (
        <Row className='justify-content-center'>
            <Col md={10}>
                {
                    replys.map(reply=>{
                        <div key={reply.id}>
                            <div>
                                {reply.date} : {reply.email}
                            </div>
                            <div>
                                <p style={{'whiteSpace':'pre-wrap'}}>{reply.content}</p>
                            </div>
                        </div>
                    })
                }
            </Col>
        </Row>
    )
}

export default ReplyList
