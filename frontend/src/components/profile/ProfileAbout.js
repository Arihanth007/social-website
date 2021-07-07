import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class ProfileAbout extends Component {
    render() {
        const {profile} = this.props.profile;
        const firstName = profile.user.name.trim().split(' ')[0];
        const skills = profile.skills.map((skill, index) => (
            <div className="p-3" key={index}>
                <i className="fa fa-check"/>{skill}
            </div>
        ));

        return (
            <div className="profile-about bg-light p-2">
                <h2 className="text-info">{firstName}'s bio</h2>
                {isEmpty(profile.bio) ? (<p>{firstName} doesn't have a bio.</p>) : (<p>{profile.bio}</p>)}
                <div className="line"/>
                <h2 className="text-info">Skill Set</h2>
                <div className="skills">{skills}</div>
            </div>
        );
    }
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(ProfileAbout);