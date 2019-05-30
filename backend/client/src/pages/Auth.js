import React, { Component } from "react";
import "./Auth.css";
import AuthContext from "../context/auth-context";


class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();

    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    //trim() removes whitespace from both sides of a str
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
                userId
                token
                tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            _id
        }`
      };
    }
    // fetch('/login', {
    //   credentials: 'createUser'
    // })
    //http://localhost:4000/graphql
      fetch("http://localhost:4000/graphql", {
        endpoint: './graphql',
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/graphql",
          "Accept": "application/json"
        }
      
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        //this will automatically extract and parse the res body
        
        console.log(res.json())
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
   };

  handleSwitch = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  render() {
    return (
      <div className="container">
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" ref={this.emailEl} />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordEl} />
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={this.handleSwitch}>
              Switch to {this.state.isLogin ? "Signup" : "Login"}
            </button>
          </div>
          <div className="image">

          </div>
        </form>
      </div>
    );
  }
}

export default AuthPage;
