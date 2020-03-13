import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, message } from "antd";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import { FormHolder, Title, SubTitle, Description, Column, LoginComponent, FlexCenter, LoginForm } from "./style";
import Background from "./assets/background.svg";
import Header from "../../components/header";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {
  state = { width: 0 };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Auth.signIn(values.email, values.password)
          .then(user => {
            window.location.href = "/app";
          })
          .catch(err => {
            message.error("User or password is incorrect.");
          });
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <React.Fragment>
        <Header></Header>
        <LoginComponent>
          <FlexCenter>
            <Title>Create your PickMee landlord profile today and start screening applicants instantly.</Title>
          </FlexCenter>
          <FlexCenter>
            <LoginForm>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item label="Email" validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input
                      placeholder="Enter your email address"
                      style={{
                        borderRadius: "0",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        backgroundColor: "#eeeeee",
                        fontStyle: "italic",
                        fontWeight: "500",
                        textAlign: "center"
                      }}
                    />,
                  )}
                </Form.Item>
                <Form.Item label="Choose a secure password" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      style={{
                        borderRadius: "0",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        backgroundColor: "#eeeeee",
                        fontStyle: "italic",
                        fontWeight: "500",
                        textAlign: "center"
                      }}
                    />,
                  )}
                </Form.Item>
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                  {getFieldDecorator('confirmpassword', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input
                      type="password"
                      placeholder="Confirm your Password"
                      style={{
                        borderRadius: "0",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        backgroundColor: "#eeeeee",
                        fontStyle: "italic",
                        fontWeight: "500",
                        textAlign: "center"
                      }}
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}
                    style={{
                      borderRadius: "0",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      height: "40px",
                      backgroundColor: "#e0427c",
                      boxShadow: "0px 2px 4px 1px #5f5e5e94",
                      border: "none"
                    }}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </LoginForm>
          </FlexCenter>
          <FlexCenter>
            <SubTitle>Or sign-up with your social media account</SubTitle>
            <Icon type="twitter" style={{fontSize: "30px"}}/>
            <Icon type="facebook"  style={{fontSize: "30px"}}/>
          </FlexCenter>
        </LoginComponent>
        {/* <Row style={{backgroundColor: '#dddddd'}}>
          <Column
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{ textAlign: "center" }}
          >
            <div>
              <FormHolder>

                <br />
                <Form
                  onSubmit={this.handleSubmit}
                  className="login-form"
                  style={{ width: "300px", display: "inline-block" }}
                >
                  <Form.Item>
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter your email!"
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="email"
                        placeholder="Email"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("password", {
                      rules: [
                        { required: true, message: "Please enter your Password!" }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ width: "300px" }}
                      onClick={this.handleSubmit}
                    >
                      Log in
                  </Button>
                  </Form.Item>
                </Form>
              </FormHolder>
            </div>
          </Column>
          <Column
            xs={0}
            sm={0}
            md={15}
            lg={15}
            xl={15}
            style={{
              display: "none",
              backgroundColor: "#162b4d",
              backgroundImage: `url(${Background})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
              backgroundSize: "120%",
              height: "100vh"
            }}
          >
            <Description>
              <Title>Quick and effortless KYC</Title>
              <SubTitle>- Absolute, verified identity</SubTitle>
              <SubTitle>- Onboard with confidence</SubTitle>
              <SubTitle>- Compliance made easy</SubTitle>
            </Description>
          </Column>
        </Row> */}
      </React.Fragment>
    );
  }
}

const WrappedLogin = Form.create()(withRouter(Login));

export default WrappedLogin;
