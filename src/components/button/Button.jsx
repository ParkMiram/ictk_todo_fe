import React from "react";
// style
import '../../style/button/button.css';

const Button = ({ label, type, className, ...props }) => {
    /*
        type 종류
        1. primary - 기본
        2. sub - 서브
        3. warning - 위험(삭제)
     */
    return (
        <div
            className={`buttonWrap ${className !== undefined ? className : ''}`}
        >
            <button
                className={`button ${type !== undefined ? type : ''}`}
                {...props}
            >
                {label}
            </button>
        </div>
    )
}

export default Button;