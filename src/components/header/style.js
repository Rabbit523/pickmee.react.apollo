import styled from 'styled-components';

export const Logo = styled.img`
  cursor: pointer;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 16px;
  float: left;
`;

export const DesktopMenu = styled.div`
   @media (max-width: 600px) {
      display: none;
  }
  
`;

export const MobileMenu = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
`;