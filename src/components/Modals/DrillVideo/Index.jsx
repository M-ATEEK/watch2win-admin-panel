import React, { Component } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Form from "../../common/Form";
import uploadIcon from "../../../assets/img/uploadImg.png";
import videoIcon from "../../../assets/img/uploadVid.png";
import Joi from "joi";
import config from "config";
import Axios from "axios";
import Auth from "components/Services/Auth";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

class DrillVideoModal extends Form {
	state = {
		data: {
			thumbnail: "",
			video: "",
			speedLevel: "",
			isPremium: false,
			duration:""
		},
		videoPreview: null,
		thumbnailPreview: null,
		speedLevels: [],
		errors: {},
	};

	schema = Joi.object({
		thumbnail: Joi.object().required().label("Thumbnail"),
		video: Joi.object().required().label("Video"),
		speedLevel: Joi.string().required().label("Speed level"),
		isPremium: Joi.string().required().label("Premium"),
		duration: Joi.string().required().label("Duration"),
	});

	handleImageChange = (e) => {
		if (
			e.target.files[0].name
				.split(".")
				.pop()
				.match(/(jpg|jpeg|png)$/)
		) {
			this.setState({
				data: {
					...this.state.data,
					thumbnail: e.target.files[0],
				},
				thumbnailPreview: URL.createObjectURL(e.target.files[0]),
			});
		} else {
			this.setState({ errors: { thumbnail: "The file type ." + e.target.files[0].name.split(".").pop() + " is not supported" } });
		}
	};

	handleVideoChange = (e) => {
		if (
			e.target.files[0].name
				.split(".")
				.pop()
				.match(/(mp4|avi)$/)
		) {
			this.setState({
				data: {
					...this.state.data,
					video: e.target.files[0],
				},
				videoPreview: URL.createObjectURL(e.target.files[0]),
			});
		} else {
			this.setState({ errors: { video: "The file type ." + e.target.files[0].name.split(".").pop() + " is not supported" } });
		}
	};

	componentDidMount() {
		Axios.get(`${config.API_URL}/admin/speed`, {
			headers: {
				Authorization: Auth.getToken(),
			},
		}).then((response) => {
			if (response.status === 200) {
				this.setState({
					speedLevels: response.data.data.speedLevel,
				});
			}
		});
	}

	doSubmit = () => {
		//upload image
		const { thumbnail, video } = this.state.data;
		let thumbnailFormData = new FormData();
		thumbnailFormData.append("thumbnail", thumbnail);
		Axios.post(`${config.API_URL}/admin/drills/upload`, thumbnailFormData, {
			headers: {
				Authorization: Auth.getToken(),
				"Content-Type": "multipart/form-data",
			},
		})
			.then((response) => {
				//upload video
				let videoFormData = new FormData();
				videoFormData.append("video", video);
				Axios.post(`${config.API_URL}/admin/drills/upload`, videoFormData, {
					headers: {
						Authorization: Auth.getToken(),
						"Content-Type": "multipart/form-data",
					},
				})
					.then((videoResponse) => {
						this.setState({
							data: {
								...this.state.data,
								video: videoResponse.data.data.videos.video,
								thumbnail: response.data.data.videos.thumbnail,
							},
						});
						this.props.handleAddDrillVideo(this.state.data);
					})
					.catch((error) => console.log(error));
			})
			.catch((error) => console.log(error));
	};

	render() {
		const { onClose, isAddModalOpen } = this.props;
		const { data, categories, athletes, speedLevels, errors, thumbnailPreview, videoPreview } = this.state;

		return (
			<Modal show={isAddModalOpen} onHide={onClose}>
				<form onSubmit={this.handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Drill</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<div className='col-md-6 col-sm-6 col-xs-12 text-center'>
								<div className='form-group'>
									<img onClick={() => this.fileInput.click()} src={thumbnailPreview || uploadIcon} alt='' width='100%' height='95px' />
									<input
										type='file'
										className='form-control'
										style={{ display: "none" }}
										ref={(fileInput) => (this.fileInput = fileInput)}
										onChange={this.handleImageChange}
									/>
									{errors.thumbnail && <span className='text-danger'>{errors.thumbnail}</span>}
									<a href='#' className='btn btnUpload' onClick={() => this.fileInput.click()}>
										Upload Thumbnail
									</a>
								</div>
							</div>
							<div className='col-md-6 col-sm-6 col-xs-12 text-center'>
								{videoPreview ? (
									<ReactPlayer url={videoPreview} controls={true} width='250px' height='95px' />
								) : (
										<img onClick={() => this.videoInput.click()} src={videoIcon} alt='' width='100%' />
									)}
								<input
									type='file'
									className='form-control'
									style={{ display: "none" }}
									ref={(videoInput) => (this.videoInput = videoInput)}
									onChange={this.handleVideoChange}
								/>
								{errors.video && <span className='text-danger'>{errors.video}</span>}
								<a href='#' className='btn btnUpload' onClick={() => this.videoInput.click()}>
									Upload Video
								</a>
								{/* </div> */}
							</div>
						</Row>

						<Row>
							<Col md={5} mdOffset={1}>

								<div className='col-md-12 col-sm-12 col-xs-12'>
									<div className='form-group'>
										<select className='form-control' name='speedLevel' value={data.speedLevel} onChange={this.handleOnChange}>
											<option value=''>Select Speed Level</option>
											{speedLevels && speedLevels.length > 0
												? speedLevels.map((speedLevel, index) => {
													return (
														<option value={speedLevel._id} key={`speedLevel-${index}`}>
															{speedLevel.name}
														</option>
													);
												})
												: ""}
										</select>
										{errors.speedLevelId && <span className='text-danger'>{errors.speedLevelId}</span>}
									</div>
								</div>

							</Col>
							<Col md={5} mdOffset={1} >

								<input type="checkbox" name="isPremium" value={true} onChange={this.handleOnChange} />
								<label style={{ fontSize: '16px', padding: "13px", fontWeight: "400" }} >Premium</label>

							</Col>
						</Row>
						<Row>
							<Col md={6} mdOffset={1} >

								<input className='form-control' name="duration" placeholder='Enter Duration in Seconds' value={data.duration} onChange={this.handleOnChange} />

							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button className='btn-dark' type='submit' size='lg' block>
							Add Video
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		);
	}
}

export default DrillVideoModal;
