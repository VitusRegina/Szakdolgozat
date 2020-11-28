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
import AccountPic from '../Outlook/Images/greyuser.png';

export default function Signup() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [email,setEmail]=useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setSecondName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin() {
        axios.post("https://localhost:5001/api/users/register", {
                "email": userName,
                "firstname": firstName,
                "lastname": lastName,
                "username": userName,
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
            <Col xs={3}>
            </Col>
            <Col xs={6}>
                  <br/>
                  <Card className="shadow">   
                        <Card.Img src={AccountPic}/>
                        <Form validated={true}>
                          <Row>
                            <Col>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                 type="email"
                                 value={email}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setEmail(e.currentTarget.value);
                                  }}
                                placeholder="Email"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>First name:</Form.Label>
                                <Form.Control
                                  type="firstname"
                                  value={firstName}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setFirstName(e.currentTarget.value);
                                  }}
                                placeholder="First Name"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last name:</Form.Label>
                                <Form.Control
                                type="lastname"
                                value={lastName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setSecondName(e.currentTarget.value);
                                }}
                                placeholder="Last name"
                                />
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                type="username"
                                value={userName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               setUserName(e.currentTarget.value);
                                }}
                                placeholder="Username"
                                />
                              </Form.Group>
                              <Form.Group>
                                  <Form.Label>Passord:</Form.Label>
                                  <Form.Control
                                  type="password"
                                  value={password}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setPassword(e.currentTarget.value);
                                }}
                                placeholder="password"
                                />
                              </Form.Group>
                              <Form.Group>
                                  <Form.Label>Password again:</Form.Label>
                                  <Form.Control
                                  type="password"
                                  value={password2}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setPassword2(e.currentTarget.value);
                                }}
                                 placeholder="password again"
                                />
                              </Form.Group>
                              </Col>
                              </Row>
                              <Button>Sign Up</Button>
                          </Form>
                          { isError && <Form.Text className="text-danger">{error}</Form.Text>}

                          <Link to="/login">Already have an account?</Link>
                          <br/>
                   </Card>
              <br/>
            </Col>
            <Col xs={3}>
            </Col>
      </Row> 
  );
}

