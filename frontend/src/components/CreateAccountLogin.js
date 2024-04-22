import React from 'react';
import {useState} from 'react';


export default function CreateAccountLogin() {
  const [userSelect, setUserSelect] = useState(0);
  const [newAccount, setNewAccount] = useState({
      first: '',
      last:'',
      username: '',
      password: '',
      reason: ''
  })


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

  }

  return (
    <div>
      <h1>Create Account/Login</h1>
      <button onClick= {() => showChoice(1)}>Login</button>
      <br/>
      <button onClick= {() => showChoice(2)}>Create Account</button>

    {userSelect === 1? 
      <form onSubmit={checkLogin}>
        <label> Username
        <input type="text" id="username"  />
        </label>
        <br/>
        <label> Password
        <input type="text" id="password"/>
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>

      :
      userSelect === 2?
     <form onSubmit={handleSubmit}>
        <label> First Name:
        <input type="text" id="first" onChange={handleChange} />
        </label>
        <br/>
        <label> Last Name:
        <input type="text" id="last" onChange={handleChange} />
        </label>
        <br/>
        <label> Username:
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