import React, { Component } from "react";
import Form from "../../common/Form";
import { Button, Modal } from "react-bootstrap";
import Joi from "joi";
import Axios from "axios";
import Auth from "../../Services/Auth";
import config from "config";

class SubscriptionModal extends Form {
	state = {
		data: {
			name: "",
			price: "",
			details: "",
		},
		errors: {},
		disableButton: false,
	};

	schema = Joi.object({
		name: Joi.string().required().label("Name"),
		price: Joi.string().required().label("Price"),
		details: Joi.string().required().label("Description"),
	});

	doSubmit = () => {
		const { data } = this.state;
		const url = `${config.API_URL}/admin/subscription`;
		Axios.post(url, data, {
			headers: {
				Authorization: Auth.getToken(),
			},
		})
			.then((response) => {
				if (response.status === 200) {
					this.props.handleAddSubscription(response.data.data.subscriptions);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		const { onClose, isAddModalOpen } = this.props;
		const { data, errors, disableButton } = this.state;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<form onSubmit={this.handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Subscription</Modal.Title>
					</Modal.Header>
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
							<textarea placeholder='Description' name='details' onChange={this.handleOnChange} className='form-control'></textarea>
							{errors.details && <span className='text-danger'>{errors.details}</span>}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button className='btn-dark' size='lg' type='submit' block>
							Add Subscription
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		);
	}
}

export default SubscriptionModal;
