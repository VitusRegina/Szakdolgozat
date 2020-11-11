import React from "react";
import { useState } from 'react';
import Auctions from "./AuctionsAll";


interface IProp{
  active: boolean
}

function AuctionList(props : IProp){
  
  
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

export default AuctionList;

