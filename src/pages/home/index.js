import React, { Component } from "react";
import { HomeComponent, FlexCenter, NavButton, LoginDiv } from "./style";
import Header from "../../components/header";

class Home extends Component {

  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <HomeComponent>
          <FlexCenter>
            <h1>Welcome!</h1>
            <h1>Please choose one of the following</h1>
          </FlexCenter>
          <FlexCenter>
            <NavButton>Landlord</NavButton>
            <NavButton>Tenant</NavButton>
          </FlexCenter>
          <FlexCenter>
            <LoginDiv>
              <div>Already have a PickMee account?</div>
              <div><a href="#">Sign in</a> now</div>
            </LoginDiv>
          </FlexCenter>
        </HomeComponent>
      </React.Fragment>
    );
  }
}

export default Home;
