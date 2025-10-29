import React, { Component } from "react";
import Form from "../../common/Form";
import { Button, Col, Modal, Row } from "react-bootstrap";
import AddIcon from "../../../assets/img/add.png";
import CategoryIcon from "../../../assets/img/category.png";
import Joi from "joi";

class AtheleteModal extends Form {
	state = {
		data: {
			name: "",
			image: "",
		},
		errors: {},
		disableButton: false,
	};

	schema = Joi.object({
		name: Joi.string().required().label("Name"),
		image: Joi.object().allow(""),
	});

	doSubmit = () => {
		console.log("Form Submitted.");
	};

	render() {
		const { onClose, isAddModalOpen } = this.props;
		const { disableButton, data, errors } = this.state;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<form onSubmit={this.handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Athelete</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<div className='form-group'>
								<div className='addBtnArea text-center'>
									<img src={CategoryIcon} alt='' />
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
						<Row>
							{errors.image && (
								<Row className='text-center'>
									<span className='text-danger'>{errors.image}</span>
								</Row>
							)}
						</Row>

						<div className='form-group'>
							<input type='text' className='form-control' placeholder='Enter Name' onChange={this.handleOnChange} value={data.name} />
							{errors.name && <span className='text-danger'>{errors.name}</span>}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button className='btn-dark' size='lg' type='submit' block>
							Add Athelete
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		);
	}
}

export default AtheleteModal;
