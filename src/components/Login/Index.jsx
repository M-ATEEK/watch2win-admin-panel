import React, { Component } from "react";
import loginBg from "../../assets/img/loginBg.png";
import emailIcon from "../../assets/img/envelope.png";
import lockIcon from "../../assets/img/lock.png";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";

class Login extends Component {
	state = {};
	render() {
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
								<form action='#' method='post'>
									<Row>
										<Col md={12}>
											<div className='form-group'>
												<div className='input-group mb-3'>
													<div className='input-group-prepend'>
														<span className='input-group-text'>
															<img src={emailIcon} alt='' />
														</span>
													</div>
													<input type='email' className='form-control' placeholder='Email' />
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
													<input type='password' className='form-control' placeholder='Password' />
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
