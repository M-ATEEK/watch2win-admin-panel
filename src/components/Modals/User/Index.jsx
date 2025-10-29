import React, { Component } from "react";
import Form from "../../common/Form";
import Joi from "joi";
import { Button, Col, Modal, Row } from "react-bootstrap";
import AddIcon from "../../../assets/img/add.png";
import CategoryIcon from "../../../assets/img/category.png";

class UserModal extends Form {
	state = {
		data: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
			image: "",
		},
		errors: {},
		imagePreview: "",
		disableButton: false,
	};

	schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label("Email"),
		phone: Joi.string().allow("").label("Phone"),
		password: Joi.string().required().min(6).label("Password"),
		confirmPassword: Joi.any().valid(Joi.ref("password")).label("Confirm Password"),
		image: Joi.object().allow(""),
	});

	doSubmit = (e) => {
		//submit form
		console.log("form submitted");
	};

	render() {
		const { onClose, isAddModalOpen } = this.props;
		const { data, errors, disableButton, imagePreview } = this.state;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<form onSubmit={this.handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>User</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<div className='form-group'>
								<div className='addBtnArea text-center'>
									<img src={imagePreview === "" ? CategoryIcon : imagePreview} alt='' width='110px' height='132px' />
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
									<input type='text' className='form-control' placeholder='Enter Last Name' name='lastName' onChange={this.handleOnChange} />
									{errors.lastName && <span className='text-danger'>{errors.lastName}</span>}
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={6} sm={12}>
								<div className='form-group'>
									<input type='email' className='form-control' placeholder='Enter Email' name='email' onChange={this.handleOnChange} />
									{errors.email && <span className='text-danger'>{errors.email}</span>}
								</div>
							</Col>

							<Col md={6} sm={12}>
								<div className='form-group'>
									<input type='phone' className='form-control' placeholder='Enter Phone no' name='phone' onChange={this.handleOnChange} />
									{errors.phone && <span className='text-danger'>{errors.phone}</span>}
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
										name='confirmPassword'
										onChange={this.handleOnChange}
									/>
									{errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
								</div>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button className='btn-dark' type='submit' size='lg' disabled={disableButton} block>
							Add User
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		);
	}
}

export default UserModal;
