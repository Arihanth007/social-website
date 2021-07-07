import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from '../common/spinner';
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick(e){
        this.props.deleteAccount();
    }

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner/>;
        } else {
            // Check if user has profile data
            if(Object.keys(profile).length > 0) {
                let otherFields;
                if (user.position !== "Recruiter") {
                    otherFields = (
                        <div>
                            <Experience experience={profile.experience}/>
                            <Education education={profile.education}/>
                        </div>
                    );
                } else {
                    otherFields = null;
                }
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link>
                        </p>
                        <ProfileActions id={user.position === "Recruiter" ? "d-none" : ""}/>

                        {otherFields} 

                        <div style={{ marginBottom: '60px', marginTop: '50px' }}>
                            <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>
                                Delete account
                            </button>
                        </div>
                    </div>
                );
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome { user.name }</p>
                        <p>Please setup your profile</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="display-4">Dashboard</h4>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);