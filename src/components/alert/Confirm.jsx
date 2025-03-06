import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";
// style
import '../../style/alert/alertCommon.css';
import '../../style/alert/confirm.css';

const Confirm = ({ setShowConfirm, message, title="📢 알림", label, setIsConfirm, ...props}) => {
    // state
    const [isExiting, setIsExiting] = useState(false);

    // 닫기 버튼 클릭
    const handleClose = () => {
        setIsExiting(true);
    };

    // 확인 버튼 클릭
    const handleConfirm = () => {
        setIsExiting(true);
        setIsConfirm(true);
    }

    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => {
                setShowConfirm(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isExiting, setShowConfirm]);

    return (
        <div className="overlay">
            <div className={`alertContainer ${isExiting ? 'hidden' : ''}`}>
                <p className="alertTitle">{title}</p>
                <p className="alertMessage">{message}</p>
                <div className="confirmButton">
                    <Button
                        label={"취소"}
                        type={"sub"}
                        onClick={handleClose}
                        {...props}
                    />
                    <Button
                        label={label}
                        type={"warning"}
                        onClick={handleConfirm}
                        {...props}
                    />
                </div>
            </div>
        </div>
    )
}

export default Confirm;