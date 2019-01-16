import React, { Component } from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import Input from './common/input';

class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    };

    schema = {
        username: Joi.string()
            .label('Username')
            .required(),
        password: Joi.string()
            .label('Password')
            .required()
    };

    doSubmit = () => {
        // Server stuff
        console.log('Submit button pressed');
    };

    render() {
        const { data, errors } = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        value={data.username}
                        label="Username"
                        error={errors.username}
                        onChange={this.handleChange}
                    />
                    <Input
                        name="password"
                        value={data.password}
                        label="Password"
                        error={errors.password}
                        onChange={this.handleChange}
                    />
                    <button
                        disabled={this.validate()}
                        className="btn btn-primary"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
