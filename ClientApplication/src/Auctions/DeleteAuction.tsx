import React from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface IProps {
  id : number;
}

export default function Delete(props : IProps) {

  const i:number=props.id;
    const handleSubmit= async ()=> {
      
       await axios.delete('https://localhost:5001/api/auction/'+i, );
         console.log("deleted"); 
         window.location.reload();
        };
  
  return (
    <Container className="text-center bg-transparent">
          <br/>
          Do you really want to delete this auction?
          <div><Button  onClick={handleSubmit}>Delete</Button>
          <Button href="/privateauctions">Back</Button></div>
          <br/>
        </Container>
  );
}