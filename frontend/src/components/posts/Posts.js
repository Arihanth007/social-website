import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/spinner';
import PostFrom from "./PostFrom";

class Posts extends Component {
    render() {
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostFrom/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Posts;