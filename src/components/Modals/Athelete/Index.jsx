import React, { Component } from "react";
import Form from "../../common/Form";
import { Button, Col, Modal, Row } from "react-bootstrap";
import AddIcon from "../../../assets/img/add.png";
import CategoryIcon from "../../../assets/img/category.png";
import Joi from "joi";
import config from "../../../config";
import axios from "axios";
import { toast } from "react-toastify";

class AtheleteModal extends Form {
    state = {
        data: {
            name: "",
            image: "",
        },
        errors: {},
        disableButton: false,
        view: false,
        imagePreview: "",
        disableButton: true,
    };

    schema = Joi.object({
        name: Joi.string().required().label("Name"),
        image: Joi.allow(""),
    });

    componentDidMount() {
        if (this.props.selection === "view") {
            this.setState({
                view: true,
            });
        }
        if (this.props.selection === "edit" || this.props.selection === "view") {
            const token = localStorage.getItem("token");
            axios
                .get(`${config.API_URL}/admin/athlete/${this.props.id}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    if (response.data.data.athlete.image) {
                        this.setState({
                            data: {
                                name: response.data.data.athlete.name,
                                image: response.data.data.athlete.image,
                            },
                            imagePreview: `${config.IMG_URL}/image/${response.data.data.athlete.image}`,
                        });
                    } else {
                        this.setState({
                            data: {
                                name: response.data.data.athlete.name,
                            },
                        });
                    }
                });
        }
    }

    doSubmit = async (e) => {
        const token = localStorage.getItem("token");
        const data = this.state.data;
        let message = "";
        if (this.props.selection === "edit") {
            if (this.state.data.image !== undefined) {
                const formdata = new FormData();
                formdata.append("name", this.state.data.name);
                formdata.append("image", this.state.data.image);
                await axios(`${config.API_URL}/admin/athlete/${this.props.id}`, {
                    method: "POST",
                    headers: {
                        "content-type": "multipart/form-data",
                        Authorization: token,
                    },
                    data: formdata,
                })
                    .then((response) => response)
                    .catch((error) => {
                        throw error;
                    });
            } else {
                const formdata = new FormData();
                formdata.append("name", this.state.data.name);
                await axios(`${config.API_URL}/admin/athlete/${this.props.id}`, {
                    method: "POST",
                    headers: {
                        "content-type": "multipart/form-data",
                        Authorization: token,
                    },
                    data: formdata,
                })
                    .then((response) => response)
                    .catch((error) => {
                        throw error;
                    });
            }
            message = "Athlete has been edit successfully";
        } else if (this.props.selection === "add") {
            if (this.state.data.image !== undefined) {
                const formdata = new FormData();
                formdata.append("name", this.state.data.name);
                formdata.append("image", this.state.data.image);
                await axios(`${config.API_URL}/admin/athlete`, {
                    method: "POST",
                    headers: {
                        "content-type": "multipart/form-data",
                        Authorization: token,
                    },
                    data: formdata,
                })
                    .then((response) => response)
                    .catch((error) => {
                        throw error;
                    });
            } else {
                const formdata = new FormData();
                formdata.append("name", this.state.data.name);
                await axios(`${config.API_URL}/admin/athlete`, {
                    method: "POST",
                    headers: {
                        "content-type": "multipart/form-data",
                        Authorization: token,
                    },
                    data: formdata,
                })
                    .then((response) => response)
                    .catch((error) => {
                        throw error;
                    });
            }
            message = "Athlete has been add successfully";
        }
        this.props.getAllData();
        toast.success(message);
        this.props.onClose();
    };

    handleOnChange = (e) => {
        const { data } = { ...this.state };
        const currentState = data;
        const { name, value } = e.target;
        currentState[name] = value;

        this.setState({ data: currentState });
    };

    render() {
        const { onClose, isAddModalOpen } = this.props;
        const { disableButton, data, errors } = this.state;
        return (
            <Modal show={isAddModalOpen} onHide={onClose}>
                <form onSubmit={this.handleSubmit} method='Post'>
                    <Modal.Header closeButton>
                        <Modal.Title>Athelete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.view ? (
                            <div>
                                <Row>
                                    <div className='form-group'>
                                        <div className='text-center'>
                                            <img
                                                src={this.state.imagePreview === "" ? CategoryIcon : this.state.imagePreview}
                                                alt=''
                                                width='110px'
                                                height='132px'
                                            />
                                            <input
                                                type='file'
                                                className='form-control'
                                                style={{ display: "none" }}
                                                ref={(fileInput) => (this.fileInput = fileInput)}
                                                onChange={this.handleImageChange}
                                            />
                                        </div>
                                    </div>
                                </Row>
                                <Row>
                                    {errors.image && (
                                        <Row className='text-center'>
                                            <span className='text-danger'>{errors.image}</span>
                                        </Row>
                                    )}
                                </Row>

                                <div className='form-group'>
                                    <input style={{ color: "black" }} type='text' className='form-control' value={data.name} disabled />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Row>
                                    <div className='form-group'>
                                        <div className='addBtnArea text-center'>
                                            <img
                                                src={this.state.imagePreview === "" ? CategoryIcon : this.state.imagePreview}
                                                alt=''
                                                width='110px'
                                                height='132px'
                                            />
                                            <input
                                                type='file'
                                                className='form-control'
                                                style={{ display: "none" }}
                                                ref={(fileInput) => (this.fileInput = fileInput)}
                                                onChange={this.handleImageChange}
                                            />
                                            <button type='button' className='btn btnAdd' onClick={() => this.fileInput.click()}>
                                                <img src={AddIcon} alt='' />
                                            </button>
                                        </div>
                                    </div>
                                </Row>
                                <Row>
                                    {errors.image && (
                                        <Row className='text-center'>
                                            <span className='text-danger'>{errors.image}</span>
                                        </Row>
                                    )}
                                </Row>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter Name'
                                        onChange={this.handleOnChange}
                                        name='name'
                                        value={data.name}
                                    />
                                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.view ? (
                            ""
                        ) : (
                            <Button type='submit' className='btn-dark' size='lg' block>
                                Save Athlete
                            </Button>
                        )}
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default AtheleteModal;
