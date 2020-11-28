import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../Services/AuthService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import AccountPic from '../Outlook/Images/greyuser.png';


export default function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const  { setAuthTokens }  = useAuth();
    

    function postLogin() {
        axios.post("https://localhost:5001/api/users/authenticate", {
          "email": userName,
          "password": password
        }).then(result => {
                      setAuthTokens(result.data);
                      setLoggedIn(true);
          }).catch(e => {
                  setIsError(true);  
                  setError(e.response.data.message);    
          });
      }
    
      if (isLoggedIn) {
        return <Redirect to="/" />;
      }
    
      return (
        <Row>
               <Col xs={4}>
               </Col>
               <Col xs={4}>
                    <br/>
                    <Card className="shadow">   
                        <Card.Img src={AccountPic}/>
                        <Form validated={true}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                 type="email"
                                  value={userName}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setUserName(e.currentTarget.value);
                                 }}
                                 placeholder="example@email.com"
                                 />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password: </Form.Label>
                                 <Form.Control
                                   type="password"
                                  value={password}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setPassword(e.currentTarget.value);
                                   }}
                                  placeholder="password"
                                   />
                            </Form.Group>
                            {isError && 
                                    <div>
                                      <Form.Text className="text-danger">{error}</Form.Text>
                                      <Link to="/passwordrecover">Forgot your password?</Link>
                                    </div>
                            }
                            <br/>
                            <Button onClick={postLogin}>Sign In</Button>
                        </Form>
                        <Link to="/signup">Don't have an account?</Link>
                        <br/>
                    </Card>
                </Col>
                <Col xs={4}>
                </Col>
          </Row>   
      );
    }

