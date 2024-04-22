import React from 'react';
import {useState} from 'react';


export default function CreateAccountLogin() {
  const [userSelect, setUserSelect] = useState(0);
  const [newAccount, setNewAccount] = useState({
      email: '',
      password:'',
      first_name: '',
      last_name: ''  })


  const showChoice = (number) =>{
    setUserSelect(number)
  }

  const handleChange = (e) => {
    // name is the key name
    // value is e.target.value
    const { name, value } = e.target;
    setNewAccount(prevState => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // todo: send a POST request to the assessments table
    console.log(newAccount);
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
      .then(data => console.log(data))
      .catch(error => console.error("error logging in:", error))
  }

  const registerUser = () => {
    fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAccount)
      })
      .then(res => console.log(res))
      .catch(error => console.error("error registering a new account:", error))
  }

  return (
    <div>
      <h1>Create Account/Login</h1>
      <button onClick= {() => showChoice(1)}>Login</button>
      <br/>
      <button onClick= {() => showChoice(2)}>Create Account</button>

    {userSelect === 1? 
      <form onSubmit={ () => checkLogin()}>
        <label> Email:
        <input type="text" id="username"  />
        </label>
        <br/>
        <label> Password:
        <input type="text" id="password"/>
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>

      :
      userSelect === 2?
     <form onSubmit={registerUser}>
        <label> First Name:
        <input type="text" id="first" onChange={handleChange} />
        </label>
        <br/>
        <label> Last Name:
        <input type="text" id="last" onChange={handleChange} />
        </label>
        <br/>
        <label> Email:
        <input type="text" id="username" onChange={handleChange} />
        </label>
        <br/>
        <label> Password:
        <input type="text" id="password" onChange={handleChange} />
        </label>
        <br/>
        <label> Purpose for Account:
        <textarea id="purpose" onChange={handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />

      </form>
      :
      <></>

  }
    </div>
  );
}