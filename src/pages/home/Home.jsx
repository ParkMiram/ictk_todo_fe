import React, {useEffect, useState} from "react";
import Calendar from "../../components/Calendar.jsx";
// style
import '../../style/home/home.css';
import Todo from "./Todo.jsx";
import logo from '/src/assets/images/logo.png';
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import Confirm from "../../components/alert/Confirm.jsx";

const Home = () => {
    const navigate = useNavigate();

    // state
    const [selectedDate, setSelectedDate] = useState(
        new Date().getUTCFullYear() + "-" +
        String(new Date().getMonth()+1).padStart(2, '0') + "-" +
        String(new Date().getDate()).padStart(2, '0'));
    const [showConfirm, setShowConfirm] = useState(false); // confirm
    const [confirmMessage, setConfirmMessage] = useState(''); // confirm 메세지
    const [isConfirm, setIsConfirm] = useState(false); // confirm 확인 여부

    // 로그아웃
    const handleLogoutClick = () => {
        setConfirmMessage('로그아웃하시겠습니까?');
        setShowConfirm(true);
    }

    useEffect(() => {
        if (isConfirm) {
            navigate('/');
        }
    }, [isConfirm, navigate, selectedDate])

    return (
        <>
            <div className="homeContainer">
                <div className="homeWrap">
                    <div className="header">
                        <div className="logo">
                            <img src={logo} alt="logo"/>
                            <b>ICTK</b>
                        </div>
                        <div className="logout">
                            <Button
                                label={"⏻"}
                                onClick={handleLogoutClick}
                            />
                        </div>
                    </div>
                    <Calendar
                        setDate={setSelectedDate}
                    />
                    <Todo
                        selectedDate={selectedDate}
                    />
                </div>
            </div>

            {showConfirm &&
                <Confirm
                    setShowConfirm={setShowConfirm}
                    message={confirmMessage}
                    setIsConfirm={setIsConfirm}
                    title={"⏻ 로그아웃"}
                    button={"로그아웃"}
                    type={"warning"}
                />
            }
        </>


    )
}

export default Home;