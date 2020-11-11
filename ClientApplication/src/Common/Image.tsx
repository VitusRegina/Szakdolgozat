import React, { Component } from 'react';
import axios from 'axios';

interface IProp{
  id:number;
  small:boolean;
}

class Image extends Component<IProp> {
  state = { source: " "};

  componentDidMount() {
    axios
      .get(
        'https://localhost:5001/api/image/'+this.props.id,
        { responseType: 'arraybuffer' },
      )
      .then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        this.setState({ source: "data:;base64," + base64 });
      });
  }

  render() {
    if(this.props.small){
      return <img src={this.state.source} width="150" height="150"/>;
    }
    else
    {
      return <img src={this.state.source} width="300" height="300"/>;
    }
    
  }
}

export default Image;