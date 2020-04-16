import styled from 'styled-components';

export const ToggleVisible = styled.div`
  display: ${props => (props.show ? "inherit" : "none")};
`
