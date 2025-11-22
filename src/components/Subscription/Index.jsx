import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import Confirmation from "components/common/Confirmation";
import config from "config";
import Auth from "components/Services/Auth";
import SubscriptionModal from "components/Modals/Subscription/Index";
import EditSubsriptionModal from "components/Modals/Subscription/Edit";

class Subscription extends Component {
	state = {
		isAddModalOpen: false,
		isEditModalOpen: false,
		subscriptions: [],
		subscriptionNeedToBeEdit: "",
		selection:""
	};

	handleToggleSubscriptionModal = () => {
		this.setState({
			isAddModalOpen: !this.state.isAddModalOpen,
		});
	};

	handleToggleEditSubscriptionModal = (edit,subscriptionId) => {
		this.setState({
			isEditModalOpen: !this.state.isEditModalOpen,
			subscriptionNeedToBeEdit: subscriptionId,
			selection:edit
		});
	};

	handleAddSubscription = (subscriptionObject) => {
		this.setState({
			subscriptions: [...this.state.subscriptions, subscriptionObject],
			isAddModalOpen: false,
		});
		toast.success("Subscription has been added successfully.");
	};

	handleEditSubscription = (subscriptionObject) => {
		const { subscriptions } = this.state;
		const index = subscriptions.findIndex((subscription, index) => subscription._id === subscriptionObject.id);
		subscriptions[index] = subscriptionObject;
		this.setState({
			subscriptions: [...subscriptions],
			isEditModalOpen: false,
		});
		toast.success("Subscription has been updated successfully.");
	};

	handleDeleteSubscription = (subscriptionId) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return <Confirmation onDelete={this.deleteAction} onClose={onClose} id={subscriptionId} />;
			},
		});
	};

	deleteAction = (subscriptionId) => {
		axios
			.delete(`${config.API_URL}/admin/subscription/${subscriptionId}`, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				if (response.status === 200) {
					const { subscriptions } = this.state;
					const filteredSubscriptions = subscriptions.filter((subscription, index) => subscription._id !== subscriptionId);
					this.setState({
						subscriptions: [...filteredSubscriptions],
					});
					toast.success("Subscription has been deleted successfully.");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	componentDidMount() {
		axios
			.get(`${config.API_URL}/admin/subscription`, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				this.setState({
					subscriptions: [...response.data.data.subscriptions],
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const { isAddModalOpen, isEditModalOpen, subscriptionNeedToBeEdit, subscriptions,selection } = this.state;
		let subscriptionRows = null;

		if (subscriptions.length > 0) {
			subscriptionRows = subscriptions.map((subscription, index) => {
				return (
					<tr key={`subscription-${index}`}>
						<td>{index + 1}</td>
						<td>{subscription.name}</td>
						<td>${subscription.price}</td>
						<td>{subscription.details}</td>
						<td>
							<Dropdown>
								<Dropdown.Toggle variant='success' id='dropdown-basic'></Dropdown.Toggle>

								<Dropdown.Menu>
									<li className='dropdown-item'>
										<a onClick={() => this.handleToggleEditSubscriptionModal('view',subscription._id)}>View</a>
									</li>
									<li className='dropdown-item'>
										<a onClick={() => this.handleToggleEditSubscriptionModal('edit',subscription._id)}>Edit</a>
									</li>
									<li className='dropdown-item'>
										<a onClick={() => this.handleDeleteSubscription(subscription._id)}>Delete</a>
									</li>
								</Dropdown.Menu>
							</Dropdown>
						</td>
					</tr>
				);
			});
		}

		return (
			<Grid fluid>
				<Row>
					<Col md={12} style={{ margin: "10px 0 10px 0" }}>
						<Button className='btn-dark pull-right m-2' onClick={this.handleToggleSubscriptionModal}>
							Add Subscription
						</Button>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Card
							content={
								<Table striped hover>
									<thead>
										<tr>
											<th>Id</th>
											<th>Name</th>
											<th>Price</th>
											<th>Description</th>
											<th>Action</th>
										</tr>
									</thead>

									<tbody>{subscriptionRows}</tbody>
								</Table>
							}
						/>
					</Col>
				</Row>

				{isAddModalOpen ? (
					<SubscriptionModal
						onClose={this.handleToggleSubscriptionModal}
						isAddModalOpen={isAddModalOpen}
						handleAddSubscription={this.handleAddSubscription}
					/>
				) : (
					""
				)}

				{isEditModalOpen ? (
					<EditSubsriptionModal
						onClose={this.handleToggleEditSubscriptionModal}
						selection={this.state.selection}
						isEditModalOpen={isEditModalOpen}
						handleEditSubscription={this.handleEditSubscription}
						subcriptionNeedToBeEdit={subscriptionNeedToBeEdit}
					/>
				) : (
					""
				)}
			</Grid>
		);
	}
}

export default Subscription;
