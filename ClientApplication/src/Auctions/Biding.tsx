import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useAuth } from "../Services/AuthService";
import Moment from 'react-moment';
import { Bid } from '../Common/Interfaces';
import authHeader from "../Services/TokenService";
import  userId  from '../Services/UserService';
import { stringFromDate } from '../Services/DateService';
import { connection } from '../Services/SignalRHubService';
import Form from 'react-bootstrap/Form';
import { group } from "console";

interface IProps {
    id : number;
    maxsum : number;
  }


  export default function SendBid(props:IProps){
    const [sum, setSum] = useState(props.maxsum);
    const [aucid, setId] = useState(props.id);
    const { authTokens } = useAuth();
    const userid = userId().id;
    const username = userId().username;
    const now : Date = new Date();
    var a: Bid[] = [];
    const [data, setData] = useState(a);
    const i:number =props.id;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [hubConnection, setHubConnection] = useState<HubConnection>(connection);


    useEffect(() => {
      const fetchData = async () => {
        
        setIsLoading(true);
          try {
                const res = await axios.get<Bid[]>('https://localhost:5001/api/bid/'+i, { headers: authHeader() });
                setData(res.data); 
              }
           catch (error) {  
                console.log(error);
              }
          setIsLoading(false);
      };
      fetchData();
    },[]);

    useEffect(() => {
      const startConnection = async () => { 
          try {
                 await hubConnection.start()
                 console.log('Connection successful!')
               }
          catch (err) {
                 console.log(err);
              }
          hubConnection.on('ReceiveSum', (id, sum, name, date) => {
                 setSum(sum);
                 if(id === i){   
                 var node = document.createElement("LI");
                 node.innerHTML="<b>" +sum+ " Ft</b> by "+name+" at "+ stringFromDate(date);
                 document.getElementById("sumlist")?.appendChild(node);
                 console.log("receive");
             }
          });
      };
      startConnection();
      return () => {
        hubConnection.off('ReceiveSum');
        hubConnection.stop();
      }
    },[]);

    const handleSubmit= async ()=> {
     if(sum>props.maxsum){
      await axios.post('https://localhost:5001/api/bid', {
          "sum": sum,
          "auctionid": aucid,
          "personid": userid,
          "personName":username,
          "time": now
        },{ headers: authHeader() });
        setIsError(false);
      }
      else
      {
          setIsError(true);
          setError("Sum must be higher than actual price!");
      }
    }
    
    if(authTokens)
      return (
          <Card>  
              <br/>
                <Form>
                    <Form.Group className="text-center">
                      <Form.Label className="input-group-prepend text-center">
                        <Form.Control className="form-control" type="number" value={sum} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ setSum(+e.currentTarget.value);}} />
                          <div className="input-group-text">Ft</div>
                      </Form.Label>
                      {isError && <Form.Text className="text-danger">{error}</Form.Text>}
                      <Button className="btn" onClick={handleSubmit}>Send bid</Button>
                      
                    </Form.Group>
                 </Form>
                 <br/>
                 <ul id="sumlist">
                        {
                           data.map(item => (
                              <li>
                                  <b>{item.sum} Ft</b> by {item.personName} at {stringFromDate(item.time)} 
                              </li>
                        ))}
                  </ul>
           </Card>
       
      );
      else
      {
        return(
          <div className="text-center">You should <a href="/login">sign in</a> before you can bid</div>
        )
      }
      
    }