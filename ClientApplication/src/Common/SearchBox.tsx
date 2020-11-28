import React from "react";
import { useState } from 'react';
import Button from "react-bootstrap/Button";



interface IProps {
    ClickHandler: (t: string) => void
  }

export default function SearchBox(props : IProps){
    const [searchtext,setSearchText]=useState('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>) =>{
      setSearchText(e.currentTarget.value);
    }
    const handleSubmit1=()=>{props.ClickHandler(searchtext);}
    const handleSubmit2=()=>{props.ClickHandler('');}

  return(
    
           <div className="darkest">
             <br/>
             <label>
             <input className="form-control" type="text" value={searchtext} onChange={handleChange} />
             </label>
             <Button  onClick={handleSubmit1}>Find</Button>
             <Button  onClick={handleSubmit2}>Back</Button>
             
         </div>
    
  )
}