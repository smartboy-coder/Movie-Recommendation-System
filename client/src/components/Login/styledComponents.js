/* styledComponents.js */
import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d6d6d6;
  font-family: 'PT Serif', serif;
`;

export const LoginForm = styled.form`
  max-width: 400px;
  width: 100%;
  padding: 20px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    max-width: 500px;
`

export const LoginTitle = styled.h2`
font-size: 30px;
  font-weight: bold;
    font-family: 'Outfit', sans-serif;
    text-align: center;
    margin-top: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

export const InputContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
box-sizing: border-box;
      border: 2px solid gainsboro;
    border-top: none;
    border-right: none;
    border-left: none;
    padding: 5px;
`

export const Input = styled.input`
width: 500px;
margin-left: 10px;
box-sizing: border-box;
  border: none;
  outline: none;
  &::placeholder{
    font-family: 'PT Serif', serif;
  }
`;

export const Button = styled.button`
  background-color: #808080;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  &:hover {
    background-color: #80809f;
  }
`;

export const NavigateText = styled.p`
text-align: center;
`