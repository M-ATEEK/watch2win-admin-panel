import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import avatar from "../../assets/img/default-avatar.png";
import UserModal from "../Modals/User/Index";
import config from "../../config";
import axios from "axios";

class Users extends Component {
	state = {
		isAddModalOpen: false,
		data: []

	};

	handleToggleAddUserModal = () => {
		this.setState({
			isAddModalOpen: !this.state.isAddModalOpen,
		});
	};
	componentDidMount() {
		const token = localStorage.getItem('token');
		axios.get(`${config.URL}/admin/users`, {
			headers: {
				'Authorization': token
			}
		})
			.then((response) => {
				this.setState({
					data: response.data.data.user
				})
			});
	}
	render() {
		const data = this.state.data
		console.log(data)
		const { isAddModalOpen } = this.state;
		return (
			<Grid fluid>
				<Row>
					<Col md={12} style={{ margin: "10px 0 10px 0" }}>
						<Button className='btn-dark pull-right m-2' onClick={this.handleToggleAddUserModal}>
							Add User
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
											<th>Profile</th>
											<th>Name</th>
											<th>Unique Name</th>
											<th>Email</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{data.map((user, i) => {
											return (
												<tr>
													<td>{i + 1}</td>
													<td>
														<Image src={avatar} style={{ width: "50px" }} roundedCircle />
													</td>
													<td>{user.firstName}{user.lastName}</td>
													<td>{user.userName}</td>
													<td>{user.email}</td>
													<td>
														<Dropdown>
															<Dropdown.Toggle variant='success' id='dropdown-basic'></Dropdown.Toggle>

															<Dropdown.Menu>
																<li className='dropdown-item'>
																	<a href=''>View</a>
																</li>
																<li className='dropdown-item'>
																	<a href=''>Edit</a>
																</li>
																<li className='dropdown-item'>
																	<a href=''>Delete</a>
																</li>
															</Dropdown.Menu>
														</Dropdown>
													</td>
												</tr>
											)
										})}

									</tbody>
								</Table>
							}
						/>
					</Col>
				</Row>

				{isAddModalOpen ? <UserModal onClose={this.handleToggleAddUserModal} isAddModalOpen={isAddModalOpen} /> : ""}
			</Grid>
		);
	}
}

export default Users;
