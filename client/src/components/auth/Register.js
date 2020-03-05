import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } =alertContext;
    const { register, error, clearErrors, isAuthenticated } =authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }
        if (error === 'User Already exists') {
            setAlert(error, 'danger');
            clearErrors();
          }
          // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''

    });

    const { name, email, password, password2 } = user ;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value });
    
    const onSubmit = e =>{
       // console.log( name, email, password, password2 );
        
        e.preventDefault();
        if(name === '' || email === '' || password === ''){
            setAlert('Please enter all fields', 'danger');
        } else if(password !== password2){
            setAlert('Password do not match ', 'danger');
        } else {
           register({
               name,
               email,
               password
           });
        }
               
    }

    return (     
    <div class="container" id="container">       
            <div class="form-container sign-in-container">
                <form action="#" onSubmit={onSubmit}>
                    <h2>Sign Up</h2>
                    <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} required/>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required/>
                    <input type="password" name="password" placeholder="Password"  value={password} onChange={onChange} required/>
                    <input type="password" name="password2" placeholder="Re-enter your new password "  value={password2} onChange={onChange} required/>            
                    <a href="/login">Are you already a member?-Sign In</a>
                    <button>Sign up</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">              
                    <div class="overlay-panel overlay-right">
                        <h1>Hello,Friend!</h1>                  
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Register
