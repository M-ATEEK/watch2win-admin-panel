import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class DifficultyLevelModal extends Component {
	state = {};
	render() {
		const { onClose, isAddModalOpen } = this.props;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title>Difficulty Level</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='form-group'>
						<input type='text' className='form-control' placeholder='Enter Name' />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className='btn-dark' size='lg' block>
						Add Difficulty Level
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DifficultyLevelModal;
