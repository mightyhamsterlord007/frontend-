import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'access-control-allow-origin': '*'
    }
});

class App extends Component {

  state = {
    profile: {
    
    },
    allUsers: null
  }

  componentDidMount() {
    Axios.get('/users/allusers')
    .then( (response) => {

      let updated = Object.assign({}, this.state.allUsers);
      
      updated = response.data.data;

      console.log(updated)
      
      this.setState({
        allUsers: updated
      }, () => {
        console.log(this.state)
      });

    


    })
    .catch( (error) => {
      console.log(error);
    });
  }


  handleInput = (event) => {
    let updated = Object.assign({}, this.state.profile);
    updated[event.target.name] = event.target.value;

    this.setState({
      profile: updated
    }, () => {
      //console.log(this.state)
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state.profile;
  
    Axios.post('/users/createuser', {
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response)
    })
    .catch( (error) => {
      console.log(error);
    });

    event.target.reset();
  }

  render() {
    let allUsers; 
    if (this.state.allUsers !== null) {
      allUsers = this.state.allUsers[0].email;
    } else {
      allUsers = '';
    }

    return (
      <div className="App">
       <form style={styles.formStyles} onSubmit={this.handleSubmit}>
         <label>Email</label>
         <br />
         <input placeholder="email" name="email" type="text" onKeyUp={this.handleInput} />
         <br />
         <label>Password</label>
         <br />
         <input placeholder="password" name="password" type="text" onKeyUp={this.handleInput} />
         <br />
         <button>Submit</button>
       </form>
       {allUsers}
      </div>
    );
  }
}

const styles = {
  formStyles: {
    marginTop: 200 + 'px'
  }
}

export default App;
