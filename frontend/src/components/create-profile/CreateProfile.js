import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import {createProfile} from "../../actions/profileActions";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            number: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            number: this.state.number,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const {errors, displaySocialInputs } = this.state;
        const {user} = this.props.auth;

        let SocialInputs;

        if(displaySocialInputs) {
            SocialInputs = (
                <div>
                    <InputGroup
                        onChange={this.onChange}
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        errors={errors.twitter}/>
                    <InputGroup
                        onChange={this.onChange}
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        errors={errors.facebook}/>
                    <InputGroup
                        onChange={this.onChange}
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        errors={errors.linkedin}/>
                    <InputGroup
                        onChange={this.onChange}
                        placeholder="Youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        errors={errors.youtube}/>
                    <InputGroup
                        onChange={this.onChange}
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        errors={errors.instagram}/>
                </div>
            )
        }

        // Select options for status
        const options = [
            { label: '* Select Professional status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student', value: 'Student' },
            { label: 'Teacher', value: 'Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create your profile</h1>
                            <p className="lead text-centre">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    errors={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"/>

                                <TextFieldGroup
                                    placeholder="Phone number"
                                    name="number"
                                    value={this.state.number}
                                    onChange={this.onChange}
                                    errors={errors.number}
                                    info="Enter a 10-digit number"/>

                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={user.position === "Recruiter" ? "ignore" : this.state.status}
                                    id={user.position === "Recruiter" ? "d-none" : ""}
                                    onChange={this.onChange}
                                    options={options}
                                    errors={errors.status}
                                    info="Give us an idea of where you are at in your career"/>

                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    errors={errors.company}
                                    info="Could be your own company or one you work for"/>

                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    errors={errors.website}
                                    info="Your website"/>

                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    errors={errors.location}
                                    info="Your location"/>

                                <TextFieldGroup
                                    placeholder="Skills"
                                    name="skills"
                                    value={user.position === "Recruiter" ? "ignore" : this.state.skills}
                                    id={user.position === "Recruiter" ? "d-none" : ""}
                                    onChange={this.onChange}
                                    errors={errors.skills}
                                    info="Your skills: please use comma separated values"/>

                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    errors={errors.githubusername}
                                    info="Your githubusername"/>

                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    errors={errors.bio}
                                    info="Please give us a brief description of what you do"/>

                                    <div className="mb-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }} className="btn btn-light">
                                            Add Social Network Links
                                        </button>
                                        <span className="text-muted">Optional</span>
                                    </div>
                                {SocialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));