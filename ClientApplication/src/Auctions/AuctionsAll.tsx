
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

interface IBasicProp{
  category : string
}



var search='';
    var order='';
    var filter='';
    var category='';
    var currentpage=1;

export default function AuctionsAll(props: IBasicProp){
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
      
    },[]);

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
          category='1';
        break;  
        case 1:
          category='2';
        break;
        case 2:
          category='3';
        break;
        case 3:
          category='4';
        break;
        case 4:
          category='5';
        break;
        case 5:
          category='6';
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
        <SingleAuction id={selected} sum={selectedmaxsum} ClickHandler={handleBack} />
      ) : (
        <Container>
            <SearchBox2 SearchHandler={SearchHandler} OrderHandler={OrderHandler} FilterHandler={FilterHandler} CategoryHandler={CategoryHandler}/>
            <Row>
            {
            finaldata.map(item => (
                <Col  xs={12} md={6}>
                  <br/>
                 <Card className="shadow" bg='dark' onClick={()=>{setSelected(item.id);setSelectedMaxSum(item.actualPrice);setSelect(true);}}>
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
                    <Card.Footer> {item.statusz === 1 ? (<div>Active</div>) : (<div>Upcoming</div>)}</Card.Footer>
                 </Card>
              </Col>
            ))}
             </Row>
             <br/>
             <Container className='text-center'>
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
          </Container>  
      )}
    </div>
  ); 
}