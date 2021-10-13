import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { signOut } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Signout extends Component {
  componentDidMount = () => {
    this.props.signOut();
  };
  render() {
    return (
      <Container>
        <h2 style={{ textAlign: 'center' }}>thanks for visiting</h2>
        
      </Container>
    );
  }
}

export default connect(null, { signOut })(Signout);
