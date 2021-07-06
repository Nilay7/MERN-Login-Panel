import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './Register.css'

async function registerUser(info) {
    return fetch('http://localhost:4000/api/user/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return alert('Something went wrong!');
    })
    .catch(err => err);
}

export default function Register() {

    const [form, setForm] = useState({
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: '',
        phonenumber: ''
    });

    const [errors, setErrors] = useState({});
    
    let history = useHistory();

    function validateInputs() {

        let isValid = true;
        let errorObj = {};
        if(!form.email) {
            isValid = false;
            errorObj['email'] = '*Please enter email';
        }

        if(form.email) {
            let pattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(form.email)) {
                isValid = false;
                errorObj['email'] = '*Please enter valid email';
            }
        }

        if (form.firstname.length < 2) {
            isValid = false;
            errorObj['firstname'] = '*Please enter your first name';
        }

        if (form.lastname.length < 2) {
            isValid = false;
            errorObj['lastname'] = '*Please enter your last name';
        }

        if (form.password.length < 6) {
            isValid = false;
            errorObj['password'] = '*Password must be at least 6 characters long';
        }

        if (!form.confirmPassword) {
            isValid = false;
            errorObj['confirmPassword'] = '*Please enter your password';
        }

        if(form.password !== form.confirmPassword) {
            isValid = false;
            errorObj['confirmPassword'] = '*Passwords must match!'
        }

        if (!form.phonenumber) {
            isValid = false;
            errorObj['phoneNumber'] = '*Please enter number';
        }

        if(form.phonenumber) {
            let pattern = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
            if(!pattern.test(form.phonenumber)) {
                isValid = false;
                errorObj['phoneNumber'] = '*Please enter valid number';
            }
        }

        console.log('errorObj',errorObj);
        setErrors({ ...errors, ...errorObj });        
        return isValid;
    }

    const updateField = e => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      };

    const handleSubmit = async e => {
        e.preventDefault();

        form.confirmPassword = '';

        console.log('errors',errors)

        console.log('form',form);

        if(validateInputs())  {
            const register = await registerUser(form);
    
            console.log('register', register)
            if(register.status === 'Success') {
                console.log('here')
                return history.push('/login');
            }
            alert('Unable to register, Please try again');
            return history.push('/register');
        }
        
    };

    return (
        <div className="Register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="text" name="Email" onChange={updateField}/>
                </label>
                <div className='errorMsg'>{errors.email}</div>
                <label>
                    <p>First Name</p>
                    <input type="text" name="First Name" onChange={updateField}/>
                </label>
                <div className='errorMsg'>{errors.firstname}</div>
                <label>
                    <p>Last Name</p>
                    <input type="text" name="Last Name" onChange={updateField}/>
                </label>
                <div className='errorMsg'>{errors.lastname}</div>
                <label>
                    <p>Username</p>
                    <input type="text" name="Username" onChange={updateField}/>
                </label>
                <div className='errorMsg'>{errors.username}</div>
                <label>
                    <p>Password</p>
                    <input type="password" name="Password" onChange={updateField}/>
                </label>
                <div className='errorMsg'>{errors.password}</div>
                <label>
                    <p>Confirm Password</p>
                    <input type="password" name="Confirm Password" onChange={updateField}/>
                </label>
                <div className='errorMsg'>{errors.confirmPassword}</div>
                <label>
                    <p>Phone Number</p>
                    <input type="text" name="Phone Number" onChange={updateField}/>
                </label>
                <div className='errorMsg'>{errors.phoneNumber}</div>
                <div className="submitbtn">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};