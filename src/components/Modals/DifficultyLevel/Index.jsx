import React, { Component } from "react";
import Form from "../../common/Form";
import Joi from "joi";
import { Button, Modal } from "react-bootstrap";
import Axios from "axios";
import Auth from "components/Services/Auth";

class DifficultyLevelModal extends Form {
    state = {
        data: {
            name: "",
            points: "",
        },
        errors: {},
        disableButton: false,
    };

    schema = Joi.object({
        name: Joi.string().required().label("Name"),
        points: Joi.string().required().label("Points"),
    });

    doSubmit = () => {
        const { data } = this.state;
        let formData = new FormData();
        const url = "http://127.0.0.1:8000/api/v1/admin/difficulty";
        Axios.post(url, data, {
            headers: {
                Authorization: Auth.getToken(),
            },
        })
            .then((response) => {
                this.props.handleAddDifficultyLevel(response.data.data.difficulty);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { onClose, isAddModalOpen } = this.props;
        const { data, errors, disableButton } = this.state;
        return (
            <Modal show={isAddModalOpen} onHide={onClose}>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Difficulty Level</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <input type='text' className='form-control' name='name' placeholder='Enter Name' onChange={this.handleOnChange} value={data.name} />
                            {errors.name && <span className='text-danger'>{errors.name}</span>}
                        </div>

                        <div className='form-group'>
                            <input
                                type='number'
                                className='form-control'
                                name='points'
                                placeholder='Enter Points'
                                onChange={this.handleOnChange}
                                value={data.points}
                            />
                            {errors.points && <span className='text-danger'>{errors.points}</span>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn-dark' size='lg' type='submit' block>
                            Add Difficulty Level
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default DifficultyLevelModal;
