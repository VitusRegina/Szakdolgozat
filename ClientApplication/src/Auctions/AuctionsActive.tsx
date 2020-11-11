import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import * as signalR from "@microsoft/signalr";
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from '../Common/Image';
import SingleAuction from "./SingleAuction";
import Moment from 'react-moment';
import { Auction } from '../Common/Interfaces';

interface IBasicProp{
  ClickHandler1: (prop : any[]) => void
  ClickHandler2: (prop : boolean) => void
  b : boolean
  list :any[]
  ClickHandler3: (prop : boolean) => void
}



export default function AuctionList(props : IBasicProp){
  let a : Auction[] =[];
    const [data, setData] = useState(a);
    const [finaldata, setFinalData] = useState(a);
    const [isError, setIsError] = useState(false);
    const [selected,setSelected] = useState(0);
    const [selectedmaxsum,setSelectedMaxSum] = useState(0);
    const [isSelected,setSelect]=useState(false);
    const [searchtext,setSearchText]=useState('');

    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        try {
          const res = await axios('https://localhost:5001/api/auction?filterMode=active',);
          setData(res.data);
          setFinalData(res.data);
        } catch (error) {
          setIsError(true);
          console.log(error);
        }
      };
      fetchData();
    },[]);

  const handleBack=()=> {setSelect(false);props.ClickHandler3(false);}

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isSelected ? ( 
        <SingleAuction id={selected} sum={selectedmaxsum} ClickHandler={handleBack} />
      ) : (
        <Container>
            <Row>
            {
            finaldata.map(item => (
                    <Col  xs={12} md={6}>
                        <br/>
                       <Card className="shadow" bg='dark' onClick={()=>{setSelected(item.id);setSelectedMaxSum(item.actualPrice);setSelect(true);props.ClickHandler3(true);}}>
                          <Row>
                            <Col xs={4}>
                               <Image id={item.thingID} small={true}/>
                            </Col>
                            <Col>
                                <Card.Title>{item.thingName}</Card.Title>
                                <Card.Body><h6>Price: {item.actualPrice} Ft</h6>
                                {item.statusz === 1 ? (<div> Remaining time: <Moment toNow ago>{item.endTime}</Moment></div>) : (<div></div>)}
                                </Card.Body>

                             </Col>
                          </Row>
                         <Card.Footer>{item.statusz === 1 ? (<div>Active</div>) : (<div>Upcoming</div>)}</Card.Footer>
                       </Card>
                    </Col>  
            ))}
             </Row>
             <br/>
             
          </Container>  
      )}
    </div>
  ); 
}