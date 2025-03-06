import React from 'react';
// style
import '../../style/input/checkbox.css';

const Checkbox = ({ id, checked = false, label, className, ...props }) => {
    return (
        <>
            <input
                type="checkbox"
                id={id}
                defaultChecked={checked}
                className="checkbox"
                {...props}
            />
            <label
                htmlFor={id}
                className={`checkboxLabel ${className !== undefined ? className : ''}`}
            >{label}</label>
        </>
    )
}

export default Checkbox;