import React, { Component } from "react";
import { Menu, Drawer, Icon } from "antd";
import { withRouter, Link } from 'react-router-dom';
import { Logo, DesktopMenu, MobileMenu } from './style';

const { SubMenu } = Menu;

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '',
      visible: false
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    this.props.history.push(e.key)
  }

  handleMobile = (e) => {
    this.setState({
      current: e.key,
    });
  }
  render() {

    return (
      <div className="Header">

        <DesktopMenu>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px", backgroundColor: "#dddddd", borderBottom: "none" }}
          >
            <Menu.Item key="/">
              <Icon type="mail" />
              Logo
            </Menu.Item>
            <Menu.Item key="/login" style={{ float: "right", fontWeight: "500", color: "#000000" }}>
              Sign In
            </Menu.Item>
          </Menu>
        </DesktopMenu>

        <MobileMenu>
          <Menu
            onClick={() => this.setState({ visible: true })}
            theme="light"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item style={{ float: "right" }} key="mobile"><Icon type="menu" /></Menu.Item>
          </Menu>
        </MobileMenu>

        <Drawer
          placement="right"
          closable={false}
          onClose={() => this.setState({ visible: false })}
          visible={this.state.visible}
        >
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >

          </Menu>
        </Drawer>

      </div>
    );
  }
}

export default withRouter(Header);
