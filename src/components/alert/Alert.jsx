// style
import '../../style/alert/alertCommon.css'
import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";

const Alert = ({ setShowAlert, message, title="📢 알림", ...props}) => {
    // state
    const [isExiting, setIsExiting] = useState(false);

    // 확인 버튼 클릭
    const handleClose = () => {
        setIsExiting(true);
    };

    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isExiting, setShowAlert]);

    return (
        <div className="overlay">
            <div className={`alertContainer ${isExiting ? 'hidden' : ''}`}>
                <p className="alertTitle">{title}</p>
                <p className="alertMessage">{message}</p>
                <Button
                    label={"확인"}
                    type={"sub"}
                    onClick={handleClose}
                    {...props}
                />
            </div>
        </div>
    )
}

export default Alert;