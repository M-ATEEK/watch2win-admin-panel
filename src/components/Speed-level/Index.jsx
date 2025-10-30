import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import SpeedLevelModal from "components/Modals/SpeedLevel/Index";
import Axios from "axios";
import { toast } from "react-toastify";
import EditSpeedLevelModal from "components/Modals/SpeedLevel/Edit";
import { confirmAlert } from "react-confirm-alert";
import Confirmation from "components/common/Confirmation";
import config from "../../config";
import Auth from "components/Services/Auth";

class SpeedLevel extends Component {
    state = {
        isAddModalOpen: false,
        isEditModalOpen: false,
        speedLevels: [],
        speedLevelNeedToBeEdit: "",
        showSearch: false,
        showSearchButton: true,
        selection: ""
    };

    handleToggleSpeedLevelModal = () => {
        this.setState({
            isAddModalOpen: !this.state.isAddModalOpen,
        });
    };

    handleToggleEditSpeedLevelModal = (edit, speedLevelId) => {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen,
            speedLevelNeedToBeEdit: speedLevelId,
            selection: edit
        });
    };

    handleAddSpeedLevel = (speedLevelObject) => {
        this.setState({
            speedLevels: [...this.state.speedLevels, speedLevelObject],
            isAddModalOpen: false,
        });
        toast.success("Speed Level has been added successfully.");
    };

    handleEditSpeedLevel = (speedLevelObject) => {
        console.log(speedLevelObject);
        const { speedLevels } = this.state;
        const index = speedLevels.findIndex((speedLevel, index) => speedLevel._id === speedLevelObject.id);
        speedLevels[index] = speedLevelObject;
        this.setState({
            speedLevels: [...speedLevels],
            isEditModalOpen: false,
        });
        toast.success("Speed Level has been updated successfully.");
    };

    handleDeleteDifficulty = (speedLevelId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return <Confirmation onDelete={this.deleteAction} onClose={onClose} id={speedLevelId} />;
            },
        });
    };

    deleteAction = (speedLevelId) => {
        Axios.delete(`${config.API_URL}/admin/speed/${speedLevelId}`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    const { speedLevels } = this.state;
                    const filteredSpeedLevels = speedLevels.filter((speedLevel, index) => speedLevel._id !== speedLevelId);
                    this.setState({
                        speedLevels: [...filteredSpeedLevels],
                    });
                    toast.success("Speed Level has been deleted successfully.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentDidMount() {
        Axios.get(`${config.API_URL}/admin/speed`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        })
            .then((response) => {
                this.setState({
                    speedLevels: [...response.data.data.speedLevel],
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    toggleSearch = () => {
        const { showSearch, showSearchButton } = this.state;
        this.setState({
            showSearch: !showSearch,
            showSearchButton: !showSearchButton,
        });
    };
    handleSearch = (e) => {
        let search = e.currentTarget.value;
        Axios.get(`${config.API_URL}/admin/difficulty/?search=${search}`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        }).then((response) => {
            this.setState({
                speedLevels: [...response.data.data.speedLevel],
            });
        });
    };
    render() {
        const { isAddModalOpen, isEditModalOpen, speedLevelNeedToBeEdit, speedLevels, showSearch, showSearchButton } = this.state;
        let speedLevelRows = null;
        const showSearchClass = showSearch ? "block" : "none";
        const showSearchButtonClass = showSearchButton ? "block" : "none";


        if (speedLevels.length > 0) {
            speedLevelRows = speedLevels.map((speedLevel, index) => {
                return (
                    <tr key={`difficulty-${index}`}>
                        <td>{index + 1}</td>
                        <td>{speedLevel.name}</td>
                        <td>{speedLevel.points}</td>
                        <td>{speedLevel.condition}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant='success' id='dropdown-basic'></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <li className='dropdown-item'>
                                        <a onClick={() => this.handleToggleEditSpeedLevelModal("view", speedLevel._id)} >View</a>
                                    </li>
                                    <li className='dropdown-item'>
                                        <a onClick={() => this.handleToggleEditSpeedLevelModal("edit", speedLevel._id)}>Edit</a>
                                    </li>
                                    <li className='dropdown-item'>
                                        <a onClick={() => this.handleDeleteDifficulty(speedLevel._id)}>Delete</a>
                                    </li>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <Grid fluid>
                <Row style={{ margin: "10px 0 10px 0" }}>
                    <Col md={8}>
                        <input  onClick={this.toggleSearch} className='search-bar' placeholder='Search...' style={{ display: showSearchClass }} onChange={this.handleSearch} />
                    </Col>

                    <Col md={2} style={{ padding: 0 }}>
                        <Button className='search-btn' style={{ display: showSearchButtonClass}} onClick={this.toggleSearch}>
                            <i className='pe-7s-search'></i>
                        </Button>
                    </Col>

                    <Col md={2}>
                        <Button className='btn-dark pull-right m-2' onClick={() => this.handleToggleSpeedLevelModal("add")}>
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
                                            <th>Watch(Times)</th>
                                            <th>Points</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>{speedLevelRows}</tbody>
                                </Table>
                            }
                        />
                    </Col>
                </Row>

                {isAddModalOpen ? (
                    <SpeedLevelModal
                        onClose={this.handleToggleSpeedLevelModal}
                        isAddModalOpen={isAddModalOpen}
                        handleAddSpeedLevel={this.handleAddSpeedLevel}
                    />
                ) : (
                    ""
                )}

                {isEditModalOpen ? (
                    <EditSpeedLevelModal
                        onClose={this.handleToggleEditSpeedLevelModal}
                        selection={this.state.selection}
                        isEditModalOpen={this.state.isEditModalOpen}
                        handleEditSpeedLevel={this.handleEditSpeedLevel}
                        speedLevelNeedToBeEdit={speedLevelNeedToBeEdit}
                    />
                ) : (
                    ""
                )}
            </Grid>
        );
    }
}

export default SpeedLevel;
