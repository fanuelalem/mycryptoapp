import React, { Component } from 'react';
import { Container, Button, Input } from 'semantic-ui-react';
import './../../index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ImageUpload extends Component {
   
  state = {
    filesrc: '',
  };

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
  };

  render() {
    return (
      <div>
        <Container></Container>
        <Container>
          <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
            upload an image...
          </h2>
          <div className="avatar-container">
            <Input type="file" onChange={this.fileSelectedHandler} />
          </div>

          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <Button
              style={{ width: '120px' }}
              color="blue"
              as={Link}
              to="topinvestments"
            >
              {' '}
              next
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}
