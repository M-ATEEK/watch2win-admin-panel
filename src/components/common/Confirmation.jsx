import React from "react";
import { Button, Modal, Row } from "react-bootstrap";
import trashIcon from "../../assets/img/delIcon.png";

const Confirmation = ({ onClose, onDelete, id }) => {
	return (
		<Modal show={true} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Are you sure to delete?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className='text-center'>
					<img src={trashIcon} />
				</Row>
			</Modal.Body>
			<Modal.Footer style={{ "text-align": "center" }}>
				<Button
					className='btn-dark'
					size='md'
					onClick={() => {
						onDelete(id);
						onClose();
					}}
				>
					Delete
				</Button>
				<Button className='btn-dark' size='md' onClick={onClose}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default Confirmation;
