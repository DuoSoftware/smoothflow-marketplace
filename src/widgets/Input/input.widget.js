import React from 'react';
import './input.scss';

const Input = (props) => {
    let elem = null;

    switch (props.type) {
        case ('input'):
            elem = <input {...props} />;
            break;
        case ('textarea'):
            elem = <textarea {...props} />;
            break;
        default:
            elem = <input {...props} />;
            break;
    }

    return (
        <div className="sf-input-block">
            <label>{props.label}</label>
            { elem }
        </div>
    )
};

export default Input;