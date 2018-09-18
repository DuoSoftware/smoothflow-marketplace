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
        case ('checkbox'):
            elem =  <div style={{display:'inline-block'}}>
                        <input {...props} />
                        <label for={props.id}>{props.label}</label>
                    </div>
            break;
        default:
            elem = <input {...props} />;
            break;
    }

    return (
        <div className={props.inputBlock ? 'sf-input-block' : null}>
            { props.type !== 'checkbox' && props.label ? <label>{props.label}</label> : null }
            { elem }
        </div>
    )
};

export default Input;