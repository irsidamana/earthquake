import React from 'react';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  handleChange = e => {
  this.setState({ [e.target.name]: e.target.value }, () => {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  })
};

handleSignIn() {
  console.log(this.state.user.username);
  if(this.state.user.username === "test" && this.state.user.password === "Idaeshte1*") {
    if (this.props.onChange) {
      this.props.onSubmit(this.state);
    }
  }
}

  render() {
    return ( <
      div >
      <
      form onSubmit={this.handleSignIn} >
      <
      input type = "text"
      name = "username"
      placeholder = "Username"
      onChange={this.handleChange}
      /> <
      input type = "password"
      name = "password"
      placeholder = "Password"
      onChange={this.handleChange}
      /> <
      button type = "submit">
      Sign in
      <
      /button> <
      /form>

      <
      /div>
    );
  }
}
