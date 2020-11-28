import React from "react";
import { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import authHeader from "../Services/TokenService";
import { Thing } from "../Common/Interfaces"
import ThingList from "./Things";
import userId from "../Services/UserService";


interface IProp{
  ClickHandler: (b : boolean) => void
}
let l: File;
let s:string;

export default function Create(props: IProp) {
    const [name, setName] = useState(s);
    const [description, setDescription] = useState(s);
    const [image,setImage]=useState(l);  
    const [data, setData] = useState<Thing>();
    const [id,setId]=useState(s);
  
    function handleChange1(e: React.ChangeEvent<HTMLInputElement> | any) {
      setName(e.currentTarget.value);
      console.log(name);
    }

    function handleChange2(e: React.ChangeEvent<HTMLInputElement> | any) {
        setDescription(e.currentTarget.value);
        console.log(description)
      }

    function handleImageChange(selectorFiles: FileList | null ){
      if(selectorFiles !== null)
          setImage(selectorFiles[0]);
      };
  
    const handleSubmit= async ()=> {
        try {
          const res = await axios.post('https://localhost:5001/api/thing',{
             "name": name,
             "desccription": description,
             "userid": userId().id,
             "kategoria": 2 
           },{ headers: authHeader() });
          setData(res.data);
         } catch (error) {
            console.log(error);
         }
         
          let formData = new FormData();
          formData.append("thingID", '18');
          formData.append('file', image);
          const config = {
             headers: {
                'content-type': 'multipart/form-data',
               
           },
          };
          axios.post(
            "https://localhost:5001/api/image",formData, config).
            then(result => {console.log(result.status)});

      }
  
    const handleBack= ()=>{
      props.ClickHandler(false);
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
                <Form.Label> Name:</Form.Label>
                 <Form.Control type="text" value={name} onChange={handleChange1} />     
            </Form.Group>


            <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" value={description} onChange={handleChange2} /> 
            </Form.Group>

              <Form.Group>
                <Form.Label>
                <Form.Control type="file"
                   id="file"
                   name="file"
                   accept="image/png, image/jpeg"
                   onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleImageChange(e.currentTarget.files)} />
                </Form.Label>
              </Form.Group>

              <Form.Group>
              <div><Button  onClick={handleSubmit}>Submit</Button>
              <Button  onClick={handleBack}>Back</Button></div>
              </Form.Group>
             
        </Form>

        <br/>
        </Col>
              </Row>
            </Container>
       
      );
    
  }

