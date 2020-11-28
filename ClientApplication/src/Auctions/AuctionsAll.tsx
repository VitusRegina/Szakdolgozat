
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
import SearchBox2 from "../Common/ExtendedSearchBox";
import SingleAuction from "./SingleAuction";
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';
import { Auction } from '../Common/Interfaces';
import { remainingTime, stringFromDate } from '../Services/DateService';
import { isTemplateExpression } from "typescript";

interface IProps{
  category : string
}



    var search='';
    var order='';
    var filter='';
    var category='';
    var currentpage=1;

export default function AuctionsAll(props: IProps){
  let a : Auction[] =[];
    const [data, setData] = useState(a);
    const [finaldata, setFinalData] = useState(a);
    const [selected,setSelected] = useState(0);
    const [selectedmaxsum,setSelectedMaxSum] = useState(0);
    const [isSelected,setSelect]=useState(false);
    const [datalenght, setLenght] = useState(0)
    const [maxpage, setMax] = useState(0);
    category=props.category;
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios('https://localhost:5001/api/auction?pageNumber='+currentpage+'&searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
          setData(res.data);
          setFinalData(res.data);
          const num = await axios('https://localhost:5001/api/auction/datalenght?searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
          setLenght(num.data);
          setMax(Math.ceil(num.data/4));
 
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      
    },[isSelected]);

  const handleBack=()=> {setSelect(false);}

  const  SearchHandler= async(t : string)=>{
      search=t;
    try {
        const res = await axios('https://localhost:5001/api/auction?pageNumber='+currentpage+'&searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
        setData(res.data);
        setFinalData(res.data);
        console.log(maxpage);
        const num = await axios('https://localhost:5001/api/auction/datalenght?searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
        setLenght(num.data);
        setMax(Math.ceil(num.data/4));
      } catch (error) {
        console.log(error);
      }
  }

    const OrderHandler= async(mode : number)=>{
      switch(mode)
      {
        case 0:
          order='';
        break;
        case 1:
          order='start_asc';
        break;  
        case 2:
          order='start_desc';
        break;
        case 3:
          order='price_asc';
        break;
        case 4:
          order='price_desc';
        break;
        default:
          order='';
          break;
      }
        try {
            const res = await axios('https://localhost:5001/api/auction?pageNumber='+currentpage+'&searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
            setData(res.data);
            setFinalData(res.data);
            const num = await axios('https://localhost:5001/api/auction/datalenght?searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
            setLenght(num.data);
            setMax(Math.ceil(num.data/4));
          } catch (error) {
            console.log(error);
          }
    }

    const FilterHandler=async(mode : number)=>{
        switch(mode)
        {
          case 0:
            filter='';
            break;
          case 1:
            filter='active';
            break;
          case 2:
            filter='next_week';
            break;
          case 3:
            filter='next_month';
            break;
          default:
            filter='';
            break;
        }
        try {
            const res = await axios('https://localhost:5001/api/auction?pageNumber='+currentpage+'&searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
            setData(res.data);
            setFinalData(res.data);
            const num = await axios('https://localhost:5001/api/auction/datalenght?searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
            setLenght(num.data);
            setMax(Math.ceil(num.data/4));
          } catch (error) {
            console.log(error);
          }
    }
    
    const CategoryHandler=async(cat : number)=>{
      switch(cat)
      {
        case -1:
          category='';
        break;
        case 0:
          category='0';
        break;  
        case 1:
          category='1';
        break;
        case 2:
          category='2';
        break;
        case 3:
          category='3';
        break;
        case 4:
          category='4';
        break;
        case 5:
          category='5';
        break;
        default:
          order='';
          break;
      }
      try {
        const res = await axios('https://localhost:5001/api/auction?pageNumber='+currentpage+'&searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
        setData(res.data);
        setFinalData(res.data);
        const num = await axios('https://localhost:5001/api/auction/datalenght?searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
        setLenght(num.data);
        setMax(Math.ceil(num.data/4));
      } catch (error) {
        console.log(error);
      }
    }

    const handlePageClick = async (data : any) => {
        currentpage=data.selected+1;
        
        try {
          const res = await axios('https://localhost:5001/api/auction?pageNumber='+currentpage+'&searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
          setData(res.data);
          setFinalData(res.data);
          const num = await axios('https://localhost:5001/api/auction/datalenght?searchString='+search+'&sortOrder='+order+'&filterMode='+filter+'&category='+category,);
          setLenght(num.data);
          setMax(Math.ceil(num.data/4));
 
        } catch (error) {
          console.log(error);
        }
   
        console.log(data.selected);
    }

  return (
    <div>
      {isSelected ? ( 
        <SingleAuction id={selected} sum={selectedmaxsum}  BackHandler={handleBack} />
      ) : (
        <Container>
            <SearchBox2 SearchHandler={SearchHandler} OrderHandler={OrderHandler} FilterHandler={FilterHandler} CategoryHandler={CategoryHandler}/>
            <Row>
            {
            finaldata.map(item => (
                <Col  xs={12} md={6}>
                  <br/>
                 <Card className="shadow" bg='dark' onClick={()=>{
                   setSelected(item.id);
                   setSelectedMaxSum(item.actualPrice);
                   setSelect(true);}}>
                    <Row>
                        <Col xs={4}>
                            <Image key={item.thingID} id={item.thingID} small={true}/>
                        </Col>
                        <Col>
                            <Card.Title>{item.thingName}</Card.Title>
                            <Card.Body><h6>Price: {item.actualPrice} Ft</h6> 
                           
                           {item.statusz === 1 ?  
                           (
                              <div>
                                <div> Remaining time:</div>
                                <div> {remainingTime(item.endTime)}</div>
                              </div>
                              )
                            : (
                              <div>
                                <div>Auction will start at:</div>
                                <div>{stringFromDate(item.startTime)}</div>
                              </div>
                              )}
                            </Card.Body>
                        </Col>
                     </Row>
                    <Card.Footer> {item.statusz === 1 ? 
                    (<div> 
                          <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-calendar-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
</svg>

                            <>   Active</></div>) : (<div>
                              <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-calendar-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  <path fill-rule="evenodd" d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z"/>
</svg>
                              <> Upcoming</></div>)}</Card.Footer>
                 </Card>
              </Col>
            ))}
             </Row>
             <br/>
             <ReactPaginate 
                 previousLabel={'previous'}
                 nextLabel={'next'}
                 breakLabel={'...'}
                 breakClassName={'break-me'}
                 pageCount={maxpage}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={handlePageClick}
                 containerClassName={'pagination'}
                 pageClassName={'page-link'}
                 previousClassName={'page-link'}
                 nextClassName={'page-link'}
        />
          </Container>  
      )}
    </div>
  ); 
}