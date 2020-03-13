import styled from "styled-components";
import { Col } from "antd";
import { Layout } from 'antd';

const { Content } = Layout;

export const FormHolder = styled.div`
  img {
    margin-bottom: 30px;
  }
`;

/**
 * Using && for higher specifity as styles are being overriden by less-loader.
 */
export const Column = styled(Col)`
  && {
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
`;

export const Description = styled.div`
  margin: 100px;
`;

export const Title = styled.h1`
  display: inline-block;
  font-size: 32px;
  line-height: 46px;
  width: 55%;
`;

export const SubTitle = styled.h5`
  font-weight: 500;
  font-size: 14px;
`;

export const LoginComponent = styled.div`
  background-color: #dddddd;
  height: 100vh;
  width: 100%;
`

export const FlexCenter = styled(Content)`
  text-align: center;
`

export const LoginForm = styled.div`
  width: 300px;
  display: inline-block;
`