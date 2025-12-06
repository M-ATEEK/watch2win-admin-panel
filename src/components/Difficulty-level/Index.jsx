import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Dropdown } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import DifficultyLevelModal from "components/Modals/DifficultyLevel/Index";
import config from "../../config";
import * as Services from "../../services/index";
import Axios from "axios";
import EditDifficultyLevelModal from "components/Modals/DifficultyLevel/Edit";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import Confirmation from "components/common/Confirmation";
import Auth from "components/Services/Auth";
import EPagination from "components/common/EPagination";

class DifficultyLevel extends Component {
    state = {
        isAddModalOpen: false,
        isEditModalOpen: false,
        difficulties: [],
        difficultyNeedToBeEdit: "",
        showSearch: false,
        showSearchButton: false,
        activePage: 1,
        totalItems: "",
        selection: ""
    };

    handlePageChange = (pageNumber) => {
        const token = localStorage.getItem("token");
        Axios.get(`${config.API_URL}/admin/difficulty/?page=${pageNumber}`, {
            headers: {
                Authorization: token,
            },
        }).then((response) => {
            this.setState({
                activePage: pageNumber,
                difficulties: [...response.data.data.difficulty],
            });
        });
    };

    handleToggleDifficultyLevelModal = () => {
        this.setState({
            isAddModalOpen: !this.state.isAddModalOpen,
        });
    };

    handleToggleEditDifficultyLevelModal = (edit, difficultyId) => {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen,
            difficultyNeedToBeEdit: difficultyId,
            selection: edit
        });
    };

    handleAddDifficultyLevel = (difficultyLevelObject) => {
        this.setState({
            difficulties: [...this.state.difficulties, difficultyLevelObject],
            isAddModalOpen: false,
        });
        toast.success("Difficulty has been added successfully.");
    };

    handleEditDifficultyLevel = (difficultyLevelObject) => {
        const { difficulties } = this.state;
        const index = difficulties.findIndex((difficulty, index) => difficulty._id === difficultyLevelObject.id);
        difficulties[index] = difficultyLevelObject;
        this.setState({
            difficulties: [...difficulties],
            isEditModalOpen: false,
        });
        toast.success("Difficulty has been updated successfully.");
    };

    handleDeleteDifficulty = (difficultyId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return <Confirmation onDelete={this.deleteAction} onClose={onClose} id={difficultyId} />;
            },
        });
    };

    deleteAction = (difficultyId) => {
        Axios.delete(`${config.API_URL}/admin/difficulty/${difficultyId}`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    const { difficulties } = this.state;
                    const filteredDifficulties = difficulties.filter((difficulty, index) => difficulty._id !== difficultyId);
                    this.setState({
                        difficulties: [...filteredDifficulties],
                    });
                    toast.success("Difficuly has been deleted successfully.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentDidMount() {
        Axios.get(`${config.API_URL}/admin/difficulty`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        })
            .then((response) => {
                this.setState({
                    totalItems: response.data.data.count,
                    difficulties: [...response.data.data.difficulty],
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
                difficulties: [...response.data.data.difficulty],
            });
        });
    };

    render() {
        const { isAddModalOpen, isEditModalOpen, difficultyNeedToBeEdit, difficulties, showSearch, activePage, totalItems, showSearchButton } = this.state;
        const showSearchClass = showSearch ? "block" : "none";
        const showSearchButtonClass = showSearchButton ? "block" : "none";

        let difficultyRows = null;

        if (difficulties.length > 0) {
            difficultyRows = difficulties.map((difficulty, index) => {
                return (
                    <tr key={`difficulty-${index}`}>
                        <td>{index + 1}</td>
                        <td>{difficulty.name}</td>
                        <td>{difficulty.points}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant='success' id='dropdown-basic'></Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <li className='dropdown-item'>
                                        <a onClick={() => this.handleToggleEditDifficultyLevelModal("view", difficulty._id)} >View</a>
                                    </li>
                                    <li className='dropdown-item'>
                                        <a onClick={() => this.handleToggleEditDifficultyLevelModal("edit", difficulty._id)}>Edit</a>
                                    </li>
                                    <li className='dropdown-item'>
                                        <a onClick={() => this.handleDeleteDifficulty(difficulty._id)}>Delete</a>
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
                <Row style={{margin: "10px 0 10px 0" }}>
                    <Col md={8}>
                        <input className='search-bar' placeholder='Search...' style={{ display: showSearchClass }} onChange={this.handleSearch} />
                    </Col>

                    <Col md={2} style={{ padding: "0" }}>
                        <Button className='search-btn' style={{ display: showSearchButtonClass}}  onClick={this.toggleSearch}>
                            <i className='pe-7s-search'></i>
                        </Button>
                    </Col>

                    <Col md={2}>
                        <Button className='btn-dark pull-right m-2' onClick={() => this.handleToggleDifficultyLevelModal("add")}>
                            Add Difficulty Level
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
                                            <th>Points</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>{difficultyRows}</tbody>
                                </Table>
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} style={{ textAlign: "center" }}>
                        <EPagination
                            activePage={activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={totalItems}
                            pageRangeDisplayed={5}
                            handlePageChange={this.handlePageChange.bind(this)}
                            items={difficulties}
                        />
                    </Col>
                </Row>

                {isAddModalOpen ? (
                    <DifficultyLevelModal
                        onClose={this.handleToggleDifficultyLevelModal}
                        isAddModalOpen={isAddModalOpen}
                        handleAddDifficultyLevel={this.handleAddDifficultyLevel}
                    />
                ) : (
                    ""
                )}

                {isEditModalOpen ? (
                    <EditDifficultyLevelModal
                        onClose={this.handleToggleEditDifficultyLevelModal}
                        selection={this.state.selection}
                        isEditModalOpen={isEditModalOpen}
                        handleEditDifficultyLevel={this.handleEditDifficultyLevel}
                        difficultyNeedToBeEdit={difficultyNeedToBeEdit}
                    />
                ) : (
                    ""
                )}
            </Grid>
        );
    }
}

export default DifficultyLevel;
