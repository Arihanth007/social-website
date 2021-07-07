import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    id,
    errors,
    info,
    onChange,
}) => {
    return (
        <div className="form-group" style={{marginTop: '20px', marginBottom: '20px'}}>
            <div className={id}>
                <textarea
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors
                    })}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {info && <small className="form-text text-muted">{info}</small>}
                {errors && (<div className="invalid-feedback">{errors}</div>)}
            </div>
        </div>
    );
}

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    id: PropTypes.string,
    errors: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default TextAreaFieldGroup;