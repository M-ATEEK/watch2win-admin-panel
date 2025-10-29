import React, { Component } from "react";
import Form from "../../common/Form";
import Joi from "joi";
import { Button, Modal } from "react-bootstrap";

class DifficultyLevelModal extends Form {
	state = {
		data: {
			name: "",
		},
		errors: {},
		disableButton: false,
	};

	schema = Joi.object({
		name: Joi.string().required().label("Name"),
	});

	doSubmit = () => {
		console.log("Submitted");
	};

	render() {
		const { onClose, isAddModalOpen } = this.props;
		const { data, errors, disableButton } = this.state;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<form onSubmit={this.handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Difficulty Level</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className='form-group'>
							<input type='text' className='form-control' placeholder='Enter Name' onChange={this.handleSubmit} value={data.name} />
							{errors.name && <span className='text-danger'>{errors.name}</span>}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button className='btn-dark' size='lg' type='submit' block>
							Add Difficulty Level
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		);
	}
}

export default DifficultyLevelModal;
