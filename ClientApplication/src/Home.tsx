import React from "react";
import { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ActiveAuctionList from "./Auctions/AuctionsActive";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function Home() {
  var element;
  let def : number[] =[];
  
  const [selectedata, setData] = useState(def);
  const [requireselected, setRequire] = useState(false);
  const [onlyOneAuction, setOnlyOne] = useState(false);
  const SelectedHandler1 = (prop : number[]) => {setData(prop);}
  const SelectedHandler2= (prop:boolean) => {setRequire(prop);}
  const SelectedHandler3= (prop:boolean) => {setOnlyOne(prop);}

  
    return ( 
      <div>
        {(
          (onlyOneAuction === false) ?
           (
             <div>
            <Jumbotron className="text-center">
               <div className="masthead-heading text-uppercase text-center">Welcome!</div>
                   <Link to="/auctions" className="btn btn-primary btn-xl text-uppercase js-scroll-trigger text-center">View all auctions</Link>
            </Jumbotron>    
             </div>
           ) : 
           (<></>)
        )}  
        <Container className="big-container">
         {onlyOneAuction === false && <div className="section-heading text-uppercase text-center">Active auctions</div>}
            <ActiveAuctionList ClickHandler1={SelectedHandler1} ClickHandler2={SelectedHandler2} b={requireselected} list={selectedata} 
             BackHandler={SelectedHandler3}/>   
        </Container>
      </div> 
    );
   
  }