import React, {Component} from 'react';
import {Alert, Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {getRole} from "../../helpers/helpers";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {doAdd} from "../../store/users/Action";

class Add extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this)
        this.updateInputName = this.updateInputName.bind(this)
        this.updateInputEmail = this.updateInputEmail.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)

        this.state = {
            name: "",
            email: "",
            role: "default",
        }
    }

    handleBack() {
        this.props.history.push(
            `data-users`
        )
    }

    updateInputName(e) {
        this.setState({name : e.target.value})
    }
    updateInputEmail(e) {
        this.setState({email : e.target.value})
    }

    handleEditSubmit(e) {
        e.preventDefault();
        const dataInsert = {
            userName: this.state.name,
            userEmail: this.state.email,
            userRole: this.state.role,
        }
        // this.props.doAdd(dataInsert)
    }

    render() {
        const { location: { state } } = this.props

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
                                            {state.attribute.desc}
                                        </CardSubtitle>
                                        <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Nama</label>
                                            <div className="col-md-10">
                                                <input  onChange={this.updateInputName}  className="form-control" type="text" defaultValue=""/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Email</label>
                                            <div className="col-md-10">
                                                <input onChange={this.updateInputEmail} className="form-control" type="text" defaultValue=""/>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-0">
                                            <label className="col-md-2 col-form-label">Role</label>
                                            <div className="col-md-10">
                                                <select className="custom-select">
                                                    <option value="default">Pilih Role</option>
                                                    {getRole().map(function(item, i){
                                                        return (<option key={i} value={item.value}>{item.name}</option>);
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-0">&nbsp;</div>
                                        <div className="form-group mb-0 d-flex">
                                            <div className="ml-auto">

                                                <Button
                                                    color="white"
                                                    className="btn primary waves-effect waves-light"
                                                    onClick={this.handleBack}
                                                >
                                                    back
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    color="primary"
                                                    className="btn primary waves-effect waves-light"
                                                >
                                                    Simpan
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

export default withRouter(connect(mapStatetoProps, { doAdd })(Add));