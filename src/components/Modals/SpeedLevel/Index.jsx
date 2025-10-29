import React, { Component } from "react";
import { Button, Col, Modal } from "react-bootstrap";

class SpeedLevelModal extends Component {
	state = {};
	render() {
		const { onClose, isAddModalOpen } = this.props;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title>Speed Level</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Col md={12}>
						<div className='form-group'>
							<input type='text' className='form-control' placeholder='Enter Name' />
						</div>
					</Col>

					<Col md={4}>
						<div className='form-group'>
							<input type='number' className='form-control' placeholder='10' />
						</div>
					</Col>

					<Col md={4}>
						<p className='speed-level-note'>times watch will give</p>
					</Col>

					<Col md={4}>
						<div className='form-group'>
							<input type='number' className='form-control' placeholder='10 points' />
						</div>
					</Col>
				</Modal.Body>
				<Modal.Footer>
					<Button className='btn-dark' size='lg' block>
						Add Speed Level
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default SpeedLevelModal;
