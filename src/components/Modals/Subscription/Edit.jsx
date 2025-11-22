import React, { Component } from "react";
import Form from "../../common/Form";
import Joi from "joi";
import { Button, Modal } from "react-bootstrap";
import Axios from "axios";
import config from "config";
import Auth from "components/Services/Auth";

class EditSubsriptionModal extends Form {
	state = {
		data: {
			name: "",
		},
		errors: {},
		disableButton: false,
	};

	schema = Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required().label("Name"),
		price: Joi.string().required().label("Price"),
		details: Joi.string().required().label("Description"),
	});

	componentDidMount() {
		const subscriptionId = this.props.subcriptionNeedToBeEdit;
		const url = `${config.API_URL}/admin/subscription/${subscriptionId}`;
		Axios.get(url, {
			headers: {
				Authorization: Auth.getToken(),
			},
		})
			.then((response) => {
				if (response.status === 200) {
					this.setState({
						data: {
							id: response.data.data.subscriptions._id,
							name: response.data.data.subscriptions.name,
							price: response.data.data.subscriptions.price,
							details: response.data.data.subscriptions.details,
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
		const url = `${config.API_URL}/admin/subscription/${data.id}`;
		Axios.post(url, data, {
			headers: {
				Authorization: Auth.getToken(),
			},
		})
			.then((response) => {
				if (response.status === 200) {
					this.props.handleEditSubscription(data);
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
						<Modal.Title>Subscription</Modal.Title>
					</Modal.Header>
					{this.props.selection=='edit' ? 
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
							name='price'
							placeholder='Enter Price'
							onChange={this.handleOnChange}
							value={data.price}
						/>
						{errors.price && <span className='text-danger'>{errors.price}</span>}
					</div>

					<div className='form-group'>
						<textarea
							placeholder='Description'
							name='details'
							onChange={this.handleOnChange}
							className='form-control'
							value={data.details}
						></textarea>
						{errors.details && <span className='text-danger'>{errors.details}</span>}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className='btn-dark' size='lg' type='submit' block>
						Edit Subscription
					</Button>
				</Modal.Footer>
					</div>
					:
					<Modal.Body>
						<div className='form-group'>
							<input type='text' className='form-control' name='name' placeholder='Enter Name' onChange={this.handleOnChange} value={data.name} disabled />
							{errors.name && <span className='text-danger'>{errors.name}</span>}
						</div>

						<div className='form-group'>
							<input
								type='number'
								className='form-control'
								name='price'
								placeholder='Enter Price'
								onChange={this.handleOnChange}
								value={data.price}
								disabled
							/>
							{errors.price && <span className='text-danger'>{errors.price}</span>}
						</div>

						<div className='form-group'>
							<textarea
								placeholder='Description'
								name='details'
								onChange={this.handleOnChange}
								className='form-control'
								value={data.details}
								disabled
							></textarea>
							{errors.details && <span className='text-danger'>{errors.details}</span>}
						</div>
					</Modal.Body>
					}
					
				</form>
			</Modal>
		);
	}
}

export default EditSubsriptionModal;
