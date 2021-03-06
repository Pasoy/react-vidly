import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
    state = {
        data: { email: '', username: '', password: '' },
        errors: {}
    };

    schema = {
        email: Joi.string()
            .email()
            .required()
            .label('Email'),
        username: Joi.string()
            .required()
            .label('Username'),
        password: Joi.string()
            .required()
            .min(5)
            .label('Password')
    };

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
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
