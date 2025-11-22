import React, { Component } from "react";
import Form from "../../common/Form";
import Joi from "joi";
import { Button, Modal } from "react-bootstrap";
import Axios from "axios";
import Auth from "components/Services/Auth";

class EditDifficultyLevelModal extends Form {
	state = {
		data: {
			name: "",
			points: "",
		},
		errors: {},
		disableButton: false,
	};

	schema = Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required().label("Name"),
		points: Joi.string().required().label("Points"),
	});

	componentDidMount() {
		const difficultyId = this.props.difficultyNeedToBeEdit;
		const url = `http://127.0.0.1:8000/api/v1/admin/difficulty/${difficultyId}`;
		Axios.get(url, {
			headers: {
				Authorization: Auth.getToken(),
			},
		})
			.then((response) => {
				if (response.status === 200) {
					this.setState({
						data: {
							id: response.data.data.difficulty._id,
							name: response.data.data.difficulty.name,
							points: response.data.data.difficulty.points.toString(),
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
		const url = `http://127.0.0.1:8000/api/v1/admin/difficulty/${data.id}`;
		Axios.post(url, data, {
			headers: {
				Authorization: Auth.getToken(),
			},
		})
			.then((response) => {
				if (response.status === 200) {
					this.props.handleEditDifficultyLevel(data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		const { onClose, isEditModalOpen } = this.props;
		const { data, errors, disableButton } = this.state;
		return (
			<Modal show={isEditModalOpen} onHide={onClose}>
				<form onSubmit={this.handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Difficulty Level</Modal.Title>
					</Modal.Header>
					{this.props.selection==="edit" ?
					<div>
						<Modal.Body>
						<div className='form-group'>
							<input type='text' className='form-control' name='name' placeholder='Enter Name' onChange={this.handleOnChange} value={data.name} />
							{errors.name && <span className='text-danger'>{errors.name}</span>}
						</div>
						<div className='form-group'>
							<input
								type='number'
								className='form-control'
								name='points'
								placeholder='Enter Points'
								onChange={this.handleOnChange}
								value={data.points}
							/>
							{errors.points && <span className='text-danger'>{errors.points}</span>}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button className='btn-dark' size='lg' type='submit' block>
							Edit Difficulty Level
						</Button>
					</Modal.Footer> </div> 
					:
					<div>
						<Modal.Body>
						<div className='form-group'>
							<input type='text' className='form-control' name='name' placeholder='Enter Name' onChange={this.handleOnChange} value={data.name} disabled />
							{errors.name && <span className='text-danger'>{errors.name}</span>}
						</div>
						<div className='form-group'>
							<input
								type='number'
								className='form-control'
								name='points'
								placeholder='Enter Points'
								onChange={this.handleOnChange}
								value={data.points}
								disabled
							/>
							{errors.points && <span className='text-danger'>{errors.points}</span>}
						</div>
					</Modal.Body>
					<Modal.Footer>
						
					</Modal.Footer> </div> }
					
				</form>
			</Modal>
		);
	}
}

export default EditDifficultyLevelModal;
