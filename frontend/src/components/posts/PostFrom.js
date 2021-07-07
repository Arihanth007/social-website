import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {addPost} from "../../actions/postActions";
import {getProfileByHandle} from "../../actions/profileActions";

class PostFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({errors: newProps.errors});
        }
    }

    onChange (e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const {user} = this.props.auth;

        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addPost(newPost);
        this.setState({text: ''});
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="post-form">
                <div className="bg-info p">
                    <h3 className="text-light">Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={this.onSubmit}>
                    <TextAreaFieldGroup
                        placeholder="Create a post"
                        name="text"
                        value={this.state.next}
                        onChange={this.onChange}
                        errors={errors.text}/>
                    <input type="submit" className="btn btn-dark my-1"/>
                </form>
            </div>
        );
    }
}

PostFrom.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{addPost})(PostFrom);