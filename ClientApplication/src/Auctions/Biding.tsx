import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useAuth } from "../Services/AuthService";
import MoneyImage from '../Images/money.png';
import TimeImage from '../Images/time.png';
import Moment from 'react-moment';
import { Bid } from '../Common/Interfaces';
import authHeader from "../Services/TokenService";

interface IProp{
  id : number;
  sum : number;
  startTime :string;
  endTime : string;
}

interface IFunctionProp2 {
  id : number;
  sum : number;
  ClickHandler: (i:number, s : number) => void
}


function Bids(props:IFunctionProp2){
    const [sum, setSum] = useState(props.sum);
    const [id, setId] = useState(props.id);
    const { authTokens } = useAuth();
    
    function handleChange(e: React.FormEvent<HTMLInputElement>) {
      setSum(+e.currentTarget.value);
    }
    
    const handleSubmit= async ()=> {
     if(sum>props.sum){
      await axios.post('https://localhost:5001/api/bid', {
          "sum": sum,
          "auctionid": id,
          "userid": 1,
          "time": Date.now
        },{ headers: authHeader() })
        props.ClickHandler(id,sum);
      }
    }
    
    if(authTokens)
      return (
        
            <form>
                <div className="text-center">
                <label className="input-group-prepend text-center">
                 <input className="form-control" type="number" value={sum} onChange={handleChange} />
                 <div className="input-group-text">Ft</div>
                 </label>
                 <Button className="btn" onClick={handleSubmit}>Send bid</Button>
                 
            </div>
        </form>
       
      );
      else
      {
        return(
          <div className="text-center">You should <a href="/login">sign in</a> before you can bid</div>
        )
      }
      
    }
    
    export default function Biding(props:IProp){
      var a: Bid[] = [];
      const [data, setData] = useState(a);
      const i:number =props.id;
      const [maxsum, setSum] = useState(props.sum);
      const [isLoading, setIsLoading] = useState(false);
      const [isError, setIsError] = useState(false);
      var szamlalo:number=0;
      

      const [hubConnection, setHubConnection] = useState<HubConnection>(new HubConnectionBuilder()
      .withUrl("https://localhost:5001/chat")
      .build());

      const[endTime,setEnd]=useState(new Date(props.endTime));
      const[startTime,setStart]=useState(new Date(props.startTime));
     
    
       useEffect(() => {
        const fetchData = async () => {
          setIsError(false);
          setIsLoading(true);
          try {
            const res = await axios.get<Bid[]>('https://localhost:5001/api/bid/'+i, { headers: authHeader() });
            setData(res.data);
          } catch (error) {
            
          }
          setIsLoading(false);
        };
        fetchData();
      },[]);
    
     useEffect(() => {
        const createHubConnection = async () => {
            try {
                await hubConnection.start()
                console.log('Connection successful!')
            }
            catch (err) {
                
            }
          }
        createHubConnection();
        return function cleanup() {
         hubConnection.stop();
        };
    },[]);
    
      hubConnection.on('ReceiveSum', (id, s) => {
        setSum(s);
        if(id === i){   
        //var node = document.createElement("LI");
       // var textnode = document.createTextNode(s);        
       // node.appendChild(textnode);
       // document.getElementById("sumlist")?.appendChild(node);
       console.log("receive");
        }
      });
    
      const sendSum = (i:number, s: number) => { 
        console.log("sendSum meghivva");
        hubConnection.invoke('SendSum',i, s)
        .catch(err => console.error(err));  
    };
    
      return(
        <div>
          {isError && <div>Something went wrong ...{i}</div>}
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
           <div>
             <br/>
              <Container className="little-container">
                <Row>
                  <Col>
                     <Card className="text-center">
                     <br/>
                        <h5>Actual price:</h5> {maxsum} Ft 
                        <br/>
                        <br/>
                      </Card>
                      <br/>
                  </Col>
                  <Col>
                      <Card className="text-center">
                      <br/>
                        <h5>Remaining time: </h5> 
                        <Moment toNow ago>{endTime}</Moment>
                        <br/>
                      </Card>
                      <br/>
                  </Col>
                </Row>
              </Container>
              <br/>
              
             <Card>
             <br/>
             <Bids id={props.id} sum={maxsum} ClickHandler={sendSum}/>
             <br/>
              <ul id="sumlist">
              {
              data.map(item => (
              <li>
                <Row>
                  <Col xs={4}>{item.sum} Ft</Col>
                  <Col xs={4}>{item.personName}</Col>
                  <Col xs={4}><Moment format="YYYY.MM.DD hh.mm"  date={item.time} /></Col>      
                 </Row>        
              </li>
              ))}
              </ul>
              </Card>
            </div>
          )}
        </div>
      )
    }