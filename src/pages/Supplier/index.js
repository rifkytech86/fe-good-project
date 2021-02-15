import React, {Component} from "react";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {Alert, Button, Card, CardBody, CardSubtitle, CardTitle, Col, Modal, Row} from "reactstrap";
import {MDBBadge, MDBDataTable} from "mdbreact";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {listUsers,listUserFailed,doDelete, doDeleteFailed} from "../../store/users/Action";
import _ from 'lodash';
import Confirm from "../../components/HorizontalLayout/Confirm";
import {AvForm} from "availity-reactstrap-validation";
class Index extends Component {

    constructor(props) {
        super(props);

        // handleAdd
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleDoDelete = this.handleDoDelete.bind(this)
        this.props.listUsers()

        //
        this.state = {
            confirm: false,
            userID: "",
        }
    }

    componentDidMount() {
        this.props.doDeleteFailed("")
        this.props.listUserFailed("")
    }

    handleAdd() {
        this.props.history.push(
            `/data-users-add`,
            {
                attribute: {
                    breadcrumb: "Form Tambah Users",
                    desc: "Tambah Data users "
                }
            }
        )
    }


    getDataListUser() {
        const data = {
            columns: [
                {
                    label: "Name",
                    field: "userName",
                    sort: "asc",
                    width: 150
                },
                {
                    label: "Address",
                    field: "userAddress",
                    sort: "asc",
                    width: 200
                },
                {
                    label: "PIC",
                    field: "userPIC",
                    sort: "asc",
                    width: 250
                },
                {
                    label: "Phone",
                    field: "userPhone",
                    sort: "asc",
                    width: 300
                },
            ],
            rows: [],
        };

        return data
    }

    handleEdit(e)  {
        this.props.history.push(
            `/data-users-edit${_.get(
                this.props,
                'location.search',
            )}`,
            {
                attribute: {
                    breadcrumb: "Form Edit Users",
                    desc: "Edit Data untuk users "
                },
                data : e.target.getAttribute('data-users')
            }
        )
    }

    handleDelete(e) {
        const userID = e.target.getAttribute('data-userid')
        this.setState( (state, props) => ({
            confirm: true,
            userID: userID,
        }))
    }

    handleClose() {
        this.setState( (state, props) => ({
            confirm: false,
        }))
    }

    handleDoDelete(e) {
        const userID = e.target.getAttribute('data');
        this.setState( (state, props) => ({
            confirm: false,
        }))
        this.props.doDelete(userID)
    }
    render() {
        const { user } = this.props
        let data = this.getDataListUser()
        if (user !== undefined) {
            data = {
                columns: [
                    ...data.columns,
                    {
                        label: 'ID',
                        field: 'badge',
                        width: 20
                    },
                ],
                rows: [
                    ...user.map((row, order) => ({
                        ...row,
                        badge: (
                            <div>
                                <Button
                                    color="success"
                                    className="btn btn-success waves-effect waves-light"
                                    data-users={JSON.stringify(row)}
                                    onClick={this.handleEdit}
                                >
                                    Edit
                                </Button>
                                &nbsp; | &nbsp;
                                <Button
                                    color="danger"
                                    data-userid={row.userID}
                                    className="btn btn-primary waves-effect waves-light"
                                    onClick={this.handleDelete}
                                    data-toggle="modal"
                                    data-target="#myModal"
                                >
                                    Delete
                                </Button>
                            </div>
                        ),
                    })),
                ],
            }
        }

        return (
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">
                        <Breadcrumbs title="Tables" breadcrumbItem="Data Supplier" />

                        {this.props.error && this.props.error ? <Alert color="danger">{this.props.error}</Alert> : null}

                        <Row>
                            <Col className="col-12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>List Data Supplier</CardTitle>
                                        <CardSubtitle className="mb-3">
                                            List data supplier bisa masuk ke dalam admin panel
                                        </CardSubtitle>
                                        <div className="d-flex">
                                            <div className="ml-auto">
                                                <Button
                                                    color="primary"
                                                    className="btn btn-primary waves-effect waves-light"
                                                    onClick={this.handleAdd}
                                                >
                                                    Tambah
                                                </Button>
                                            </div>
                                        </div>
                                        <MDBDataTable responsive striped bordered data={data} />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>

                {/*<div className="page-content">*/}
                {/*    <Container fluid={true}>*/}

                {/*        <Breadcrumbs title="Form" breadcrumbItem="Data Users" />*/}
                {/*        <Row>*/}
                {/*            <Col>*/}
                {/*                <Card>*/}
                {/*                    <CardBody>*/}
                {/*                        <CardTitle>List Data Users</CardTitle>*/}
                {/*                        <CardSubtitle className="mb-3">Silahkan Daftarkan user akan login ke dalam dashboard.</CardSubtitle>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Text</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="text" defaultValue="Artisanal kale" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-search-input" className="col-md-2 col-form-label">Search</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="search" defaultValue="How do I shoot web" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-email-input" className="col-md-2 col-form-label">Email</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="email" defaultValue="bootstrap@example.com" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-url-input" className="col-md-2 col-form-label">URL</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="url" defaultValue="https://getbootstrap.com" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-tel-input" className="col-md-2 col-form-label">Telephone</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="tel" defaultValue="1-(555)-555-5555" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-password-input" className="col-md-2 col-form-label">Password</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="password" defaultValue="hunter2" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-number-input" className="col-md-2 col-form-label">Number</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="number" defaultValue="42" id="example-number-input" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-datetime-local-input" className="col-md-2 col-form-label">Date and time</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="datetime-local" defaultValue="2019-08-19T13:45:00" id="example-datetime-local-input" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-date-input" className="col-md-2 col-form-label">Date</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="date" defaultValue="2019-08-19" id="example-date-input" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-month-input" className="col-md-2 col-form-label">Month</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="month" defaultValue="2019-08" id="example-month-input" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-week-input" className="col-md-2 col-form-label">Week</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="week" defaultValue="2019-W33" id="example-week-input" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-time-input" className="col-md-2 col-form-label">Time</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="time" defaultValue="13:45:00" id="example-time-input" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label htmlFor="example-color-input" className="col-md-2 col-form-label">Color</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <input className="form-control" type="color" defaultValue="#556ee6" id="example-color-input" />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row">*/}
                {/*                            <label className="col-md-2 col-form-label">Select</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <select className="form-control">*/}
                {/*                                    <option>Select</option>*/}
                {/*                                    <option>Large select</option>*/}
                {/*                                    <option>Small select</option>*/}
                {/*                                </select>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="form-group row mb-0">*/}
                {/*                            <label className="col-md-2 col-form-label">Custom Select</label>*/}
                {/*                            <div className="col-md-10">*/}
                {/*                                <select className="custom-select">*/}
                {/*                                    <option defaultValue>Open this select menu</option>*/}
                {/*                                    <option value="1">One</option>*/}
                {/*                                    <option value="2">Two</option>*/}
                {/*                                    <option value="3">Three</option>*/}
                {/*                                </select>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </CardBody>*/}
                {/*                </Card>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </Container>*/}
                {/*</div>*/}

                <Confirm
                    isOpen={this.state.confirm}
                    onClickHandleClose={this.handleClose}
                    onClickHandleDelete={this.handleDoDelete}
                    data={this.state.userID}
                />

            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { error, user } = state.Users;
    return { error, user};
}

export default withRouter(connect(mapStatetoProps, { listUsers, listUserFailed, doDelete, doDeleteFailed })(Index));