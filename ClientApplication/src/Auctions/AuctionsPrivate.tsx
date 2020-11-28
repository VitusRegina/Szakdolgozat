import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from '../Common/Image';
import Button from 'react-bootstrap/Button';
import SearchBox from "../Common/SearchBox";
import SingleAuction from "./SingleAuction";
import CreateAuction from "./CreateAuction";
import { Auction } from '../Common/Interfaces';
import userId from "../Services/UserService";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

interface IProps{
  ClickHandler1: (prop : any[]) => void
  ClickHandler2: (prop:boolean) => void
  b : boolean
  list :any[]
}



export default function AuctionList(props : IProps){
  let a : Auction[] =[];
    const [data, setData] = useState(a);
    const [finaldata, setFinalData] = useState(a);
    const [isError, setIsError] = useState(false);
    const [searchtext,setSearchText]=useState('');
    const [create, setCreate]=useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        try {
          const res = await axios.get<Auction[]>('https://localhost:5001/api/auction?userId='+ userId().id,);
          setData(res.data);
          setFinalData(res.data);
        } catch (error) {
          setIsError(true);
          console.log(error);
        }
      };
      fetchData();
    },[]);

  const handleSearch=(t : string)=>{
    if(t !== '')
    {
      setSearchText(t);
      var seged= data.filter((item)=>item.thingName.toLowerCase().includes(searchtext.toLowerCase()));
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
        <Container>
            <SearchBox ClickHandler={handleSearch}/>
            <Row>
            {
            finaldata.map(item => (
                <Col  xs={12} md={6}>
                  <br/>
                 <Card className="shadow bg-dark" >
                    <Row>
                        <Col xs={4}>
                            <Image id={item.thingID} small={true}/>
                        </Col>
                        <Col>
                            <Card.Title>{item.thingName}</Card.Title>
                            {item.statusz === 1 ? (<div>Active</div>) : (<div>Upcoming</div>)}
                        </Col>
                     </Row>
                     {(
                       (item.statusz === 1) ? 
                       (
                          <Card.Footer>
                            <Card.Link href="/expandtime">Expand auction time</Card.Link>
                          </Card.Footer>
                       ) :
                       (
                        <Card.Footer>
                          <Link to={{pathname: '/expandtime', state:{id: 1}}}>Create Idea</Link>
                            <Card.Link  href="/expandtime">Modify</Card.Link>
                            <Card.Link  href="/expandtime">Delete</Card.Link>
                        </Card.Footer>
                       )
                     )}
                     
                 </Card>
              </Col>
            ))}
             </Row>
             <Button onClick={() => handleCreate(true)}>Create new auction </Button>
          </Container>  
      
    </div>
  ); 
}
else
{
  return(
    <div>
    <CreateAuction />
    </div>
  )
}
  
}