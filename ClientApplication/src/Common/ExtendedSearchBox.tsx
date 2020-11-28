import React from "react";
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';



interface IProps {
  SearchHandler: (t: string) => void,
  FilterHandler: (mode: number) => void,
  OrderHandler: (mode: number) => void,
  CategoryHandler: (cat: number) => void
}

export default function SearchBox2(props : IProps){
    const [searchtext,setSearchText]=useState('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>) =>{
      setSearchText(e.currentTarget.value);
    }
    const handleFind=()=>{props.SearchHandler(searchtext);}
    const handleBack=()=>{props.SearchHandler('');}

    

  return(
    <div>
      <br />
         <Row>
         
           
           <Col xs={2}>
           <DropdownButton  id="1" title="Filter">
                       <Dropdown.Item onClick={()=>props.FilterHandler(0)}>All</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.FilterHandler(1)}>Active</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.FilterHandler(2)}>Upcoming(1 week)</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.FilterHandler(3)}>Upcoming(1 month)</Dropdown.Item>
                  </DropdownButton>

                  
          </Col>  
          <Col xs={2}>
          <DropdownButton id="2" title="Order by">
                       <Dropdown.Item onClick={()=>props.OrderHandler(0)}>None</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.OrderHandler(1)}>Start date ascending</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.OrderHandler(2)}>Start date descending</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.OrderHandler(3)}>Price ascending</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.OrderHandler(4)}>Price descending</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={2}>
          <DropdownButton id="3" title="Category">
                       <Dropdown.Item onClick={()=>props.CategoryHandler(-1)}>All</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.CategoryHandler(0)}>Home</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.CategoryHandler(1)}>Car</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.CategoryHandler(2)}>Art</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.CategoryHandler(3)}>Sports</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.CategoryHandler(4)}>Technology</Dropdown.Item>
                       <Dropdown.Item onClick={()=>props.CategoryHandler(5)}>Antique</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={2}>
          </Col>
          
          <Col xs={4}>
            <label>
             <input className="form-control" type="text" value={searchtext} onChange={handleChange} />
             </label>
             <Button  onClick={handleFind}>Find</Button>
             <Button  onClick={handleBack}>Back</Button>
            </Col>
        </Row>
     </div>   
    
  )
}