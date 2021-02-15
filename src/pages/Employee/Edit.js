import React, {Component} from 'react';
import {Alert, Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {Link, Redirect, withRouter} from "react-router-dom";
import {getRole} from "../../helpers/helpers";
import {connect} from "react-redux";

import {doEdit, doEditSuccess} from "../../store/users/Action"


class Edit extends Component {

    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.updateInputName = this.updateInputName.bind(this);
        this.updateInputEmail = this.updateInputEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            name: "",
            email: "",
            role: "default",
        }
    }

    handleBack() {
        return this.props.history.push(
            '/data-employee'
        )
    }

    handleEditSubmit(e) {
        e.preventDefault();

        const dataEdit = {
            userName: this.state.name,
            userEmail: this.state.email,
            userRole: this.state.role,
        }
      this.props.doEdit(dataEdit)
    }
    handleChange(e) {
        console.log( e.target.value )
    }

    updateInputName(e) {
        this.setState({name : e.target.value})
    }
    updateInputEmail(e) {
        this.setState({email : e.target.value})
    }

    componentDidMount() {
        const { location: { state } } = this.props
        const userData = JSON.parse(state.data);
        this.setState( (state, props) => ({
            name: userData.userName,
            email: userData.userEmail,
        }))
    }

    render() {
        const { location: { state } } = this.props
        if (state === undefined) {
            return <Redirect to='/data-employee'  />
        }

        const userData = JSON.parse(state.data);
        if (this.props.isRedirect) {
            return <Redirect to='/data-employee'  />
        }


        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title="Form" breadcrumbItem={state.attribute.breadcrumb} />
                        {this.props.error && this.props.error ? <Alert color="danger">{this.props.error}</Alert> : null}

                        <Row>
                            <Col>
                                <form onSubmit={this.handleEditSubmit}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>{state.attribute.breadcrumb}</CardTitle>
                                        <CardSubtitle className="mb-3">
                                            {state.attribute.desc + userData.userName}
                                        </CardSubtitle>
                                        <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Nama</label>
                                            <div className="col-md-10">
                                                <input  onChange={this.updateInputName} name="name" className="form-control" type="text"  defaultValue={this.state.name === "" ? userData.userName : this.state.userName} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Email</label>
                                            <div className="col-md-10">
                                                <input onChange={this.updateInputEmail} name="email" className="form-control" type="text" defaultValue={this.state.email === "" ? userData.userEmail : this.state.email} />
                                            </div>
                                        </div>
                                        <div className="form-group row mb-0">
                                            <label className="col-md-2 col-form-label">Role</label>
                                            <div className="col-md-10">
                                                <select  className="custom-select" onChange={this.handleChange}>
                                                    <option value="default">Pilih Role</option>
                                                    {getRole().map(function(item, i){
                                                        let selected = "";
                                                        if (userData.userRole === item.value) {
                                                            selected = "='selected'"
                                                        }
                                                        return (<option  selected={selected}  key={i} value={item.value}>{item.name}</option>);
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-0">&nbsp;</div>
                                        <div className="form-group mb-0 d-flex">
                                            <div className="ml-auto">

                                                <Button
                                                    color="primary"
                                                    className="btn primary waves-effect waves-light"
                                                    onClick={this.handleBack}
                                                >
                                                    back
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    color="success"
                                                    type="submit"
                                                    className="btn success waves-effect waves-light"

                                                >
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}
const mapStatetoProps = state => {
    const { error, user, isRedirect } = state.Users;
    return { error, user, isRedirect};
}

export default withRouter(connect(mapStatetoProps, { doEdit, doEditSuccess })(Edit));