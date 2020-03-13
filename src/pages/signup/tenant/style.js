import styled from "styled-components";
import { Col } from "antd";

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
  font-size: 32px;
  color: #ffffff;
  line-height: 46px;
`;

export const SubTitle = styled.h5`
  font-weight: 200;
  font-size: 20px;
  color: #ffffff;
`;
