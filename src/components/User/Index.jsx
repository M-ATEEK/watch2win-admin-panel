import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import avatar from "../../assets/img/default-avatar.png";
import UserModal from "../Modals/User/Index";
import config from "../../config";
import axios from "axios";
import { Redirect } from "react-router";
import Pagination from "react-js-pagination";
import EPagination from "components/common/EPagination";
import Axios from "axios";
import { getTokenSourceMapRange } from "typescript";
import Auth from "components/Services/Auth";
import { confirmAlert } from "react-confirm-alert";
import Confirmation from "components/common/Confirmation";
import { toast } from "react-toastify";

class Users extends Component {
	state = {
		isAddModalOpen: false,
		data: [],
		selection: "",
		id: "",
		activePage: 1,
		totalItems: "",
		showSearch: false,
		showSearchButton: true,
	};
	handlePageChange = (pageNumber) => {
		const token = localStorage.getItem("token");
		axios
			.get(`${config.API_URL}/admin/users/?page=${pageNumber}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log(response.data.count);
				this.setState({
					activePage: pageNumber,
					data: response.data.data.user,
				});
			});
	};
	handleToggleAddUserModal = (edit, id) => {
		this.setState({
			isAddModalOpen: !this.state.isAddModalOpen,
			selection: edit,
			id: id,
		});
	};

	handleDelete = (id) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return <Confirmation onDelete={this.deleteAction} onClose={onClose} id={id} />;
			},
		});
	};

	deleteAction = (id) => {
		const token = localStorage.getItem("token");
		axios
			.delete(`${config.API_URL}/admin/users/${id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				const newdata = this.state.data.filter((i) => {
					return i._id !== id;
				});
				toast.success("User has been deleted successfully.");
				this.setState({
					data: newdata,
					totalItems: response.data.data.count,
				});
			});
	};
	getAllData = () => {
		const token = localStorage.getItem("token");
		axios
			.get(`${config.API_URL}/admin/users`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				this.setState({
					totalItems: response.data.count,
				});
			});
		this.handlePageChange(this.state.activePage);
	};
	componentDidMount() {
		this.getAllData();
	}

	toggleSearch = () => {
		const { showSearch, showSearchButton } = this.state;
		this.setState({
			showSearch: !showSearch,
			showSearchButton: !showSearchButton,
		});
	};

	handleSearch = (e) => {
		let search = e.currentTarget.value;
		axios
			.get(`${config.API_URL}/admin/users/?search=${search}`, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				this.setState({
					data: response.data.data.user,
				});
			});
	};

	render() {
		const token = localStorage.getItem("token");
		if (!token) {
			return <Redirect to='/login' />;
		}
		const data = this.state.data;
		const { isAddModalOpen, showSearch, showSearchButton } = this.state;
		const showSearchClass = showSearch ? "block" : "none";
		const showSearchButtonClass = showSearchButton ? "block" : "none";

		return (
			<Grid fluid>
				<Row style={{ margin: "10px 0 10px 0" }}>
					<Col md={8}>
						<input  onClick={this.toggleSearch} className='search-bar' placeholder='Search...' style={{ display: showSearchClass }} onChange={this.handleSearch} />
					</Col>

					<Col md={2} style={{ padding: 0 }}>
						<Button className='search-btn' style={{ display: showSearchButtonClass}}  onClick={this.toggleSearch}>
							<i className='pe-7s-search'></i>
						</Button>
					</Col>

					<Col md={2}>
						<Button className='btn-dark pull-right m-2' onClick={() => this.handleToggleAddUserModal("add")}>
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
														{user.image === undefined ? (
															<Image src={avatar} style={{ width: "50px",borderRadius:"50%" }} roundedCircle />
														) : (
															<Image src={`http://localhost:8000/image/${user.image}`} style={{ width: "50px",borderRadius:"50%" }} roundedCircle />
														)}
													</td>
													<td>
														{user.firstName}
														{user.lastName}
													</td>
													<td>{user.userName}</td>
													<td>{user.email}</td>
													<td>
														<Dropdown>
															<Dropdown.Toggle variant='success' id='dropdown-basic'></Dropdown.Toggle>

															<Dropdown.Menu>
																<li className='dropdown-item'>
																	<a onClick={() => this.handleToggleAddUserModal("view", user._id)}>View</a>
																</li>
																<li className='dropdown-item'>
																	<a onClick={() => this.handleToggleAddUserModal("edit", user._id)}>Edit</a>
																</li>
																<li className='dropdown-item'>
																	<a onClick={() => this.handleDelete(user._id)}>Delete</a>
																</li>
															</Dropdown.Menu>
														</Dropdown>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={12} style={{ textAlign: "center" }}>
						<EPagination
							activePage={this.state.activePage}
							itemsCountPerPage={10}
							totalItemsCount={this.state.totalItems}
							pageRangeDisplayed={5}
							handlePageChange={this.handlePageChange.bind(this)}
							items={this.state.data}
						/>
					</Col>
				</Row>
				{isAddModalOpen ? (
					<UserModal
						getAllData={this.getAllData}
						selection={this.state.selection}
						id={this.state.id}
						onClose={this.handleToggleAddUserModal}
						isAddModalOpen={isAddModalOpen}
					/>
				) : (
					""
				)}
			</Grid>
		);
	}
}

export default Users;
