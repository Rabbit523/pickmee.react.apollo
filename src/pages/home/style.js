import styled from 'styled-components';
import { Layout  } from 'antd';

const { Content } = Layout;

export const HomeComponent = styled.div`
    background: #dddddd;
    height: 100vh;
    width: 100%;
`
export const FlexCenter = styled(Content)`
    text-align: center;
`

export const NavButton = styled.button`
    color: black;
    background: #ce1839e3;
    font-size: 1.4em;
    font-weight: 600;
    min-width: 180px;
    margin: 1em;
    padding: 0.35em 1em;
    border: none;
`

export const LoginDiv = styled.div`
    display: inline-block;
    color: black;
    background: #ffffff;
    font-size: 1.1em;
    font-weight: 600;
    min-width: 180px;
    margin: 1em;
    padding: 0.35em 1em;
    border: none;
`