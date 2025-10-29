import React, { Component } from "react";
import loginBg from "../../assets/img/loginBg.png";
import emailIcon from "../../assets/img/envelope.png";
import lockIcon from "../../assets/img/lock.png";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import config from "../../config"
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

class Login extends Component {

	state = {
		email: "",
		password: "",
		login: false
	};
	submitHandler = (e) => {
		e.preventDefault();
		const data = this.state;
		axios.post(`${config.URL}/authenticate`, data)
			.then((response) => response.data.data
			).then(response => {
				if (response.token !== undefined) {
					localStorage.setItem("token", response.token)
					this.setState({
						login: true
					})
				}
			})
			.catch(error => {
				console.log(error);
			})
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	render() {
		if (localStorage.getItem('token')) {
			return <Redirect to="/admin/dashboard" />
		}
		return (
			<div className='container-fluid'>
				<div className='loginArea'>
					<div className='container'>
						<Row>
							<Col md={6} sm={6} xs={12} className='loginBg'>
								<img src={loginBg} alt='' />
							</Col>
							<Col md={6} sm={6} xs={12} className='formArea'>
								<h3>Sign In</h3>
								<form onSubmit={this.submitHandler} method='post'>
									<Row>
										<Col md={12}>
											<div className='form-group'>
												<div className='input-group mb-3'>
													<div className='input-group-prepend'>
														<span className='input-group-text'>
															<img src={emailIcon} alt='' />
														</span>
													</div>
													<input name="email" value={this.state.email} onChange={this.handleInput} type='email' className='form-control' placeholder='Email' />
												</div>
											</div>
										</Col>
										<Col md={12}>
											<div className='form-group'>
												<div className='input-group mb-3'>
													<div className='input-group-prepend'>
														<span className='input-group-text'>
															<img src={lockIcon} alt='' />
														</span>
													</div>
													<input name="password" value={this.state.password} onChange={this.handleInput} type='password' className='form-control' placeholder='Password' />
												</div>
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
