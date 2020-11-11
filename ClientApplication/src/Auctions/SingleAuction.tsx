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


interface IFunctionProp {
  id : number;
  sum : number;
  ClickHandler: () => void
}

let kategoria:string;

export const convertISOStringToMonthDay = (date : string) => {
  const tempDate = new Date(date).toString().split(' ');
  const formattedDate = `${+tempDate[3]} ${tempDate[1]} ${+tempDate[2]}`;
  return formattedDate;
};

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

export default function SingleAuction(props: IFunctionProp){
  
    const [data, setData] = useState<Auction>(a);
    const i:number =props.id;
    const[endTime,setEnd]=useState(new Date());
    const[startTime,setStart]=useState(new Date());
    
  
    useEffect(() => {
      const fetchData = async () => { 
        try {
          console.log(i);
          const res = await axios.get<Auction>('https://localhost:5001/api/auction/'+i,);
          setData(res.data);
          setEnd(new Date(data.endTime.toString()));
          setStart(new Date(data.startTime.toString()));
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
  
  
  if(data.statusz === 1)
    return(
      <Container >
      <Row>
        <Col md={6}>
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
              
        </Col>
        <Col>
        <Biding id={props.id} sum={props.sum} startTime={data.startTime.toString()} endTime={data.endTime.toString()}/>
        </Col> 
        </Row>
        <Row>
          <br/>
       <Button  onClick={props.ClickHandler}>Back</Button>
      </Row>
       </Container>
    )
  else
  {
    if(data.statusz === 0)
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
                        <h5>Final price:</h5> {props.sum} Ft 
                        <br/>
                        <br/>
                      </Card>
                      <br/>
                  </Col>
                  <Col>
                  
                      <Card className="text-center">
                      <br/>
                        <h5>Auction ended at: </h5> <Moment format="YYYY.MM.DD hh.mm"  date={endTime} />
                        <br/>
                      </Card>
                      <br/>
                  </Col>
                </Row>
              </Container>
            </Col>       
            </Row>
            <Row>
                <Button  onClick={props.ClickHandler}>Back</Button>
            </Row>
        </Container>
      )
    }
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
                        <h5>Auction will start at: </h5> <Moment format="YYYY.MM.DD hh.mm"  date={endTime} />
                        <br/>
                        
                      </Card>
                      <br/>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
            <Row>
                <Button  onClick={props.ClickHandler}>Back</Button>
            </Row>
        </Container>
      )
    }
    
  }
  
  }