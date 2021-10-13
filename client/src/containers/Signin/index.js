import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { length, required } from 'redux-form-validators';
// import { GoogleLogin } from 'react-google-login-component';
// import { FacebookLogin } from 'react-facebook-login-component';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createAuth } from '../../actions/auth';
import { connect } from 'react-redux';
import {
  AUTH_USER,
  // AUTH_USER_ERROR
} from '../../actions/types';
import axios from 'axios';
import './../../index.css';

class Signin extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userInfo: '',
  };

  renderUserName = ({ input, meta }) => {
    return (
      <Form.Input
        style={{ margin: '0 0 1em' }}
        {...input}
        error={meta.touched && meta.error}
        fluid
        autoComplete="off"
        placeholder="Username"
      />
    );
  };
  createAuth = token => {
    return {
      type: AUTH_USER,
      payload: token,
    };
  };

  renderPassword = ({ input, meta }) => {
    return (
      <Form.Input
        {...input}
        error={meta.touched && meta.error}
        fluid
        type="password"
        placeholder="password"
        autoComplete="off"
      />
    );
  };

  responseFacebook = response => {
    let accesstoken = response.accessToken;
    localStorage.setItem('token', accesstoken);
    this.props.createAuth(accesstoken);
    console.log(accesstoken, 'facebook auth token');
    this.props.history.push('/feed');
  };

  onSubmit = async (formValues, dispatch) => {
    console.log(formValues);

    axios.post('/api/auth/authenticate', formValues).then(res => {
      let token = res.data.payload.user.token;
      localStorage.setItem('token', token);
      dispatch({ type: AUTH_USER, payload: token });
      this.props.history.push('/feed');
    });
  };

  responseGoogle = googleUser => {
    var id_token = googleUser.getAuthResponse().id_token;
    localStorage.setItem('token', id_token);
    console.log(id_token, 'gmail token');
    this.props.createAuth(id_token);
    this.props.history.push('/feed');
  };

  render() {
    const { handleSubmit, invalid, submitting, submitFailed } = this.props;

    return (
      <div className="container">
        <h2 style={{ textAlign: 'center', margin: '35px 0 0 0' }}>Login </h2>
        <div className="signup-container">
          <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="username"
              component={this.renderUserName}
              validate={[required({ msg: 'username is required' })]}
            />

            <Field
              name="password"
              component={this.renderPassword}
              validate={[
                required({ msg: 'You must provide a Password' }),
                length({
                  min: 6,
                  msg: 'Your password must be at least 6 characters long',
                }),
              ]}
            />

            <Button
              content="Sign in"
              color="green"
              fluid
              size="large"
              type="submit"
              disabled={invalid || submitting || submitFailed}
            />
          </Form>

          <div style={{ marginTop: '10px' }}>
            <p>
              {' '}
              Create an account{' '}
              <Link to="/">
                {' '}
                <span> Here</span>
              </Link>{' '}
            </p>
          </div>

          <div
            className="email-signup"
            style={{ textAlign: 'left', margin: '50px 0 0 0' }}
          >
            {/* <GoogleLogin
              socialId="1030822244206-us1dgccu3vq35nclb5q3t5f2vnn9va5a.apps.googleusercontent.com"
              className="google-login"
              scope="profile"
              fetchBasicProfile={true}
              responseHandler={this.responseGoogle}
              buttonText="Login With Google"
            /> */}
            <Button
              href="http://localhost:3001/api/auth/facebook"
              color="google plus"
            >
              {' '}
              Login
            </Button>
          </div>

          <div
            className="email-signup"
            style={{ textAlign: 'left', margin: '10px 0 0 0' }}
          >
            {/* <FacebookLogin
              socialId="392384749108219"
              responseHandler={this.responseFacebook}
              version="v2.5"
              className="facebook-login"
              buttonText="Login With Facebook"
            /> */}
            <a href="http://localhost:3001/api/auth/facebook">
              <Button onClick={()=>{
                
                axios.get('/api/auth/successfull').then(res => {
                  console.log(res, 'res');
                  this.props.createAuth(res.token);

                });
              }} color="facebook"> Login</Button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  reduxForm({ form: 'signin' }),
  connect(null, { createAuth })
)(Signin);
