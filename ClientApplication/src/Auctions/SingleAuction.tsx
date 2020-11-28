import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Image from '../Common/Image';
import Biding from "./Biding";
import Moment from 'react-moment';
import { Categories } from '../Common/Enums';
import { Auction } from '../Common/Interfaces';
import AuctionList from "./AuctionsActive";
import { remainingTime,stringFromDate } from '../Services/DateService';
import SendBid from './Biding';


interface IProps {
  id : number;
  sum : number;
  BackHandler: () => void
}

let a : Auction = {
  id : 0,
  startprice: 0,
  thingID: 0,
  thingName: '',
  thingDescription: '',
  thingKategoria: 0,
  actualPrice: 0,
  startTime: new Date(),
  endTime: new Date(),
  statusz: 1
}

export default function SingleAuction(props: IProps){
  
    const [data, setData] = useState<Auction>(a);
    const i:number =props.id;

    useEffect(() => {
      const fetchData = async () => { 
        try {
          const res = await axios.get<Auction>('https://localhost:5001/api/auction/'+i,);
          setData(res.data);
          
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    });
  
  
  if(data.statusz === 1)
    return(
      <Container >
         <Row>
             <Col md={6}>
             <br/>
                 <Card className="text-center">
                  <br/>
                      <h1> {data.thingName}</h1>
                      <div><Image key={data.thingID} id={data.thingID} small={false}/></div>
                      <div>{data.thingDescription}</div>
                  <br/>
                  <div>Category:  <a href="/homeauctions"> {Categories[data.thingKategoria]} </a> </div>
                  <br/>
                 </Card>
              </Col>

              <Col>
                  <br/>
                  <Container className="little-container">
                        <Row>
                            <Col>
                                 <Card className="text-center">
                                    <br/>
                                    <h5>Actual price:</h5> {data.actualPrice} Ft 
                                    <br/>
                                    <br/>
                                 </Card>
                                <br/>
                            </Col>
                            <Col>
                                <Card className="text-center">
                                    <br/>
                                    <h5>Remaining time: </h5> 
                                    {remainingTime(new Date(data.endTime))}
                                    <br/>
                                    <br/>
                                 </Card>
                                  <br/>
                              </Col>
                         </Row>
                    </Container>
                      <br/>
                    <SendBid id={props.id} maxsum={data.actualPrice}/>
              </Col> 
          </Row>

          <Row>
              <br/>
              <Button  onClick={props.BackHandler}>Back</Button>
          </Row>
        </Container>
    )
  else
  {
      return(
        <Container>
          <Row>
          <Col  md={6}>
            <br/>
              <Card className="text-center">
                <br/>
                   <h1> {data.thingName}</h1>
                   <div><Image id={data.thingID} small={false}/></div>
                   <div>{data.thingDescription}</div>
                   <br/>
                   <div>Category:  <a href="/homeauctions"> {Categories[data.thingKategoria]} </a> </div>
                   <br/>
               </Card>    
               <br/>
            </Col>
            <Col>
            <br/>
            <Container className="little-container">
                <Row>
                  <Col>
                  
                     <Card className="text-center">
                     <br/>
                        <h5>Start price:</h5> {props.sum} Ft 
                        <br/>
                        <br/>
                      </Card>
                      <br/>
                  </Col>
                  <Col>
                  
                      <Card className="text-center">
                      <br/>
                        <h5>Auction will start at: </h5>  {stringFromDate(data.startTime)}
                        <br/>
                        <br/>
                      </Card>
                      <br/>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
            <Row>
                <Button  onClick={props.BackHandler}>Back</Button>
            </Row>
        </Container>
      )
  }
  
  }