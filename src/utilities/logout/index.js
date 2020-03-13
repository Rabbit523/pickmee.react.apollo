import React from "react";
import { Auth } from "aws-amplify";

import { Redirect } from "react-router-dom";

const Logout = props => {
  Auth.signOut()
    .then()
    .catch(err => console.log(err));
  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { loggedIn: false }
      }}
    />
  );
};

export default Logout;
