import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';

import { register } from '../services/userService';

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

    doSubmit = async () => {
        // Server stuff
        await register(this.state.data);
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
