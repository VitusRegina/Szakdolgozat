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

interface IBasicProp{
  ClickHandler1: (prop : any[]) => void
  ClickHandler2: (prop:boolean) => void
  b : boolean
  list :any[]
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
    const [create, setCreate]=useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        try {
          const res = await axios.get<Auction[]>('https://localhost:5001/api/auction?userId=1',);
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
                            <Card.Link href="/modifyauction">Modify</Card.Link>
                            <Card.Link href="/deleteauction">Delete</Card.Link>
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
    <CreateAuction ClickHandler={handleCreate}/>
    </div>
  )
}
  
}