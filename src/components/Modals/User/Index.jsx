import React, { Component } from "react";
import Form from "../../common/Form";
import Joi from "joi";
import { Button, Col, Modal, Row } from "react-bootstrap";
import AddIcon from "../../../assets/img/add.png";
import CategoryIcon from "../../../assets/img/category.png";
import config from "../../../config";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

class UserModal extends Form {
	state = {
		data: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirm_password: "",
			roles: ["user"],
			userName: "",
			image: null,
		},
		activity: [],
		message: {
			email: "",
		},
		errors: {},
		imagePreview: "",
		disableButton: false,
		edit: false,
		view: false,
		close: false,
		showview: true
	};

	schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label("Email"),
		password: Joi.string().required().min(6).label("Password"),
		confirm_password: Joi.any().valid(Joi.ref("password")).label("Confirm Password"),
		userName: Joi.string().required().label("Username"),
		image: Joi.allow(""),
		roles: Joi.array().required(),
	});

	updatedUserSchema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label("Email"),
		userName: Joi.string().required().label("Username"),
		image: Joi.allow(""),
		roles: Joi.array().required(),
	});

	//function for validation
	validate = () => {
		let { error } = this.schema.validate(this.state.data);
		//if not error
		if (!error) return null;
		const errors = {};
		//loop through validator error and add in errors const according to data fields
		error.details.map((detail) => {
			errors[detail.path[0]] = detail.message;
		});

		return errors;
	};

	validateUpdate = () => {
		let { error } = this.updatedUserSchema.validate(this.state.data);
		//if not error
		if (!error) return null;
		const errors = {};
		//loop through validator error and add in errors const according to data fields
		error.details.map((detail) => {
			errors[detail.path[0]] = detail.message;
		});

		return errors;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		let errors;
		if (this.state.edit) {
			errors = this.validateUpdate();
		} else {
			errors = this.validate();
		}
		//call the validator function
		// let errors = this.validate();
		//set the errors in the state
		this.setState({
			errors: errors || {},
		});

		//if has error return, we don't want to submit form
		if (errors) return;

		this.doSubmit(e.target);
	};
	getActivity = () => {
		const { activity,imagePreview } = this.state
		return (
			activity.map((data, i) => {
			
			return <li style={{ margin: "10px", listStyle: "none", background: "black", color: "white", padding: "5px" }} key={i}><img src={imagePreview === "" ? CategoryIcon : imagePreview} alt='' width='50px' height='50px' style={{ borderRadius: "50%" }} />
			<p style={{ display: "inline-block", paddingLeft: "20px" }}>{data.type}</p>
			<p style={{ display: "inline-block", paddingLeft: "319px" }}>{ moment(data.createdAt).fromNow()}</p>
			</li>
			})

		)


	}
	viewData = () => {
		const { data, errors, disableButton, imagePreview } = this.state;
		return (
			<div>
				<Row>
					<div className='form-group'>
						<div className='text-center'>
							<img src={imagePreview === "" ? CategoryIcon : imagePreview} alt='' width='150px' height='150px' style={{ borderRadius: "50%" }} />
							{/*<img src={`http://localhost:8000/image/${data.image}`} alt='' width='110px' height='132px' />*/}{" "}
						</div>
					</div>
				</Row>
				{errors.image && (
					<Row className='text-center'>
						<span className='text-danger'>{errors.image}</span>
					</Row>
				)}
				<Row>
					<Col md={6} sm={12}>
						<div className='form-group'>
							<input style={{ color: "black" }} type='text' className='form-control' value={data.firstName} disabled />
						</div>
					</Col>

					<Col md={6} sm={12}>
						<div className='form-group'>
							<input style={{ color: "black" }} value={data.lastName} type='text' className='form-control' disabled />
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={6} sm={12}>
						<div className='form-group'>
							<input style={{ color: "black" }} value={data.email} type='email' className='form-control' disabled />
						</div>
					</Col>
					<Col md={6} sm={12}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								value={data.userName}
								name='userName'
								onChange={this.handleOnChange}
								disabled
							/>
							{errors.userName && <span className='text-danger'>{errors.userName}</span>}
						</div>
					</Col>
				</Row>
			</div>
		)
	}
	getData = () => {
		const token = localStorage.getItem("token");
		axios.get(`${config.API_URL}/admin/activity/${this.props.id}`, {
			headers: {
				Authorization: token,
			}
		}).then((response) => {
			this.setState({
				activity: response.data.activity
			})
		})
		axios
			.get(`${config.API_URL}/admin/users/${this.props.id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				if (response.data.data.user.image) {
					this.setState({
						data: {
							firstName: response.data.data.user.firstName,
							lastName: response.data.data.user.lastName,
							email: response.data.data.user.email,
							userName: response.data.data.user.userName,
							roles: ["user"],
						},
						imagePreview: `${config.IMG_URL}/image/${response.data.data.user.image}`,
					});
				} else {
					this.setState({
						data: {
							firstName: response.data.data.user.firstName,
							lastName: response.data.data.user.lastName,
							email: response.data.data.user.email,
							userName: response.data.data.user.userName,
							roles: ["user"],
						},
					});
				}
			});
	}
	componentDidMount() {
		if (this.props.selection === "view") {
			this.setState({
				view: true,
			});
		}
		if (this.props.selection === "edit") {
			this.setState({
				edit: true,
			});
		}
		if (this.props.selection === "edit" || this.props.selection === "view") {
			this.getData();
		}
	}

	doSubmit = async (e) => {
		const token = localStorage.getItem("token");
		const data = this.state.data;
		let message = "";
		if (this.props.selection === "edit") {
			if (this.state.data.image !== undefined) {
				const formdata = new FormData();
				formdata.append("firstName", this.state.data.firstName);
				formdata.append("lastName", this.state.data.lastName);
				formdata.append("email", this.state.data.email);
				formdata.append("userName", this.state.data.userName);
				formdata.append("image", this.state.data.image);
				await axios(`${config.API_URL}/admin/users/${this.props.id}`, {
					method: "POST",
					headers: {
						"content-type": "multipart/form-data",
						Authorization: token,
					},
					data: formdata,
				})
					.then((response) => {
						if (response.data.success) {
							this.setState({
								close: true,
								message: { email: "" },
							});
						} else if (response.data.success === false) {
							if (response.data.errors.email) {
								this.setState({
									message: { email: response.data.errors.email.message },
								});
							}
						}
					})
					.catch((error) => {
						throw error;
					});
			} else {
				const formdata = new FormData();
				formdata.append("firstName", this.state.data.firstName);
				formdata.append("lastName", this.state.data.lastName);
				formdata.append("email", this.state.data.email);
				formdata.append("userName", this.state.data.userName);
				await axios(`${config.API_URL}/admin/users/${this.props.id}`, {
					method: "POST",
					headers: {
						"content-type": "multipart/form-data",
						Authorization: token,
					},
					data: formdata,
				}).then((response) => {
					if (response.data.success) {
						this.setState({
							close: true,
							message: { email: "" },
						});
					} else if (response.data.success === false) {
						if (response.data.errors.email) {
							this.setState({
								message: { email: response.data.errors.email.message },
							});
						}
					}
				});
			}
			message = "User has been edit successfully";
		} else if (this.props.selection === "add") {
			if (this.state.data.image !== undefined) {
				const formdata = new FormData();
				formdata.append("firstName", this.state.data.firstName);
				formdata.append("lastName", this.state.data.lastName);
				formdata.append("email", this.state.data.email);
				formdata.append("password", this.state.data.password);
				formdata.append("confirm_password", this.state.data.confirm_password);
				formdata.append("roles", this.state.data.roles);
				formdata.append("userName", this.state.data.userName);
				formdata.append("image", this.state.data.image);
				await axios(`${config.API_URL}/signup`, {
					method: "POST",
					headers: {
						"content-type": "multipart/form-data",
					},
					data: formdata,
				})
					.then((response) => {
						if (response.data.success) {
							this.setState({
								close: true,
								message: { email: "" },
							});
						} else if (response.data.success === false) {
							if (response.data.errors.email) {
								this.setState({
									message: { email: response.data.errors.email.message },
								});
							} else if (response.data.errors.password)
								this.setState({
									message: { email: response.data.errors.password.message },
								});
						}
					})

					.catch((error) => {
						throw error;
					});
			} else {
				const formdata = new FormData();
				formdata.append("firstName", this.state.data.firstName);
				formdata.append("lastName", this.state.data.lastName);
				formdata.append("email", this.state.data.email);
				formdata.append("password", this.state.data.password);
				formdata.append("confirm_password", this.state.data.confirm_password);
				formdata.append("roles", this.state.data.roles);
				formdata.append("userName", this.state.data.userName);
				await axios(`${config.API_URL}/signup`, {
					method: "POST",
					headers: {
						"content-type": "multipart/form-data",
					},
					data: formdata,
				})
					.then((response) => {
						if (response.data.success) {
						} else if (response.data.success === false) {
							if (response.data.errors.email) {
								this.setState({
									message: { email: response.data.errors.email.message },
								});
							}
							if (response.data.errors.password)
								this.setState({
									message: { email: response.data.errors.password.message },
								});
						}
					})

					.catch((error) => {
						throw error;
					});
			}
			message = "User has been add successfully";
		}
		this.props.getAllData();
		toast.success(message);
		if (this.state.close) {
			this.setState({
				close: false,
			});
			this.props.onClose();
		}
	};

	render() {
		const { onClose, isAddModalOpen } = this.props;
		const { data, errors, disableButton, imagePreview } = this.state;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<form onSubmit={this.handleSubmit} method='Post'>

					{this.state.edit ? (
						<div>
							
							<Modal.Header closeButton>
								<Modal.Title>User</Modal.Title>
							</Modal.Header>
							<Modal.Body>
							<Row>
								<div className='form-group'>
									<div className='addBtnArea text-center'>
										<img src={imagePreview === "" ? CategoryIcon : imagePreview} alt='' width='150px' height='150px' style={{ borderRadius: "50%" }} />
										{/*<img src={`http://localhost:8000/image/${data.image}`} alt='' width='110px' height='132px' /> */}
										<input
											type='file'
											className='form-control'
											style={{ display: "none" }}
											ref={(fileInput) => (this.fileInput = fileInput)}
											onChange={this.handleImageChange}
										/>
										<button type='button' className='btn btnAdd' onClick={() => this.fileInput.click()}>
											<img src={AddIcon} alt='' />
										</button>
									</div>
								</div>
							</Row>
							{errors.image && (
								<Row className='text-center'>
									<span className='text-danger'>{errors.image}</span>
								</Row>
							)}

							<Row>
								<Col md={6} sm={12}>
									<div className='form-group'>
										<input
											type='text'
											className='form-control'
											placeholder='Enter First Name'
											name='firstName'
											onChange={this.handleOnChange}
											value={data.firstName}
										/>
										{errors.firstName && <span className='text-danger'>{errors.firstName}</span>}
									</div>
								</Col>

								<Col md={6} sm={12}>
									<div className='form-group'>
										<input
											value={data.lastName}
											type='text'
											className='form-control'
											placeholder='Enter Last Name'
											name='lastName'
											onChange={this.handleOnChange}
										/>
										{errors.lastName && <span className='text-danger'>{errors.lastName}</span>}
									</div>
								</Col>
							</Row>
							<Row>
								<Col md={6} sm={12}>
									<div className='form-group'>
										<input
											value={data.email}
											type='email'
											className='form-control'
											placeholder='Enter Email'
											name='email'
											onChange={this.handleOnChange}
										/>
										{errors.email && <span className='text-danger'>{errors.email}</span>}
									</div>
								</Col>
								<Col md={6} sm={12}>
									<div className='form-group'>
										<input type='text' className='form-control' value={data.userName} name='userName' onChange={this.handleOnChange} />
										{errors.userName && <span className='text-danger'>{errors.userName}</span>}
									</div>
								</Col>
							</Row>
							</Modal.Body>
				
						</div>
					) : this.state.view ? (
						<div>
							<Modal.Header closeButton>
								<Row>
							
								 <Col md={6}>
									<a class='user-btn' onClick={() => { this.setState({ showview: true }) }} >User Info</a>
									</Col>
									<Col md={6}>
									<a class='user-btn' onClick={() => { this.setState({ showview: false }) }}>Activity</a>
								</Col>
						    <hr style={{marginTop:"28px"}}/>
						</Row>
						
							</Modal.Header>
							
							
							<Modal.Body>
							{this.state.showview ? this.viewData() : this.getActivity()}
                                </Modal.Body>
						</div>

					) : (
								<div>
									<Modal.Header closeButton>
								<Modal.Title >Add User</Modal.Title>
							</Modal.Header>
									<Modal.Body>
									<Row>
										<div className='form-group'>
											<div className='addBtnArea text-center'>
												<img src={imagePreview === "" ? CategoryIcon : imagePreview} alt='' width='150px' height='150px' style={{ borderRadius: "50%" }} />
												<input
													type='file'
													className='form-control'
													style={{ display: "none" }}
													ref={(fileInput) => (this.fileInput = fileInput)}
													onChange={this.handleImageChange}
												/>
												<button type='button' className='btn btnAdd' onClick={() => this.fileInput.click()}>
													<img src={AddIcon} alt='' />
												</button>
											</div>
										</div>
									</Row>
									{errors.image && (
										<Row className='text-center'>
											<span className='text-danger'>{errors.image}</span>
										</Row>
									)}
									<Row>
										<Col md={6} sm={12}>
											<div className='form-group'>
												<input
													type='text'
													className='form-control'
													placeholder='Enter First Name'
													name='firstName'
													onChange={this.handleOnChange}
												/>
												{errors.firstName && <span className='text-danger'>{errors.firstName}</span>}
											</div>
										</Col>

										<Col md={6} sm={12}>
											<div className='form-group'>
												<input
													type='text'
													className='form-control'
													placeholder='Enter Last Name'
													name='lastName'
													onChange={this.handleOnChange}
												/>
												{errors.lastName && <span className='text-danger'>{errors.lastName}</span>}
											</div>
										</Col>
									</Row>
									<Row>
										<Col md={6} sm={12}>
											<div className='form-group'>
												<input
													type='email'
													className='form-control'
													placeholder='Enter Email'
													name='email'
													onChange={this.handleOnChange}
												/>
												{errors.email && <span className='text-danger'>{errors.email}</span>}
											</div>
										</Col>
										<Col md={6} sm={12}>
											<div className='form-group'>
												<input
													type='text'
													className='form-control'
													placeholder='Enter User Name'
													name='userName'
													onChange={this.handleOnChange}
												/>
												{errors.userName && <span className='text-danger'>{errors.userName}</span>}
											</div>
										</Col>
									</Row>
									<Row>
										<Col md={6} sm={12}>
											<div className='form-group'>
												<input
													type='password'
													className='form-control'
													placeholder='Enter Password'
													name='password'
													onChange={this.handleOnChange}
												/>
												{errors.password && <span className='text-danger'>{errors.password}</span>}
											</div>
										</Col>

										<Col md={6} sm={12}>
											<div className='form-group'>
												<input
													type='password'
													className='form-control'
													placeholder='Confirm Password'
													name='confirm_password'
													onChange={this.handleOnChange}
												/>
												{errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
											</div>
										</Col>
									</Row>
									</Modal.Body>
								</div>
							)}
					<p className='text-danger'>{this.state.message.email}</p>
					
				<Modal.Footer>
					{this.state.view ? (
						""
					) : (
							<Button className='btn-dark' type='submit' size='lg' disabled={disableButton} block>
								Save User
							</Button>
						)}
				</Modal.Footer>
				</form>
			</Modal >
		);
	}
}

export default UserModal;
