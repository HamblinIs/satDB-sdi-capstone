import React, { useState } from 'react'

const Login = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        // Login logic here
        setUserName('');
        setPassword('');
    }


  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={() => setUsername()}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={() => setPassword()}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
