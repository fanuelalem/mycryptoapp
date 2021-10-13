import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { email, length, required } from 'redux-form-validators';
// import { GoogleLogin } from 'react-google-login-component';
// import { FacebookLogin } from 'react-facebook-login-component';
import { compose } from 'redux';
import { createAuth } from '../../actions/auth';
import { Link } from 'react-router-dom';
import {
  AUTH_USER,
  // AUTH_USER_ERROR
} from '../../actions/types';
import axios from 'axios';
import './../../index.css';
import { connect } from 'react-redux';

 
class Signup extends Component {
  componentDidMount = () => {};
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userInfo: '',
    googleAuth: '',
  };

  renderEmail = ({ input, meta }) => {
    return (
      <Form.Input
        {...input}
        error={meta.touched && meta.error}
        fluid
        autoComplete="off"
        placeholder="Email Address"
      />
    );
  };

  renderFirstName = ({ input, meta }) => {
    return (
      <Form.Input
        {...input}
        error={meta.touched && meta.error}
        fluid
        autoComplete="off"
        placeholder="First Name"
      />
    );
  };
  renderLastName = ({ input, meta }) => {
    return (
      <Form.Input
        style={{ margin: '0 0 1em' }}
        {...input}
        error={meta.touched && meta.error}
        fluid
        autoComplete="off"
        placeholder="Last Name"
      />
    );
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

  responseGoogle = async (googleUser, dispatch) => {
    var id_token = googleUser.getAuthResponse().id_token;
    localStorage.setItem('token', id_token);
    this.props.createAuth(id_token);
    this.props.history.push('/topinvestments');
  };

  onSubmit = async (formValues, dispatch) => {
    axios.post('/api/auth/register', formValues).then(res => {
      localStorage.setItem('token', res.data.payload.token);
      console.log(res, 'onsubmit response');
      dispatch({ type: AUTH_USER, payload: res.data.payload.token });
      this.props.history.push('/topinvestments');
    });
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
    this.props.history.push('/topinvestments');
  };

  render() {
    const { handleSubmit, invalid, submitting, submitFailed } = this.props;

    return (
      <div className="container">
        <h2 style={{ textAlign: 'center', margin: '35px 0 0 0' }}>Register </h2>
        <div className="signup-container">
          <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="first_name"
              component={this.renderFirstName}
              validate={[required({ msg: 'first name is required' })]}
            />
            <Field
              name="last_name"
              component={this.renderLastName}
              validate={[required({ msg: 'last name is required' })]}
            />
            <Field
              name="username"
              component={this.renderUserName}
              validate={[required({ msg: 'username is required' })]}
            />

            <Field
              name="email"
              component={this.renderEmail}
              validate={[
                required({ msg: 'Email is required' }),
                email({ msg: 'You must provide a valid email address' }),
              ]}
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
              content="Sign Up"
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
              have an account already?{' '}
              <Link to="signin">
                {' '}
                <span> Login</span>
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
            <Button href='http://localhost:3001/api/auth/facebook'
            color='google plus' > Login</Button>
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

            <Button  href='http://localhost:3001/api/auth/facebook'
            color='facebook' > Login</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  reduxForm({ form: 'signup' }),
  connect(null, { createAuth })
)(Signup);
