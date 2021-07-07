import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            if (this.props.auth.user.position === 'Recruiter') {
                this.props.history.push('/dashboard-rec');
            } else {
                this.props.history.push('/dashboard');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated){
            if (nextProps.auth.user.position === 'Recruiter') {
                this.props.history.push('/dashboard-rec');
            } else {
                this.props.history.push('/dashboard');
            }
        }

        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData);
    }

    render() {
        const {errors} = this.state

        return (
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" action="dashboard.html" onSubmit={this.onSubmit}>

                    <TextFieldGroup
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        errors={errors.email}
                    >
                    </TextFieldGroup>

                    <TextFieldGroup
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        errors={errors.password}
                    >
                    </TextFieldGroup>

                    <input type="submit" className="btn btn-primary" value="Login"/>
                </form>
                <p className="my-1">
                    Don't have an account? <a href="register.html">Sign Up</a>
                </p>
            </section>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);