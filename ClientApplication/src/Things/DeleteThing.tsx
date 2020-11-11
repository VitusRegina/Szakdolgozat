import React from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import authHeader from "../Services/TokenService";


 interface IFunctionProp4 {
    id : number;
  }

export default function Delete(props:IFunctionProp4){
    const i:number=props.id;
    const handleSubmit= async ()=> {
      
       await axios.delete('https://localhost:5001/api/thing/'+i,{ headers: authHeader() } );
         console.log("deleted");
         
         window.location.reload();
        };
    return(
        <div className="text-center">
          <br/>
          Do you really want to delete this item?
          <div><Button  onClick={handleSubmit}>Delete</Button>
          <Button href="/things">Back</Button></div>
          <br/>
        </div>
    )
  }