import React from 'react';

// CSS
import './register.css';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            first_name: '',
            last_name: '',
            email: '',
            password: '',
            institution: ''
        }
    }
    
    onFnameChange = (event) =>{
        this.setState({first_name : event.target.value})
    }
    
    onLnameChange = (event) =>{
        this.setState({last_name : event.target.value})
    }

    onEmailChange = (event) =>{
        this.setState({email : event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password : event.target.value})
    }

    onInstitutionChange = (event) => {
        this.setState({institution : event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://serene-spire-22376.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                institution : this.state.institution
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="wrapper-regist">
                <div className="card card-regist">
                    <h1 className="card-title title-regist">REGISTER</h1>
                    <form>

                        <div className="upper">
                            <div className="mb-3">
                                <label 
                                    for="fname" 
                                    className="form-label">
                                        First Name
                                </label>
                                <input
                                    size="38"
                                    className="form-control" 
                                    id="fname"
                                    placeholder="Enter your first name" 
                                    onChange={this.onFnameChange}/>
                            </div>
                            <div className="mb-3">
                                <label 
                                    for="lname" 
                                    className="form-label">
                                        Last Name
                                </label>
                                <input
                                    size="38"
                                    className="form-control" 
                                    id="lname"
                                    placeholder="Enter your last name" 
                                    onChange={this.onLnameChange}/>
                            </div>
                        </div>

                        <div className="lower">
                            <div className="mb-3"> 
                                <label 
                                    for="email" 
                                    className="form-label">
                                        Email
                                </label>
                                <input 
                                    size="86"
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
                                    size="86"
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Enter your password" 
                                    onChange={this.onPasswordChange} />
                            </div>
                            <div className="mb-3">
                                <label 
                                    for="institution" 
                                    className="form-label">
                                    Institution
                                </label>
                                <input
                                    size="86"
                                    className="form-control" 
                                    id="institution" 
                                    placeholder="Enter your institution" 
                                    onChange={this.onInstitutionChange} />
                            </div>
                        </div>
                        
                    </form>
                    <div className="footer-regist">
                        <button 
                            type="submit" 
                            className="button button-regist"
                            onClick={this.onSubmitSignIn}
                        >
                            REGISTER
                        </button>
                        
                    </div> 

                    <p className="text">Already have an account? 
                            <a href="#0" className="link" onClick={() => onRouteChange('signin')}> Sign in</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default Register;