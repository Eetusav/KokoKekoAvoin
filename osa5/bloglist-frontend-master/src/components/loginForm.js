import React from "react"

const loginForm = () => (
    <div><h2>Kirjaudu</h2>

      <form onSubmit={this.login}>
        <div>
          käyttäjätunnus
      <input
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          salasana
      <input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form></div>
  )

  //export default loginForm;