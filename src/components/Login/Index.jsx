import React, { Component } from "react";
import loginBg from "../../assets/img/loginBg.png";
import emailIcon from "../../assets/img/envelope.png";
import lockIcon from "../../assets/img/lock.png";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import config from "../../config";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Joi from "joi";
import Auth from "components/Services/Auth";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./index.css";

class Login extends Component {
    state = {
        email: "",
        password: "",
        login: false,
        errors: {},
        message: "",
        emptyfield: "",
        auth: false,
    };

    schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .label("Email"),
        password: Joi.string().required().min(6).label("Password"),
    });
    submitHandler = (e) => {
        e.preventDefault();
        if (this.state.email === "" && this.state.password === "") {
            this.setState({
                message: "Enter email and password",
            });
        } else {
            const data = this.state;
            axios.post(`${config.API_URL}/authenticate`, data).then((response) => {
                if (response.data.success) {
                    if (response.data.data.token !== undefined) {
                        Auth.setToken(response.data.data.token);
                        this.props.history.push("/admin/dashboard");
                    }
                } else if (response.data.success === false) {
                    this.setState({
                        message: response.data.errors.email.message,
                    });
                }
            });
        }
    };

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to='/admin/dashboard' />;
        }
        return (
            <div className='container-fluid'>
                <div className='loginArea'>
                    <div className='container'>
                        <Row>
                            <Col md={6} sm={6} xs={12} className='loginBg hidden-sm hidden-xs'>
                                <img src={loginBg} alt='' />
                            </Col>
                            <Col md={6} sm={12} xs={12} className='formArea'>
                                <h3>Sign In</h3>
                                <form onSubmit={this.submitHandler} method='post'>
                                    <p className='text-danger'>{this.state.message}</p>

                                    <Row>
                                        <Col md={12}>
                                            <div className='form-group'>
                                                <input
                                                    type='email'
                                                    className='form-control'
                                                    placeholder='Email'
                                                    name='email'
                                                    value={this.state.email}
                                                    onChange={this.handleInput}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className='form-group'>
                                                <input
                                                    type='password'
                                                    className='form-control'
                                                    placeholder='Password'
                                                    name='password'
                                                    onChange={this.handleInput}
                                                    value={this.state.password}
                                                />
                                                {this.state.errors.password && <span className='text-danger'>{this.state.errors.password}</span>}
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className='form-group'>
                                                <input type='checkbox' /> &nbsp; keep me Sign in
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className='form-group'>
                                                <button type='submit' className='btn btnSubmit'>
                                                    Sign in
                                                </button>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                        </Row>
                        <div className='clearfix'></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
