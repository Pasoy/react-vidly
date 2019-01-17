import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            email: '',
            password: ''
        },
        errors: {}
    };

    schema = {
        username: Joi.string()
            .label('Username')
            .required(),
        email: Joi.string()
            .label('Email')
            .email()
            .required(),
        password: Joi.string()
            .label('Password')
            .min(6)
            .required()
    };

    doSubmit = () => {
        // Server stuff
        console.log('Submit button pressed');
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('email', 'Email')}
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
