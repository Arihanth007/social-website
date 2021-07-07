import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    id,
    errors,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group" style={{marginTop: '20px', marginBottom: '20px'}}>
            <div className={id}>
                <input
                    type={type}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors
                    })}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
                {info && <small className="form-text text-muted">{info}</small>}
                {errors && (<div className="invalid-feedback">{errors}</div>)}
            </div>
        </div>
    );
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    errors: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;