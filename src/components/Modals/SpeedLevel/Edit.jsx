import React, { Component } from "react";
import Form from "../../common/Form";
import { Button, Col, Modal } from "react-bootstrap";
import Joi from "joi";
import Axios from "axios";
import Auth from "components/Services/Auth";


class EditSpeedLevelModal extends Form {
	state = {
		data: {
			name: "",
			condition: "",
			points: "",
		},
		errors: {},
		disableButton: false,
	};

	schema = Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required().label("Name"),
		condition: Joi.string().required().label("Time"),
		points: Joi.string().required().label("Points"),
	});

	componentDidMount() {
		const speedLevel = this.props.speedLevelNeedToBeEdit;
		const url = `http://127.0.0.1:8000/api/v1/admin/speed/${speedLevel}`;
		Axios.get(url, {
			headers: {
				Authorization:
				Auth.getToken()			},
		})
			.then((response) => {
				if (response.status === 200) {
					this.setState({
						data: {
							id: response.data.data.speedLevel._id,
							name: response.data.data.speedLevel.name,
							condition: response.data.data.speedLevel.condition,
							points: response.data.data.speedLevel.points.toString(),
						},
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	doSubmit = () => {
		const { data } = this.state;
		const url = `http://127.0.0.1:8000/api/v1/admin/speed/${data.id}`;
		Axios.post(url, data, {
			headers: {
				Authorization:
				Auth.getToken()			},
		})
			.then((response) => {
				if (response.status === 200) {
					this.props.handleEditSpeedLevel(data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		const { onClose, isEditModalOpen } = this.props;
		const { data, disableButton, errors } = this.state;
		return (
			<Modal show={isEditModalOpen} onHide={onClose}>
				<form onSubmit={this.handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Speed Level</Modal.Title>
					</Modal.Header>
					{this.props.selection==="edit" ?
					<div>
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
								<input
									type='number'
									className='form-control'
									placeholder='10'
									name='condition'
									onChange={this.handleOnChange}
									value={data.condition}
								/>
								{errors.condition && <span className='text-danger'>{errors.condition}</span>}
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
							Edit Speed Level
						</Button>
					</Modal.Footer>
					</div> 
					:
					<div>
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
									disabled
								/>
								{errors.name && <span className='text-danger'>{errors.name}</span>}
							</div>
						</Col>

						<Col md={4}>
							<div className='form-group'>
								<input
									type='number'
									className='form-control'
									placeholder='10'
									name='condition'
									onChange={this.handleOnChange}
									value={data.condition}
									disabled
								/>
								{errors.condition && <span className='text-danger'>{errors.condition}</span>}
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
									disabled
								/>
								{errors.points && <span className='text-danger'>{errors.points}</span>}
							</div>
						</Col>
					</Modal.Body>
					<Modal.Footer>
					</Modal.Footer>
					</div>
					}
					
				</form>
			</Modal>
		);
	}
}

export default EditSpeedLevelModal;
