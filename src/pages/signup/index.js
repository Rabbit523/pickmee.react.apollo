import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Checkbox, message } from "antd";
import { Auth } from "aws-amplify";
import { FormHolder, Column } from "./style";

class Signup extends Component {
  state = {
    confirmDirty: false,
    confirmEmail: false,
    username: null,
    verifyCode: null,
    visible: false
  };

  componentDidMount() {
    if (this.props.match.params.email) {
      this.setState({
        confirmEmail: true,
        username: this.props.match.params.email
      });
    }
    if (this.props.match.params.verifyCode) {
      this.verificationSubmit(
        this.props.match.params.verifyCode,
        this.props.match.params.email
      );
      this.setState({ verifyCode: this.props.match.params.verifyCode });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err && values.agreement !== undefined) {
        this.setState({ username: values.email });
        Auth.signUp({
          username: values.email,
          password: values.password,
          attributes: {
            email: values.email,
            given_name: values.firstName,
            family_name: values.lastName,
          },
          validationData: [] //optional
        })
          .then(data => this.setState({ confirmEmail: true }))
          .catch(err => {
            message.error(err.message);
          });
      } else {
        message.error(
          "Please fill out all fields and agree to the privacy policy."
        );
      }
    });
  };

  /**
   * If email and verifyCode is present in the url, we can confirm user signup.
   * function takes verificationCode and email.
   */
  verificationSubmit = (code, email) => {
    Auth.confirmSignUp(email, code, {
      forceAliasCreation: true
    })
      .then(data => {
        message.success("Your account has been successfully verified!");
        this.props.history.push("/login");
      })
      .catch((err) => { message.error(err.message)});
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Your passwords must match!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { confirmEmail } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Column span={24} style={{ textAlign: "center" }}>
          <div>
            {!confirmEmail ? (
              <FormHolder>
                <br />
                <Form
                  onSubmit={this.handleSubmit}
                  className="login-form"
                  style={{ width: "320px", display: "inline-block" }}
                >
                  <Form.Item>
                    {getFieldDecorator("firstName", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter your first name!"
                        }
                      ]
                    })(<Input type="text" placeholder="First name" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("lastName", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter your last name!"
                        }
                      ]
                    })(<Input type="text" placeholder="Last name" />)}
                  </Form.Item>
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
                        autoComplete="email"
                        type="email"
                        placeholder="Email"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter your Password!"
                        },
                        {
                          validator: this.validateToNextPassword
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        autoComplete="new-password"
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("confirm", {
                      rules: [
                        {
                          required: true,
                          message: "Please repeat your Password!"
                        },
                        {
                          validator: this.compareToFirstPassword
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        autoComplete="new-password"
                        type="password"
                        placeholder="Repeat Password"
                        onBlur={this.handleConfirmBlur}
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("agreement", {
                      rules: [
                        {
                          required: true,
                          message: "Please agree to the privacy policy!"
                        }
                      ]
                    })(
                      <Checkbox>
                        I have read and agree to the{" "}
                        <span

                        >
                          privacy policy
                        </span>
                        .
                      </Checkbox>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ width: "300px" }}
                    >
                      Signup
                    </Button>
                  </Form.Item>
                </Form>
              </FormHolder>
            ) : (
                <FormHolder>
                  <h2>Please check your email to activate your account.</h2>
                  <Button
                    type="primary"
                    onClick={() => this.props.history.push("/")}
                  >
                    Return home
                </Button>
                </FormHolder>
              )}
          </div>
        </Column>
      </Row>
    );
  }
}

const WrappedSignup = Form.create()(Signup);

export default WrappedSignup;
