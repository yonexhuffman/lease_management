import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authService from '../../services/authService';

// Import custom components
import LoginForm from '../../components/auth/LoginForm';

class LoginContainer extends Component {

    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        document.body.classList.add("background");
      }
      componentWillUnmount() {
        document.body.classList.remove("background");
      }

    /**
     * Submit the form.
     *
     * @param {object} formProps
     */
    submitForm(formProps) {

        this.props.actions.login(formProps);
    }

    render() {
        return (
            <Fragment>
                <div className="fixed-background" />
                <main>
                <div className="container">
                    <LoginForm
                            onSubmit={this.submitForm}
                            errorMessage={this.props.errorMessage}
                        />
                </div>
                </main>
            </Fragment>
                    
        )
    }

}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, authService), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)