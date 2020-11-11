import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import Image from '../Common/Image';
import SearchBox from '../Common/SearchBox';
import ThingCreate from './CreateThing';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import authHeader from "../Services/TokenService";
import { Thing } from "../Common/Interfaces";



 export default function ThingList(){
      let a : Thing[]=[];   
      const [data, setData] = useState<Thing[]>(a);
      const [finaldata, setFinalData] = useState<Thing[]>(a);
      const [isError, setIsError] = useState(false);
      const [selected,setSelected] = useState(0);
      const [isSelected,setSelect]=useState(false);
      const [searchtext,setSearchText]=useState('');
      const [create, setCreate]=useState(false);
  
      useEffect(() => {
        const fetchData = async () => {
          setIsError(false);
          try {
            const res = await axios.get<Thing[]>('https://localhost:5001/api/thing?userId=1',{ headers: authHeader() });
            setData(res.data);
            setFinalData(res.data);
          } catch (error) {
            setIsError(true);
            console.log(error);
          }
        };
        fetchData();
      },[]);
  
    const handleBack=()=> {setSelect(false);}
    const handleSearch=(t : string)=>{
      if(t !== '')
      {
        setSearchText(t);
        var seged= data.filter((item)=>item.name.toLowerCase().includes(searchtext.toLowerCase()));
        setFinalData(seged);
        console.log(t);
      }
      else {
        setSearchText(t);
        setFinalData(data);
      }
    }
    const handleCreate=(b : boolean) => {
      setCreate(b);
    }
  
    if(create === false)
    {
      return (
        <div>
          {isError && <div>Something went wrong ...</div>}
          {isSelected ? ( 
            <></>
          ) : (
            <Container>
              <SearchBox ClickHandler={handleSearch}/>
              <Row>
              {
              finaldata.map(item => (
                  <Col  xs={12} md={12}>
                    <br/>
                   <Card className="shadow bg-dark">
                    <Row> 
                      <Col md={2}>
                   <Image id={item.id} small={true}/>
                   </Col>
                   <Col>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Body>{item.description} 
                      
                      </Card.Body>
                      </Col>
                     </Row>  
                     <Card.Footer>
                          <Card.Link href="/modifything">Modify</Card.Link>
                          <Card.Link href="/deletething">Delete</Card.Link>
                     </Card.Footer>
                   </Card>
                  </Col>
              ))}
               </Row>
               <br/>
               <Button  onClick={() => handleCreate(true)}>Create new thing </Button>
            </Container>  
          )}
        </div>
      ); 
    }
    
    else
    {
      return(
        <div>
        <ThingCreate ClickHandler={handleCreate}/>
        </div>
      );
    }
    
  }
  