import React from 'react'
import './dropdown.scss'

const Dropdown = (props) => {
    const _top = props.toggle ? props.openPos : props.closedPos;
    const _left = props.left;
    const _width = props.width;
    const _height = props.toggle ? props.height : null;
    const styles = {
        top : _top,
        width: _width,
        height: _height,
        left: _left
    };

    return (
        <div className={`sf-overhead-dropdown${props.toggle ? ' opened' : ''} ${props.dark ? ' dark' : ''}`} style={ styles }>
            {
                props.children
            }
        </div>
    )
};

export {Dropdown};