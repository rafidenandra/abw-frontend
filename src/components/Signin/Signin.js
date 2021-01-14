import React from 'react';

// CSS
import './Signin.css';

class Signin extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://serene-spire-22376.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="wrapper-signin">
                <div className="card card-signin">
                    <h1 className="card-title title-signin">SIGN IN</h1>
                    <form>
                        <div className="mb-3"> 
                            <label 
                                for="email" 
                                className="form-label">
                                    Email
                            </label>
                            <input 
                                size="30"
                                type="email" 
                                className="form-control" 
                                id="email" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter your email" 
                                onChange={this.onEmailChange}/>
                                
                        </div>
                        <div className="mb-3">
                            <label 
                                for="password" 
                                className="form-label">
                                Password
                            </label>
                            <input
                                size="30"
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Enter your password" 
                                onChange={this.onPasswordChange} />
                        </div>   
                    </form> 
                    
                    <button 
                        type="submit" 
                        className="button-signin"
                        onClick={this.onSubmitSignIn}
                    >
                        SIGN IN
                    </button>
                    <p className="text-signin">Not a member? 
                        <a href="#0" className="link-signin" onClick={() => onRouteChange('register')}> Register</a>
                    </p>
                    
                </div>
            </div>
        ); 
    } 
}
export default Signin;