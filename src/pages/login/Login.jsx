import React, {useEffect, useState} from "react";
import Text from "../../components/input/Text.jsx";
import icon from "../../assets/images/icon.svg";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Alert from "../../components/alert/Alert.jsx";

const Login = () => {
    const navigate = useNavigate();
    // state
    const [idValue, setIdValue] = useState(''); // id
    const [passwordValue, setPasswordValue] = useState(''); // password
    const [showAlert, setShowAlert] = useState(false); // alert
    const [alertMessage, setAlertMessage] = useState(''); // alert 메세지

    // ========== function ==========
    // 아이디 입력 초기화
    const handleIdDelete = () => {
        setIdValue('');
    }
    // 비밀번호 입력 초기화
    const handlePasswordDelete = () => {
        setPasswordValue('');
    }
    // 로그인 클릭
    const validateInput = (value, fieldName) => {
        if (!value) {
            setAlertMessage(`${fieldName}을(를) 입력하세요.`);
            setShowAlert(true);
            return false;
        }
        return true;
    };
    const handleLoginClick = async () => {
        // ID, PW 유효성 체크
        if (!validateInput(idValue, 'ID') || !validateInput(passwordValue, '비밀번호')) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                userId: idValue,
                password: passwordValue
            });
            if (response.data === "success") {
                navigate('/home');
            } else {
                setAlertMessage('ID 또는 비밀번호가 틀렸습니다.');
                setShowAlert(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="loginContainer">
                <p className="title"><b>ICTK</b> TODO</p>
                <Text
                    value={idValue}
                    onChange={(e) => setIdValue(e.target.value)}
                    // option
                    label={"ID"}
                    onDelete={handleIdDelete} // 텍스트 초기화 버튼 활성화
                    borderColor={"#0056ff"}
                    setStyle={"inside"} // 스타일 지정 ("outside"가 기본값)
                    setIcon={[icon, "아이콘"]} // 스타일이 "icon"일 경우 icon 지정
                    className={"loginInput"} // 추가 스타일
                />
                <Text
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    // option
                    label={"PW"}
                    onDelete={handlePasswordDelete} // 텍스트 초기화 버튼 활성화
                    borderColor={"#0056ff"}
                    setStyle={"inside"} // 스타일 지정 ("outside"가 기본값)
                    setIcon={[icon, "아이콘"]} // 스타일이 "icon"일 경우 icon 지정
                    type="password"
                    className={"loginInput"}
                />
                <Button
                    label={"LOGIN"}
                    type={"primary"}
                    onClick={handleLoginClick}
                />
            </div>

            {showAlert &&
                <Alert
                    setShowAlert={setShowAlert}
                    message={alertMessage} />
            }
        </>
    )
}

export default Login;