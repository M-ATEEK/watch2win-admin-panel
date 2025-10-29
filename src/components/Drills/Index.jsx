import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import avatar from "../../assets/img/default-avatar.png";
import DrillModal from "components/Modals/Drill/Index";

class Drill extends Component {
	state = {
		isAddModalOpen: false,
	};

	handleToggleSpeedLevelModal = () => {
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
						<Button className='btn-primary pull-right m-2' onClick={this.handleToggleSpeedLevelModal}>
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
											<th>Drill Thumbnail</th>
											<th>Name</th>
											<th>Athelete Name</th>
											<th>Category Name</th>
											<th>Speed Level</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>
												<Image src={avatar} style={{ width: "50px" }} roundedCircle />
											</td>
											<td>test drill</td>
											<td>test athelete</td>
											<td>test category</td>
											<td>test speed level</td>
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

				{isAddModalOpen ? <DrillModal onClose={this.handleToggleSpeedLevelModal} isAddModalOpen={isAddModalOpen} /> : ""}
			</Grid>
		);
	}
}

export default Drill;
