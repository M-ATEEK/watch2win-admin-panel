import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import SpeedLevelModal from "components/Modals/SpeedLevel/Index";

class SpeedLevel extends Component {
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
						<Button className='btn-dark pull-right m-2' onClick={this.handleToggleSpeedLevelModal}>
							Add Speed Level
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
											<th>Point</th>
											<th>Condition</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>Normal</td>
											<td>10</td>
											<td>This is the condition for normal speed</td>
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

				{isAddModalOpen ? <SpeedLevelModal onClose={this.handleToggleSpeedLevelModal} isAddModalOpen={isAddModalOpen} /> : ""}
			</Grid>
		);
	}
}

export default SpeedLevel;
