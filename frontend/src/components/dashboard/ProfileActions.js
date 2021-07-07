import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileActions = ({id}) => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"/> Edit Profile</Link>
            <span className={id}>
                <Link to="/add-experience" className="btn btn-light">
                    <i className="fab fa-black-tie text-primary"/> Add Experience</Link>
                <Link to="/add-education" className="btn btn-light">
                    <i className="fas fa-graduation-cap text-primary"/> Add Education</Link>
            </span>
        </div>
    );
}

ProfileActions.propTypes = {
    id: PropTypes.string,
}

ProfileActions.defaultProps = {
    type: 'text'
}

export default ProfileActions;