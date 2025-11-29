import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import avatar from "../../assets/img/default-avatar.png";
import DrillModal from "components/Modals/Drill/Index";
import axios from "axios";
import config from "../../config";
import { Redirect } from "react-router";
import Pagination from "react-js-pagination";
import EditDrillModal from "components/Modals/Drill/Edit";
import EPagination from "components/common/EPagination";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Confirmation from "components/common/Confirmation";
import Auth from "components/Services/Auth";
import { toast } from "react-toastify";

class Drill extends Component {
	state = {
		isAddModalOpen: false,
		isEditModalOpen: false,
		drillNeedToBeEdit: "",
		data: [],
		selection: "",
		id: "",
		activePage: 1,
		totalItems: "",
		selection: ""
	};

	handleToggleDrillModal = () => {
		this.setState({
			isAddModalOpen: !this.state.isAddModalOpen,
		});
	};

	handleToggleEditDrillModal = (edit, drillId) => {
		this.setState({
			isEditModalOpen: !this.state.isEditModalOpen,
			drillNeedToBeEdit: drillId,
			selection: edit
		});
	};

	handlePageChange = (pageNumber) => {
		const token = localStorage.getItem("token");
		axios
			.get(`${config.API_URL}/admin/drills/?page=${pageNumber}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log(response.data.count);
				this.setState({
					activePage: pageNumber,
					data: response.data.data.drills,
				});
			});
	};
	getAllData = () => {
		const token = localStorage.getItem("token");
		axios
			.get(`${config.API_URL}/admin/drills`, {
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
		const token = localStorage.getItem("token");
		axios
			.get(`${config.API_URL}/admin/drills`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				this.setState({
					totalItems: response.data.count,
				});
			});
		this.handlePageChange(1);
	}

	handleDeleteDrill = (drillId) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return <Confirmation onDelete={this.deleteAction} onClose={onClose} id={drillId} />;
			},
		});
	};

	deleteAction = (id) => {
		axios
			.delete(`${config.API_URL}/admin/drills/${id}`, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				const newdata = this.state.data.filter((i) => {
					return i._id !== id;
				});
				this.setState({
					data: newdata,
					totalItems: response.data.data.count,
				});
				toast.success("Drill has been deleted successfully.");
			})
			.catch((error) => console.log(error));
	};

	handleAddDrill = () => {
		this.setState({
			isAddModalOpen: false,
		});
		this.getAllData();
	};

	handleEditDrill = () => {
		this.setState({
			isEditModalOpen: false,
		});
		this.getAllData();
	};

	render() {
		const { isAddModalOpen, data, isEditModalOpen, drillNeedToBeEdit } = this.state; 
		return (
			<Grid fluid>
				<Row>
					<Col md={12} style={{ margin: "10px 0 10px 0" }}>
						<Button className='btn-dark pull-right m-2' onClick={this.handleToggleDrillModal}>
							Add Drill
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
											<th>Athelete Name</th>
											<th>Category Name</th>
											<th>Difficulty Level</th>
											<th>Total Videos</th>
											<th>Thumbnail</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{data.map((drills, i) => {
											return (
												<tr key={i}>
													<td>{i + 1}</td>
													<td>
														<Link to={`drills/videos/${drills._id}`}>{drills.name}</Link>
													</td>
													<td>{drills.athlete.name}</td>
													<td>{drills.category.name}</td>
													<td>{drills.difficultyLevel.name}</td>
													<td>{drills.videos.length}</td>
													<td>
													<Link to={`drills/videos/${drills._id}`}><img src={`${config.IMG_URL}/image/drills/${drills.thumbnail}`} width='150px' heigth='150px' /></Link>
													</td>
													<td>
														<Dropdown>
															<Dropdown.Toggle variant='success' id='dropdown-basic'></Dropdown.Toggle>

															<Dropdown.Menu>
																<li className='dropdown-item'>
																	<a onClick={() => this.handleToggleEditDrillModal("view", drills._id)}>View</a>
																</li>
																<li className='dropdown-item'>
																	<a onClick={() => this.handleToggleEditDrillModal('edit', drills._id)}>Edit</a>
																</li>
																<li>
																	<Link to={`drills/videos/${drills._id}`}>Add Videos</Link>
																</li>
																<li className='dropdown-item'>
																	<a onClick={() => this.handleDeleteDrill(drills._id)}>Delete</a>
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
					<DrillModal onClose={this.handleToggleDrillModal} isAddModalOpen={isAddModalOpen} handleAddDrill={this.handleAddDrill} />
				) : (
					""
				)}

				{isEditModalOpen ? (
					<EditDrillModal
						isEditModalOpen={isEditModalOpen}
						selection={this.state.selection}
						onClose={this.handleToggleEditDrillModal}
						drillNeedToBeEdit={drillNeedToBeEdit}
						handleEditDrill={this.handleEditDrill}
					/>
				) : (
					""
				)}
			</Grid>
		);
	}
}

export default Drill;
