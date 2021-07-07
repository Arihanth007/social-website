import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
    render() {
        const {profile} = this.props.profile;

        return (
            <div className="profile-grid my-1">
                <div className="profile-top bg-info p-2">
                    <img
                        className="round-img my-1"
                        src={profile.user.avatar}
                        alt="DP"
                    />
                    <h1 className="large text-light">{profile.user.name}</h1>
                    <p className="lead text-light">{profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
                    <p>{isEmpty(profile.location) ? null : (<span className="text-light">{profile.location}</span>)}</p>
                    <div className="icons my-1">
                        {isEmpty(profile.website) ? null : (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-globe fa-2x"/>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.twitter) ? null : (
                            <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter fa-2x"/>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.facebook) ? null : (
                            <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook fa-2x"/>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.linkedin) ? null : (
                            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin fa-2x"/>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.youtube) ? null : (
                            <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-youtube fa-2x"/>
                            </a>
                        )}
                        {isEmpty(profile.social && profile.social.instagram) ? null : (
                            <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram fa-2x"/>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

ProfileHeader.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(ProfileHeader);