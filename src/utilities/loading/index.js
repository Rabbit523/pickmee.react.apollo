import React from "react";
import { Icon, Button } from "antd";
import styled from "styled-components";

const MainDiv = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #f8f9f9;
`;

export function Loading(props) {
  if (props.error) {
    return (
      <MainDiv>
        Error loading page! <Button onClick={props.retry}>Retry</Button>
      </MainDiv>
    );
  } else {
    return (
      <MainDiv>
        <Icon type="loading" style={{ fontSize: 40, color: "#132440" }} spin />
      </MainDiv>
    );
  }
}
