import React, { Component } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import uploadIcon from "../../../assets/img/uploadImg.png";
import videoIcon from "../../../assets/img/uploadVid.png";

class DrillModal extends Component {
	state = {};
	render() {
		const { onClose, isAddModalOpen } = this.props;
		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title>Drill</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<div className='col-md-6 col-sm-6 col-xs-12 text-center'>
							<div className='form-group'>
								<img src={uploadIcon} alt='' width='100%' />
								<a href='#' className='btn btnUpload'>
									Upload Thumbnail
								</a>
							</div>
						</div>
						<div className='col-md-6 col-sm-6 col-xs-12 text-center'>
							<div className='form-group'>
								<img src={videoIcon} alt='' width='100%' />
								<a href='#' className='btn btnUpload'>
									Upload Video
								</a>
							</div>
						</div>
					</Row>

					<Row>
						<Col md={8} mdOffset={2}>
							<Row>
								<div className='col-md-6 col-sm-6 col-xs-12'>
									<div className='form-group'>
										<input type='text' placeholder='Enter Drill Name' className='form-control' />
									</div>
								</div>
								<div className='col-md-6 col-sm-6 col-xs-12'>
									<div className='form-group'>
										<select className='form-control'>
											<option value='Select Ethlete'>Select Ethlete</option>
										</select>
									</div>
								</div>
							</Row>
							<Row>
								<div className='col-md-6 col-sm-6 col-xs-12'>
									<div className='form-group'>
										<select className='form-control'>
											<option value='Select Catagory'>Select Catagory</option>
										</select>
									</div>
								</div>
								<div className='col-md-6 col-sm-6 col-xs-12'>
									<div className='form-group'>
										<select className='form-control'>
											<option value='Select Speed Level'>Select Speed Level</option>
										</select>
									</div>
								</div>
							</Row>
							<Row>
								<div className='col-md-12'>
									<div className='form-group'>
										<textarea rows='3' className='form-control' placeholder='Enter Video Description (Optional)'></textarea>
									</div>
								</div>
							</Row>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button className='btn-dark' size='lg' block>
						Add Drill
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DrillModal;
