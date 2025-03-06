import React, { useRef } from "react";
// style
import '../../style/input/inputCommon.css';
import '../../style/input/text.css';
import '../../style/login/login.css';
// img
import basic from '../../assets/images/icon.svg';
import init from '../../assets/images/delete.svg';

const Text = ({ value, label, borderColor, setStyle, onDelete, setIcon, disabled, readOnly, className, ...props }) => {

    // borderColor
    const handleFocus = (event) => {
        event.currentTarget.style.borderColor = `${borderColor}`;
        event.currentTarget.style.transition = "0.1s ease-in-out";

        const inputElement = event.currentTarget.parentElement?.querySelector('input')
        if (inputElement && (inputElement.readOnly || inputElement.disabled)) {
            event.currentTarget.style.borderColor = "";
        }
    };

    const handleBlur = (event) => {
        event.currentTarget.style.borderColor = "";
        event.currentTarget.style.transition = "0.1s ease-in-out";
    };

    // input에 접근
    const inputRef = useRef(null);

    // 삭제 버튼을 눌러도 input에 focus 유지
    const handleButtonClickFocusInput = () => {
        onDelete && onDelete();
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // setStyle
    const styleType = ["outside", "outsideLeft", "inside", "icon"];
    let appliedStyle = "outside"; // 기본값 설정
    for (const type of styleType) {
        if (setStyle === type) {
            appliedStyle = type;
            break;
        }
    }

    // setIcon
    const iconSrc = setIcon ? setIcon[0] : basic; // 기본 아이콘 설정
    const iconAlt = setIcon ? setIcon[1] : '기본 아이콘'; // 기본 텍스트 설정

    return (
        <>
            <div className={`textContainer ${appliedStyle} ${className !== undefined ? className : ''}`}>
                {
                    appliedStyle === "outside" || appliedStyle === "outsideLeft" ?
                        <label className="label">{label}</label>
                        : <></>
                }
                <div
                    className="textWrap"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    {
                        appliedStyle === "inside" ?
                            <label className="label">{label}</label>
                            : appliedStyle === "icon" ?
                                <img
                                    className="label"
                                    src={iconSrc}
                                    alt={iconAlt}
                                />
                                : <></>
                    }
                    <div
                        className="flexHorizonCenter"
                        style={{ width: '100%' }}
                    >
                        <input
                            type="text"
                            className="textInput"
                            value={value}
                            {...props}
                            ref={inputRef}
                            disabled={disabled}
                            readOnly={readOnly}
                        />
                        {
                            // value 삭제 버튼
                            !disabled && !readOnly ?
                                onDelete ? value.length <= 0 ? <></> :
                                        <button
                                            className="delete"
                                            onClick={handleButtonClickFocusInput}
                                        >
                                            <img src={init} alt="delete" className="deleteIcon" />
                                        </button>
                                    : <></>
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Text;
