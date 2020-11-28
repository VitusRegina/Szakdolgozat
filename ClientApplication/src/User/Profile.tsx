import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../Services/AuthService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AccountPic from '../Images/account.png';
import authHeader from "../Services/TokenService";
import  userId  from '../Services/UserService';


const a : any ={};

export default function Profile() {
    const [data, setData] = useState(a);
    const [email,setEmail]=useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setSecondName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [address , setAddress]=useState('');
    const [phone, setPhone] = useState("");


    useEffect(() => {
      const fetchData = async () => {
        try {
            const res = await axios.get('https://localhost:5001/api/users/'+userId().id, { headers: authHeader() });
            setData(res.data);    
        } catch (error) {
            console.log(error);
        }
      };
      fetchData();
          setEmail(data.email);
          setFirstName(data.firstName);
          setSecondName(data.lastName);
          setUserName(data.username);
          setAddress(data.address);
          setPhone(data.phoneNumber);
    }, []);

    function postLogin() {
      console.log('post login invited');
        axios.put("https://localhost:5001/api/users/"+1, {
                "id": userId().id, 
                "email": userName,
                "firstname": firstName,
                "lastname": lastName,
                "username": userName,
                "address": address,
                "phoneNumber": phone
        })
        .then(()=>console.log('success'))
        .catch(e => {
        });
      }


  return (
    
    <Container>
             <Row>
               <Col xs={3}>
               </Col>
               <Col xs={6}>
                    <br/>
                    

      <Form>
      <Form.Group>
             <Form.Label>Email:</Form.Label>
              <Form.Control
               type="email"
               value={email}
              placeholder={data.email}
              disabled
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
              placeholder={data.firstName}
            
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
              placeholder={data.lastName}
            />
            </Form.Group>

            <Form.Group>
            <Form.Label>Username:</Form.Label>
        <Form.Control
              type="username"
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(e.currentTarget.value);
              }}
              placeholder={data.username}
            />
            </Form.Group>

           
            <Form.Group>
            <Form.Label>Address:</Form.Label>
        <Form.Control
              type="address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddress(e.currentTarget.value);
              }}
              placeholder={data.address}
            />
            </Form.Group>

            <Form.Group>
            <Form.Label>Phone number:</Form.Label>
        <Form.Control
              type="phone"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(e.currentTarget.value);
              }}
              placeholder={data.phoneNumber}
            />
            </Form.Group>

        <Button onClick={postLogin}>Save</Button>
       </Form>
     
     
                </Col>
              </Row>
            </Container>
    
  );
}

