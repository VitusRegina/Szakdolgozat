import React from "react";
import { useState } from 'react';
import Auctions from "./AuctionsAll";


interface IProps{
  active: boolean
}

export default function AuctionList(props : IProps){
  
  
  const [selectedata, setData] = useState(props.active);
 

  if(selectedata === true)
    return(
     <div className="full-height">
       <Auctions category={''}/>
     </div>
    )
   else 
   return(
    <div className="full-height">
      <Auctions category={'1'}/>
    </div>
   )
}


