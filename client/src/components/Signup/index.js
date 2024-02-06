import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  SignUpContainer,
  SignUpForm,
  FormGroup,
  Label,
  Input,
  Button,
  SignupHeading,
  InputContainer,
  NavigateText,
  RegisterMessage,

} from './styledComponents'


const SignUp = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

const [register,setRegister] = useState({isSubmit:false,message:'',isSuccess:false})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json()
        setRegister({isSubmit:true,message:data.message,isSuccess:data.isRegisteredSuccessful})
        console.log(register.isSuccess)
        if(data.isRegisteredSuccessful){
          setTimeout(() => {
            navigate('/login',{replace:true})
          }, 2000);
        }
      } else {
        console.log('Error Submitting Form Data:', response.statusText);
      }
    } catch (error) {
      console.error('Error Submitting Form Data:', error.message);
    }
   

  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <SignupHeading>Sign Up</SignupHeading>
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
          <Label htmlFor="email">Email</Label>
          <InputContainer>
          <IoMdMail/>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter Your Email'
            required
          />
          </InputContainer>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <InputContainer>
          <RiLockPasswordFill/>
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
        <Button type="submit">Sign Up</Button>
      <NavigateText>Have an account? <Link to='/login'>Login</Link></NavigateText>
      {register.isSubmit && <RegisterMessage $isSuccess={register.isSuccess} >{`* ${register.message}`}</RegisterMessage>}
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;
