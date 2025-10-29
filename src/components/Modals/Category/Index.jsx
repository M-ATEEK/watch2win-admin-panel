import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import AddIcon from "../../../assets/img/add.png";
import CategoryIcon from "../../../assets/img/category.png";

class CategoryModal extends Component {
	state = {};

	render() {
		const { onClose, isAddModalOpen } = this.props;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title>Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='form-group'>
						<div className='addBtnArea text-center'>
							<img src={CategoryIcon} alt='' />
							<button type='button' className='btn btnAdd'>
								<img src={AddIcon} alt='' />
							</button>
						</div>
					</div>
					<div className='form-group'>
						<input type='text' className='form-control' placeholder='Enter Name' />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className='btn-dark' size='lg' block>
						Add Category
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default CategoryModal;
