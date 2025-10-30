/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import { dataPie, legendPie, dataSales, optionsSales, responsiveSales, legendSales } from "variables/Variables.jsx";
import Auth from "components/Services/Auth";
import Axios from "axios";
import config from "config";

class Dashboard extends Component {
    state = {
        totalUsers: "",
        totalCategories: "",
        totalAthletes: "",
        totalDrills: "",
        totalEarning:"",
        totalSubscriber:"",
        monthlySubs:[]
    };

    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i} />);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }
    renderRedirect = () => {
        if (!localStorage.getItem("token")) {
            return <Redirect to='/login' />;
        }
    };

    componentDidMount() {
        let totalUsers, totalAthletes, totalCategories, totalDrills,totalEarning,monthlySubs,totalSubscriber;
        const userRequest = Axios.get(`${config.API_URL}/admin/users`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        });
        const athleteRequest = Axios.get(`${config.API_URL}/admin/athlete`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        });
        const categoryRequest = Axios.get(`${config.API_URL}/admin/categories`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        });
        const drillRequest = Axios.get(`${config.API_URL}/admin/drills`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        });
        const EarningRequest = Axios.get(`${config.API_URL}/admin/earning`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        })
        const monthlySubsRequest = Axios.get(`${config.API_URL}/admin/subscriberbymonth`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        })
        const totalSubsRequest = Axios.get(`${config.API_URL}/admin/totalsubscriber`, {
            headers: {
                Authorization: Auth.getToken(),
            },
        })
    

        Axios.all([userRequest, athleteRequest, categoryRequest, drillRequest,EarningRequest,monthlySubsRequest,totalSubsRequest]).then(
            Axios.spread((...responses) => {
                if (responses[0].status === 200) {
                    totalUsers = responses[0].data.data.user.length;
                }

                if (responses[1].status === 200) {
                    totalAthletes = responses[1].data.data.athlete.length;
                }

                if (responses[2].status === 200) {
                    totalCategories = responses[2].data.data.category.length;
                }

                if (responses[3].status === 200) {
                    totalDrills = responses[3].data.data.drills.length;
                }
                if(responses[4].status === 200){
                    totalEarning = responses[4].data.totalEarning[0]? 
                        responses[4].data.totalEarning[0].totalEarning : 0;
                }
                if(responses[5].status === 200){
                    monthlySubs = responses[5].data
                }
                if(responses[6].status === 200){
                    totalSubscriber = responses[6].data.totalsubscribers
                }

                this.setState({
                    totalUsers: totalUsers,
                    totalAthletes: totalAthletes,
                    totalCategories: totalCategories,
                    totalDrills: totalDrills,
                    totalEarning:totalEarning,
                    monthlySubs:monthlySubs,
                    totalSubscriber:totalSubscriber
                });
            })
        );
    }

    render() {
        const {monthlySubs}=this.state
        var dataBar = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
            series: [
              [monthlySubs.jan, monthlySubs.feb, monthlySubs.mar, monthlySubs.apr, monthlySubs.may, monthlySubs.jul, monthlySubs.aug, monthlySubs.sep, monthlySubs.oct, monthlySubs.nov,monthlySubs.dec]
            ]
          };
          var options = {
            high: 30,
            low: 0,
            axisX: {
              labelInterpolationFnc: function(value, index) {
                return index % 2 === 0 ? value : null;
              }
            }
          };
        return (
            <div>
                {this.renderRedirect()}

                <div className='content'>
                    <Grid fluid>
                        <Row style={{ marginTop: "20px" }}>
                            <Col lg={4} sm={6}>
                                <StatsCard
                                    bigIcon={<i className='pe-7s-user text-warning' />}
                                    statsText='Users'
                                    statsValue={this.state.totalUsers}
                                    statsIcon={<i className='fa fa-refresh' />}
                                    statsIconText='Users'
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <StatsCard
                                    bigIcon={<i className='pe-7s-wallet text-success' />}
                                    statsText='Categories'
                                    statsValue={this.state.totalCategories}
                                    statsIcon={<i className='fa fa-calendar-o' />}
                                    statsIconText='Categories'
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <StatsCard
                                    bigIcon={<i className='pe-7s-graph1 text-danger' />}
                                    statsText='Athletes'
                                    statsValue={this.state.totalAthletes}
                                    statsIcon={<i className='fa fa-clock-o' />}
                                    statsIconText='Athlete'
                                />
                            </Col>
                            </Row>
                            <Row style={{ marginTop: "20px" }}>
                            <Col lg={4} sm={6}>
                                <StatsCard
                                    bigIcon={<i className='fa fa-server text-info' />}
                                    statsText='Drills'
                                    statsValue={this.state.totalDrills}
                                    statsIcon={<i className='fa fa-refresh' />}
                                    statsIconText='Drills'
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <StatsCard
                                    bigIcon={<i className='pe-7s-cash text-warning' />}
                                    statsText='Earning Amount'
                                    statsValue={`$${this.state.totalEarning}`}
                                    statsIcon={<i className='fa fa-refresh' />}
                                    statsIconText='Earning Amount'
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <StatsCard
                                    bigIcon={<i className='pe-7s-user text-warning' />}
                                    statsText='Total Subscribers'
                                    statsValue={this.state.totalSubscriber}
                                    statsIcon={<i className='fa fa-refresh' />}
                                    statsIconText='Total Subscribers'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <Card
                                    statsIcon='fa fa-history'
                                    id='chartHours'
                                    title='Users Behavior'
                                    category='24 Hours performance'
                                    stats='Updated 3 minutes ago'
                                    content={
                                        <div className='ct-chart'>
                                            <ChartistGraph data={dataSales} type='Line' options={optionsSales} responsiveOptions={responsiveSales} />
                                        </div>
                                    }
                                    legend={<div className='legend'>{this.createLegend(legendSales)}</div>}
                                />
                            </Col>
                            <Col md={4}>
                                <Card
                                    title='Total Subscriptions'
                                    category='Performance'
                                    content={
                                        <div id='chartPreferences' className='ct-chart ct-perfect-fourth'>
                                            <ChartistGraph data={dataBar} options={options} type='Bar' />
                                        </div>
                                    }
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Dashboard;
