import React, { Component } from "react";
import { Card, CardBody, CardTitle, Media } from "reactstrap";
import { Link } from "react-router-dom";

class ActivityComp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle className="mb-5">
                            Sales Order Terbaru
                        </CardTitle>
                        <ul className="verti-timeline list-unstyled">
                            <li className="event-list">
                                <div className="event-timeline-dot">
                                    <i className="bx bx-right-arrow-circle font-size-18"></i>
                                </div>
                                <Media>
                                    <div className="mr-3">
                                        <h5 className="font-size-14">22 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"></i></h5>
                                    </div>
                                    <Media body>
                                        <div>
                                            Rani Dari Banjaran Status SO
                                        </div>
                                    </Media>
                                </Media>
                            </li>

                            <li className="event-list">
                                <div className="event-timeline-dot">
                                    <i className="bx bx-right-arrow-circle font-size-18"></i>
                                </div>
                                <Media>
                                    <div className="mr-3">
                                        <h5 className="font-size-14">17 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"></i></h5>
                                    </div>
                                    <Media body>
                                        <div id="activitytext">
                                            Ganjar Dari Buah Batu Status SO
                                        </div>
                                    </Media>
                                </Media>
                            </li>
                            <li className="event-list active">
                                <div className="event-timeline-dot">
                                    <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
                                </div>
                                <Media>
                                    <div className="mr-3">
                                        <h5 className="font-size-14">15 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"></i></h5>
                                    </div>
                                    <Media body>
                                        <div>
                                            Ganjar Dari Buah Batu Status SO Dengan Order lebih dari 100
                                        </div>
                                    </Media>
                                </Media>
                            </li>
                            <li className="event-list">
                                <div className="event-timeline-dot">
                                    <i className="bx bx-right-arrow-circle font-size-18"></i>
                                </div>
                                <Media>
                                    <div className="mr-3">
                                        <h5 className="font-size-14">12 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"></i></h5>
                                    </div>
                                    <Media body>
                                        <div>
                                            Ghani Dari Buah Batu Status SO
                                        </div>
                                    </Media>
                                </Media>
                            </li>
                        </ul>
                        <div className="text-center mt-4"><Link to="" className="btn btn-primary waves-effect waves-light btn-sm">View More <i className="mdi mdi-arrow-right ml-1"></i></Link></div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default ActivityComp;
