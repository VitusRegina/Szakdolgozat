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
import authHeader from "../Services/TokenService";
import  userId  from '../Services/UserService';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [password3, setPassword3] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const  { setAuthTokens }  = useAuth();
    const [beforeverification, setBeforeVerification] = useState(true);
    const [beforelogin, setBeforeLogin] = useState(true);
    const [beforereset, setBeforeReset] = useState(true);



    function sendVerification(){
        axios.post("https://localhost:5001/api/users/forgotpassword", {
            "email": email
          }).then(result => {
               setBeforeVerification(false);
               setIsError(false);
            }).catch(e => {
              setIsError(true);  
              setError(e.response.data.message); 
            });
    }
    
    function login(){
        axios.post("https://localhost:5001/api/users/authenticate", {
            "email": email,
            "password": password
          }).then(result => {
               setAuthTokens(result.data);
                setBeforeLogin(false);
                setIsError(false);
            }).catch(e => {
              setIsError(true);  
              setError(e.response.data.message); 
            });
    }

    function resetPassword(){
      axios.put("https://localhost:5001/api/users/"+userId().id, {
        "email": email,
        "password": password2
      },{ headers: authHeader() }).then(result => {
           setBeforeReset(false);
           setIsError(false);
        }).catch(e => {
          setIsError(true);  
          setError(e.response.data.message); 
        });
    }
    
    if(beforeverification)
      return (
        <Row>
               <Col xs={4}>
               </Col>
               <Col xs={4}>
                    <br/>
                    <Card className="shadow">   
                        
                        <Form validated={true}>
                            <Form.Text>Please enter your email address. We will send a verification code for you in an email</Form.Text>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                 type="email"
                                  value={email}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setEmail(e.currentTarget.value);
                                 }}
                                 placeholder="example@email.com"
                                 />
                            </Form.Group>
                            <br/>
                            <Button onClick={sendVerification}>Send code</Button>
                            {isError && 
                                    <div>
                                      <Form.Text className="text-danger">{error}</Form.Text>
                                    </div>
                            }
                        </Form>
                        <br/>
                    </Card>
                </Col>
                <Col xs={4}>
                </Col>
          </Row>   
      );
      if(beforelogin)
      return(
            <Row>
               <Col xs={4}>
               </Col>
               <Col xs={4}>
                    <br/>
                    <Card className="shadow">   
                        <Form validated={true}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                 type="email"
                                  value={email}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setEmail(e.currentTarget.value);
                                 }}
                                 placeholder={email}
                                 />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Code from email: </Form.Label>
                                 <Form.Control
                                   type="password"
                                  value={password}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setPassword(e.currentTarget.value);
                                   }}
                                  placeholder="code"
                                   />
                            </Form.Group>

                            {isError && 
                                    <div>
                                      <Form.Text className="text-danger">{error}</Form.Text>
                                    </div>
                            }
                            <br/>
                            <Button onClick={login}>Send</Button>
                        </Form>
                        <br/>
                    </Card>
                </Col>
                <Col xs={4}>
                </Col>
          </Row>   
      )
      if(beforereset)
      return(
            <Row>
               <Col xs={4}>
               </Col>
               <Col xs={4}>
                    <br/>
                    <Card className="shadow">   
                        <Form validated={true}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                 type="email"
                                  value={email}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setEmail(e.currentTarget.value);
                                 }}
                                 placeholder={email}
                                 />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password: </Form.Label>
                                 <Form.Control
                                   type="password"
                                   value={password2}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setPassword2(e.currentTarget.value);
                                   }}
                                  placeholder="password"
                                   />
                            </Form.Group>
                            <Form.Group>
                                  <Form.Label>Password again:</Form.Label>
                                  <Form.Control
                                  type="password"
                                  value={password3}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setPassword3(e.currentTarget.value);
                                }}
                                 placeholder="password again"
                                />
                              </Form.Group>
                            {isError && 
                                    <div>
                                      <Form.Text className="text-danger">{error}</Form.Text>
                                    </div>
                            }
                            <br/>
                            <Button onClick={resetPassword}>Reset password</Button>
                        </Form>
                        <br/>
                    </Card>
                </Col>
                <Col xs={4}>
                </Col>
          </Row>   
      )
      else
      return(
        <Row>
        <Col xs={4}>
        </Col>
        <Col xs={4}>
             <br/>
             <h1>Password reset success!</h1>
            <br/>
         </Col>
         <Col xs={4}>
         </Col>
   </Row>   
      )
    }

