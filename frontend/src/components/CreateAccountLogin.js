import React, { useState, useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App.js'

export default function CreateAccountLogin() {
  const [userSelect, setUserSelect] = useState(0);
  const [newAccount, setNewAccount] = useState({
      email: '',
      password:'',
      first_name: '',
      last_name: ''  })
  const navigate = useNavigate()
  let { activeUser, setActiveUser } = React.useContext(UserContext);

  const showChoice = (number) =>{
    setUserSelect(number)
  }

  const handleChange = (e, type) => {
    // name is the key name
    // value is e.target.value
    const { name, value } = e.target;
    setNewAccount(prevState => ({ ...prevState, [type]: value }));
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // todo: send a POST request to the assessments table
  //   console.log(newAccount);
  // };

  

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
          navigate('/')
        }else{
          console.log(response.status)
        }
      })
      .catch(error => {
        console.log('Login error', error)
      })
      //navigate('/')
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
        //console.log(response)
        if(response.status == "Authenticated"){
          alert('Created Account')
          setActiveUser(response.userData)
          console.log(response.userData)
          navigate('/')
        }else{
          alert('Failed to create account')
        }
      })
      .catch(error=>{
        alert('Error registering a new account', error)
      })
  }

  // useEffect(() => {
  //   console.log('User', userE.activeUser)
  // },[userE.activeUser])

  return (
    <div>
      <h1>Create Account/Login</h1>
      <button onClick= {() => showChoice(1)}>Login</button>
      <br/>
      <button onClick= {() => showChoice(2)}>Create Account</button>

    {userSelect === 1? 
      <>
        <br></br>
        <label> Email:
        <input type="text" id="username"  />
        </label>
        <br/>
        <label> Password:
        <input type="text" id="password"/>
        </label>
        <br/>
        <button onClick={ () => checkLogin()}>Submit</button>
      </>

      :
      userSelect === 2?
     <>
      <br></br>
        <label> First Name:
        <input type="text" id="first" onChange={(event) => handleChange(event, "first_name")} />
        </label>
        <br/>
        <label> Last Name:
        <input type="text" id="last" onChange={(event) => handleChange(event, "last_name")} />
        </label>
        <br/>
        <label> Email:
        <input type="text" id="email" onChange={(event) => handleChange(event, "email")} />
        </label>
        <br/>
        <label> Password:
        <input type="text" id="password" onChange={(event) => handleChange(event, "password")} />
        </label>
        <br/>
        <label> Purpose for Account:
        <textarea id="purpose" onChange={(event) => handleChange(event, "purpose")} />
        </label>
        <br />
        <button onClick={registerUser}>Submit</button>

      </>
      :
      <></>

  }
    </div>
  );
}