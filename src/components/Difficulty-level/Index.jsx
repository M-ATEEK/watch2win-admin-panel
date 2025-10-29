import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import DifficultyLevelModal from "components/Modals/DifficultyLevel/Index";

class DifficultyLevel extends Component {
	state = {
		isAddModalOpen: false,
	};

	handleToggleDifficultyLevelModal = () => {
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
						<Button className='btn-dark pull-right m-2' onClick={this.handleToggleDifficultyLevelModal}>
							Add Difficulty Level
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
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>Level 1</td>
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

				{isAddModalOpen ? <DifficultyLevelModal onClose={this.handleToggleDifficultyLevelModal} isAddModalOpen={isAddModalOpen} /> : ""}
			</Grid>
		);
	}
}

export default DifficultyLevel;
