import styled from 'styled-components';

export const ToggleVisible = styled.div`
  display: ${props => (props.show ? "inherit" : "none")};
`
export const StretchBtn = styled.button`
  width: 100%;
  text-align: center;
`;