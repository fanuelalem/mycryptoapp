import React, { Component } from 'react';
import { Menu, Input, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import imagePlaceholder from './../Images/imageplaceholder.jpg';

export default class NavBar extends Component {
  state = { activeItem: 'imageupload' };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu secondary>
          <Menu.Menu position="right">
            {this.props.authenticated ? null : (
              <Menu.Item
                as={Link}
                to="/"
                name="Signup"
                active={activeItem === 'Signup'}
                onClick={this.handleItemClick}
              />
            )}

            {this.props.authenticated ? null : (
              <Menu.Item
                as={Link}
                to="/signin"
                name="signin"
                active={activeItem === 'Signin'}
                onClick={this.handleItemClick}
              />
            )}

            {this.props.authenticated ? (
              <Menu.Item>
                <Input
                  value={this.props.search}
                  onChange={this.props.onsearch}
                  icon={
                    <Icon
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        margin: '4px 0 0 0',
                      }}
                      circular
                      size="small"
                      className="searchlink"
                      name="search"
                      link
                      onClick={this.props.buttonClick}
                    />
                  }
                  placeholder="EX: BTC,ETH..."
                />
              </Menu.Item>
            ) : null}

            {this.props.authenticated ? (
              <Menu.Item>
                <Image
                  style={{ width: '45px', height: '45px' }}
                  avatar
                  src={imagePlaceholder}
                />
              </Menu.Item>
            ) : null}

            {this.props.authenticated ? (
              <Menu.Item
                as={Link}
                to="/signout"
                name="Log out"
                active={activeItem === 'Log out'}
                onClick={this.handleItemClick}
              />
            ) : null}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
