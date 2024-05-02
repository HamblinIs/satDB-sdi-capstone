import React, { useState, useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.js'
import './Login.css'

export default function Login() {

  const [userSelect, setUserSelect] = useState(0);
  const [newAccount, setNewAccount] = useState({
      email: '',
      password:'',
      first_name: '',
      last_name: ''  })

  const [passwordValidity, setPasswordValidity] = useState({
      length: false,
      capitalLetter: false,
      specialCharacter: false
      });

  const [step, setStep] = useState(1);
  const navigate = useNavigate()
  let { activeUser, setActiveUser } = React.useContext(UserContext);

  const showChoice = (number) =>{
    setUserSelect(number)
    setStep(number); // Update step to render the second container
  }

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    setNewAccount(prevState => ({ ...prevState, [type]: value }));
    validatePassword(value);
  };

  const validatePassword = (password) => {
    const lengthRegex = /.{8,}/;
    const capitalLetterRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    setPasswordValidity({
      length: lengthRegex.test(password),
      letter: capitalLetterRegex.test(password),
      specialCharacter: specialCharRegex.test(password)
    });
  };



  const checkLogin = () =>{
    const userName = document.getElementById("username").value
    const passWord = document.getElementById("password").value

    const loginInfo = {
      email: userName,
      password: passWord
    }

      fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
      })
      .then(res => res.json())
      .then(response => {
        if(response.status == "Authenticated") {
          console.log('Login Successful')
          setActiveUser(response.userData)
          console.log(response.userData)
          alert('Login Successful!')
          navigate('/home')
        }else{
          alert('Incorrect Username or Password.')
          console.log(response.status)
        }
      })
      .catch(error => {
        console.log('Login error', error)
      })
  }

  const registerUser = () => {
    console.log(newAccount)
    if(
      !newAccount.email ||
      !newAccount.password ||
      !newAccount.first_name ||
      !newAccount.last_name ||
      !newAccount.purpose
    ) {
      alert('Fill out form')
      return;
    }

    fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAccount)
      })
      .then(res => res.json())
      .then(response => {
        if(response.status == "Authenticated"){
          alert('Created Account')
          setActiveUser(response.userData)
          console.log(response.userData)
          navigate('/home')
        }else{
          alert('Failed to create account')
        }
      })
      .catch(error=>{
        alert('Error registering a new account', error)
      })
  }

  // const handleSignOut = () => {
  //   setActiveUser({})
  //   setUserSelect(0)
  //   navigate('/')
  //   toggleLoginModel()
  // }

  return (


    
      <div className='assessment-container'>
        {step === 1 && ( // Render the first container if step is 1
          <>
            <h1 className='login-text-header'>Login</h1>
            <p className='login-text'>Email</p>
            <input type='text' id='username' className='searchbar' placeholder='Email'></input>
            <p className='login-text'>Password</p>
            <input type="password" id='password' className='searchbar' placeholder='Password'></input>
            <button className='login-button' onClick={ () => checkLogin()}>Submit</button>
            <p style={{cursor: "pointer"}} onClick= {() => showChoice(2)}>Click Here To Register</p>
          </>
        )}
        {step === 2 && ( // Render the second container if step is 2
          <>
            <br/>
            <h1 className='create-text-header'>Create New Account</h1>
            <br></br>
            <label className='login-text'> First Name
              <input type="text" className='searchbar' id="first" placeholder='Enter first name' onChange={(event) => handleChange(event, "first_name")} />
            </label>
            <br/>
            <label className='login-text'> Last Name
              <input type="text" className='searchbar' id="last" placeholder='Enter last name' onChange={(event) => handleChange(event, "last_name")} />
            </label>
            <br/>
            <label className='login-text'> Email
              <input type="text" className='searchbar' id="email" placeholder='Enter email address' onChange={(event) => handleChange(event, "email")} />
            </label>
            <br/>
            <label className='login-text'> Password
              <input type="password" className='searchbar' id="password" placeholder='Enter password' onChange={(event) => handleChange(event, "password")} />
            </label>
            <br/>
            <label className='login-text'> Purpose for Account
              <textarea className ='searchbar' id="purpose" onChange={(event) => handleChange(event, "purpose")} />
            </label>
            <div className='password-parameters'>
              <p className='password-param'>Password must:</p>
              <p className={passwordValidity.length ? 'valid' : 'invalid'}>Be at least 8 characters long</p>
              <p className={passwordValidity.letter ? 'valid' : 'invalid'}>Contain at least one capital letter</p>
              <p className={passwordValidity.specialCharacter ? 'valid' : 'invalid'}>Contain at least one special character</p>
            </div>
            <button className='login-button' onClick={registerUser}>Submit</button>
            <p style={{cursor: "pointer"}} onClick= {() => showChoice(1)}>Already have an account? Click here.</p>
          </>
        )}
      </div>
    

  )
}