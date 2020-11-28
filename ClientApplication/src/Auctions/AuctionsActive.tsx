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

interface IProps{
  ClickHandler1: (prop : any[]) => void
  ClickHandler2: (prop : boolean) => void
  b : boolean
  list :any[]
  BackHandler: (prop : boolean) => void
}



export default function AuctionList(props : IProps){
  let a : Auction[] =[];
    const [data, setData] = useState(a);
    const [isError, setIsError] = useState(false);
    const [selected,setSelected] = useState(0);
    const [selectedmaxsum,setSelectedMaxSum] = useState(0);
    const [isSelected,setSelect]=useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        try {
          const res = await axios('https://localhost:5001/api/auction?filterMode=active',);
          setData(res.data);
        } catch (error) {
          setIsError(true);
        }
      };
      fetchData();
    },[isSelected]);

  const handleBack=()=> {
    setSelect(false);
    props.BackHandler(false);
  }

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isSelected ? ( 
        <SingleAuction id={selected} sum={selectedmaxsum} BackHandler={handleBack} />
      ) : (
        <Container>
            <Row>
            {
            data.map(item => (
                    <Col  xs={12} md={6}>
                        <br/>
                       <Card className="shadow" bg='dark' onClick={()=>{
                         setSelected(item.id);
                         setSelectedMaxSum(item.actualPrice);
                         setSelect(true);
                         props.BackHandler(true);}}>
                          <Row>
                            <Col xs={4}>
                               <Image key={item.thingID} id={item.thingID} small={true}/>
                            </Col>
                            <Col>
                                <Card.Title>{item.thingName}</Card.Title>
                                <Card.Body><h6>Price: {item.actualPrice} Ft</h6>
                                {item.statusz === 1 ? (<div> Remaining time: <Moment toNow ago>{item.endTime}</Moment></div>) : (<div> </div>)}
                                </Card.Body>

                             </Col>
                          </Row>
                         <Card.Footer>{item.statusz === 1 ? (<div> 
                          <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-calendar-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
</svg>

                            <>   Active</></div>) : (<div>Upcoming</div>)}</Card.Footer>
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