import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {reduxForm} from 'redux-form';
import { Row, Card, CardTitle, Form, Label, Input, Button } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from "../../helpers/IntlMessages";

// Import custom components
import renderText from '../common/form/renderText';
import CustomizedSnackbar from '../common/snakebar/CustomizedSnackbar';

const styles = {
    root: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    card: {
        padding: 20,
        overflow: 'auto'
    },
    cardHeader: {
        textAlign: 'center'
    },
    btnDiv: {
        textAlign: 'center'
    },
    btn: {
        marginTop: 21,
    }
};

const LoginForm = props => {

    const {handleSubmit, onSubmit, classes, errorMessage} = props;

    return (
        <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
              <p className="white mb-0">
                Please use your credentials to login.
                <br />
                If you are not a member, please{" "}
                <NavLink to={`/register`} className="white">
                  register
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />
              </CardTitle>
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email" defaultValue={this.state.email} />
                  <IntlMessages id="user.email" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="password" />
                  <IntlMessages
                    id="user.password"
                    defaultValue={this.state.password}
                  />
                </Label>
                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to={`/forgot-password`}>
                    <IntlMessages id="user.forgot-password-question" />
                  </NavLink>
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => this.onUserLogin()}
                  >
                    <IntlMessages id="user.login-button" />
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    )
};

const validateLogin = values => {
    const errors = {};

    const requiredFields = [
        'email',
        'password'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '(The ' + field + ' field is required.)';
        }
    });

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '(Invalid email address.)';
    }
    return errors
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'LoginForm', // a unique identifier for this form
    validate: validateLogin // ←Callback function for client-side validation
})(withStyles(styles)(LoginForm));