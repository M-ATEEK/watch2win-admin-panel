import React, { Component } from "react";
import Form from "../../common/Form";
import { Button, Col, Modal } from "react-bootstrap";
import Joi from "joi";

class SpeedLevelModal extends Form {
	state = {
		data: {
			name: "",
			time: "",
			points: "",
		},
		errors: {},
		disableButton: false,
	};

	schema = Joi.object({
		name: Joi.string().required().label("Name"),
		time: Joi.string().required().label("Time"),
		points: Joi.string().required().label("Points"),
	});

	render() {
		const { onClose, isAddModalOpen } = this.props;
		const { data, disableButton, errors } = this.state;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<form onSubmit={this.handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Speed Level</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Col md={12}>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Enter Name'
									name='name'
									onChange={this.handleOnChange}
									value={data.name}
								/>
								{errors.name && <span className='text-danger'>{errors.name}</span>}
							</div>
						</Col>

						<Col md={4}>
							<div className='form-group'>
								<input type='number' className='form-control' placeholder='10' name='time' onChange={this.handleOnChange} value={data.time} />
								{errors.time && <span className='text-danger'>{errors.time}</span>}
							</div>
						</Col>

						<Col md={4}>
							<p className='speed-level-note'>times watch will give</p>
						</Col>

						<Col md={4}>
							<div className='form-group'>
								<input
									type='number'
									className='form-control'
									placeholder='10 points'
									name='points'
									onChange={this.handleOnChange}
									value={data.points}
								/>
								{errors.points && <span className='text-danger'>{errors.points}</span>}
							</div>
						</Col>
					</Modal.Body>
					<Modal.Footer>
						<Button className='btn-dark' size='lg' type='submit' disabled={disableButton} block>
							Add Speed Level
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		);
	}
}

export default SpeedLevelModal;
