import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import NavBar from './../../components/navbar';
import Signin from './../Signin';
import Signup from '../Signup';
import ImageUpload from '../ImageUpload';
import Signout from './../Signout';
import Feed from './../Feed';
import TopInvestments from '../TopInvestments';
import simpleSearch from './../cryptoapi/simpleSearch';
import axios from 'axios';

class App extends Component {
  state = {
    coinName: '',
    coinPrice: 0,
    coinLogo: '',
    search: '',
  };
   

   
  searchCoin = async query => {
    simpleSearch.search(query).then(response => {
      console.log(response.data.length);
      response.data.length
        ? this.setState({
            coinName: response.data[0].name,
            coinPrice: response.data[0].price,
            coinLogo: response.data[0].logo_url,
          })
        : this.setState({
            coinName: 'Coin unfound...',
            coinPrice: 'N/A',
            coinLogo: '',
          });
    });
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({ search: value.toUpperCase() });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchCoin(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <div>
        <Container>
          <NavBar
            onsearch={this.handleInputChange}
            buttonClick={this.handleFormSubmit}
            authenticated={this.props.authenticated}
          />
        </Container>

        <Route
          exact
          path="/topinvestments"
          render={props => (
            <TopInvestments
              cryptoName={this.state.coinName}
              cryptoPrice={this.state.coinPrice}
              cryptoLogo={this.state.coinLogo}
            />
          )}
        />
        <Route exact path="/" component={Signup} />
        <Route exact path="/imageupload" component={ImageUpload} />
        <Route exact path="/signout" component={Signout} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/feed" component={Feed} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}
export default connect(mapStateToProps)(App);
