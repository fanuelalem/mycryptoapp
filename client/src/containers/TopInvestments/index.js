import React, { Component } from 'react';
import { Container, Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createAuth } from '../../actions/auth';
import { connect } from 'react-redux';

class TopInvestments extends Component {
   
  componentDidMount = () => {
    
    axios.get('/api/auth/successfull')
    .then((res)=>{
      this.props.createAuth(res.data.token)
        
    })
  }
  state = {
    myArray: [],
  };
  render() {
    return (
      <div>
        <h2 style={{textAlign:"center"}}> my top 3 Investments (optional) </h2>
      <div style={{ display: 'flex', width: '50%', margin: '40px auto 0px auto' }}>
        <div style={{ width: '100%',marginRight:"10px" }}>
          <div style={{paddingBottom:"35px",paddingTop:'25px',borderRadius:"5px",height:'200px'}}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{width:"100%",textAlign:"center"}}>
              
            
              <h2 style={{ marginTop: '10px',margin:'0px' }}>
                {' '}
                {this.props.cryptoName}{' '}
              </h2>
            </div>
            <div style={{width:"100%",textAlign:"center"}}>
              <img
                style={{ width: '50px', height: '50px' }}
                src={this.props.cryptoLogo}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <Button color='blue' onClick={()=>{
              this.setState({ myArray: [...this.state.myArray, this.props.cryptoName] })
            }}> Select </Button>
          </div>
        </div>
        </div>
        <div style={{ width: '100%',paddingBottom:"35px",paddingTop:'25px',marginLeft:"10px" ,borderRadius:"5px",height:'200px'}}>
          <div style={{textAlign:"center"}}>
            
            {this.state.myArray.length? this.state.myArray.map((item,index)=>{
              return (
                <p key={index} style={{color:'black',fontweight:"500",fontSize:'25px'}}> {item} </p>
              )
            }):null}
            </div>
        </div>
      
      </div>
      </div>
    );
  }
}

export default connect(null, { createAuth })(TopInvestments);

{
  /* <div>

<Container>
  <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
    Top 3 Invesments (optional)
  </h2>
  {console.log(
    this.props.cryptoName,
    this.props.cryptoPrice,
    this.props.cryptoLogo,
    ' hello world'
  )}
  <div
    style={{
      width: '20%',
      margin: 'auto',
      backgroundColor: 'lightgrey',
      padding: '20px',
      marginTop: '35px',
    }}
  >
    <div
      style={{
        display: 'flex',
      }}
    >
      <div style={{ width: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>{this.props.cryptoName}</h2>
      </div>
      <div style={{ textAlign: 'center', width: '100%' }}>
        {this.props.cryptoLogo == '' ? null : (
          <img
            style={{ width: '40px', height: '40px' }}
            src={this.props.cryptoLogo}
          />
        )}
      </div>
    </div>
    <div style={{ textAlign: 'center', marginTop: '35px' }}>
      <Button
        onClick={() => {
          this.setState({
            myArray: [...this.state.myArray, this.props.cryptoName],
          });
        }}
        color="green"
      >
        {' '}
        Select Coin
      </Button>
    </div>
  </div>
</Container>

<div style={{ textAlign: 'center', marginTop: '25px' }}>
  <Button
    style={{ width: '120px' }}
    color="blue"
    as={Link}
    to="imageupload"
  >
    {' '}
    prev
  </Button>
  <Button style={{ width: '120px' }} color="blue" as={Link} to="feed">
    {' '}
    next
  </Button>



</div>
<div>
  {console.log(this.state.myArray, 'my array')}
  <h2 style={{ textAlign: 'center', marginTop: '35px' }}>
    {' '}
    my coins...{' '}
  </h2>
  <hr style={{ marginRight: '200px', marginLeft: '200px' }} />

  {this.state.myArray.length
    ? this.state.myArray.map(item => {
        return (
          <div style={{textAlign:"center"}}>
          <ul>
            <li>{item}</li>
          </ul>
          </div>
        );
      })
    : null}


</div>
</div> */
}
