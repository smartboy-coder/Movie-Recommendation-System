import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  LoginPageContainer,
  LoginTitle,
  LoginForm,
  FormGroup,
  Label,
  InputContainer,
  Input,
  Button,
  NavigateText
} from './styledComponents';

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [submitError,setSubmitError] = useState({isError:false,errorMsg:''})


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token',data.jwtToken,{expires: 1})
        navigate('/',{replace:true})
      }
      else {
        setSubmitError({isError:true,errorMsg:data.errorMsg})
      }
    }
    catch (error) {
      console.log('Error Submitting Form Data:', error.message);
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginTitle>Login</LoginTitle>

        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <InputContainer>
            <FaUser />
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder='Enter Your Username'
              required
            />
          </InputContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <InputContainer>
            <RiLockPasswordFill />
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter Your Password'
              required
            />
          </InputContainer>
        </FormGroup>
        <Button type="submit">Login</Button>
        <NavigateText>Don't Have an account? <Link to='/signup'>sign up</Link></NavigateText>
        {submitError.isError && <p>{submitError.errorMsg}</p>}
      </LoginForm>
    </LoginPageContainer>
  );
};

export default Login;
