import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import CategoryModal from "components/Modals/Category/Index";
import avatar from "../../assets/img/default-avatar.png";

class Category extends Component {
	state = {
		isAddModalOpen: false,
	};

	handleToggleCategoryModal = () => {
		this.setState({
			isAddModalOpen: !this.state.isAddModalOpen,
		});
	};

	render() {
		const { isAddModalOpen } = this.state;
		return (
			<Grid fluid>
				<Row>
					<Col md={12} style={{ margin: "10px 0 10px 0" }}>
						<Button className='btn-dark pull-right m-2' onClick={this.handleToggleCategoryModal}>
							Add Category
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
											<th>Image</th>
											<th>Name</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>
												<Image src={avatar} style={{ width: "50px" }} roundedCircle />
											</td>
											<td>Test Catgory</td>
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
									</tbody>
								</Table>
							}
						/>
					</Col>
				</Row>

				{isAddModalOpen ? <CategoryModal onClose={this.handleToggleCategoryModal} isAddModalOpen={isAddModalOpen} /> : ""}
			</Grid>
		);
	}
}

export default Category;
