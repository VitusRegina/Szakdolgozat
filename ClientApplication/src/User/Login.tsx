import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../Services/AuthService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import AccountPic from '../Images/user2.jpg';


function Login(props : any) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const  { setAuthTokens }  = useAuth();
    

    function postLogin() {
      console.log(userName);
      console.log(password);
        axios.post("https://localhost:5001/api/users/authenticate", {
          "email": userName,
          "password": password
        }).then(result => {
          if (result.status === 200) {
            setAuthTokens(result.data);
            setLoggedIn(true);
          } else {
            setIsError(true);
          }
        }).catch(e => {
          setIsError(true);
          console.log(e);
        });
      }
    
      if (isLoggedIn) {
        return <Redirect to="/" />;
      }
    
      return (
       
           <div>
             <Row>
               <Col xs={4}>
               </Col>
               <Col xs={4}>
                    <br/>
                    <Card className="shadow">   
                        <Card.Img src={AccountPic}/>
                        <Form >
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                 type="email"
                                  value={userName}
                                   onChange={(e: React.FormEvent<HTMLInputElement>) => {
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
                                   onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                   setPassword(e.currentTarget.value);
                                   }}
                                  placeholder="password"
                                   />
                             </Form.Group>
                            <Button onClick={postLogin}>Sign In</Button>
                        </Form>
                        <Link to="/signup">Don't have an account?</Link>
                        { isError &&<Form.Text>The username or password provided were incorrect!</Form.Text> }
                         <br/>
                      </Card>
                </Col>
              </Row>
            </div>
      );
    }

export default Login;