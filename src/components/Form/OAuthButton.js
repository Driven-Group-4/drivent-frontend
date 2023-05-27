import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

export default function OAuthButton({ variant='contained', children, ...props }) {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.a`
    text-transform: uppercase;
    font-size: 16px;
    color: white;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    background-color: black;
    margin-top: 8px !important; 
    border: none;
    border-radius: 4px;
    padding: 6px 16px;
    width: 100%;
    cursor: pointer;
`;
