import '../../style/home/todo.css';
import Checkbox from "../../components/input/Checkbox.jsx";
import Button from "../../components/button/Button.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Confirm from "../../components/alert/Confirm.jsx";
import Alert from "../../components/alert/Alert.jsx";
import Text from "../../components/input/Text.jsx";

const Todo = ({ selectedDate }) => {
    // state
    const [todos, setTodos] = useState([]); // todo 리스트
    const [todoId, setTodoId] = useState(null); // todoID
    const [showConfirm, setShowConfirm] = useState(false); // confirm
    const [confirmMessage, setConfirmMessage] = useState(''); // confirm 메세지
    const [isConfirm, setIsConfirm] = useState(false); // confirm 확인 여부
    const [showAlert, setShowAlert] = useState(false); // alert
    const [alertMessage, setAlertMessage] = useState(''); // alert 메세지
    const [showAddTodo, setShowAddTodo] = useState(false); // 생성 버튼
    const [todoTitle, setTodoTitle] = useState(''); // 투두명 (생성)

    // 조회
    const fetchTodos = async () => {
        try {
            // TODO userId 받아오는 거 만들기
            const response = await axios.get(`http://localhost:8080/todos/1?todoDate=${selectedDate}`);
            setShowAddTodo(false);
            setTodos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // 생성
    const toggleAddTodo = () => {
        setTodoTitle('');
        setShowAddTodo(!showAddTodo);
    };
    // 유효성 체크
    const validateTodo = () => {
        if (!todoTitle) {
            setAlertMessage("투두명을 입력하세요.");
            setShowAlert(true);
            return false;
        }
        return true;
    };
    const addTodo = async () => {
        // 투두명 유효성 체크
        if (!validateTodo()) {
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/todos/1`, {
                todoTitle: todoTitle.trim(),
                todoDate: selectedDate
            });
            if (response.data === "success") {
                setTodoTitle('');
                setShowAddTodo(false);
                await fetchTodos();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 수정
    const updateTodo = async (todoId, newTitle, completed) => {
        try {
            const response = await axios.put(`http://localhost:8080/todos/${todoId}`, {
                todoTitle: newTitle.trim(),
                completed: completed
            });
            if (response.data === "success") {
                await fetchTodos();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 투두명 수정
    const modifyTodo = (todoId, title) => {
        setTodos(todos.map(todo =>
            todo.todoId === todoId ? { ...todo, isEditing: true, orgTodoTitle: title } : todo
        ));
    };

    // 투두명 수정 취소
    const cancelModifyTodo = (todoId) => {
        setTodos(todos.map(todo =>
            todo.todoId === todoId ? { ...todo, isEditing: false, orgTodoTitle: '' } : todo
        ));
    };

    // 삭제
    const deleteTodo = async (todoId, todoTitle) => {
        setTodoId(todoId);
        setConfirmMessage(`${todoTitle}을(를) 삭제하시겠습니까?`);
        setShowConfirm(true);
    };

    // useEffect
    useEffect(() => {
        fetchTodos();
    }, [selectedDate]);

    useEffect(() => {
        if (isConfirm && todoId !== null) {
            const deleteTodoAsync = async () => {
                try {
                    const response = await axios.delete(`http://localhost:8080/todos/${todoId}`);
                    if (response.data === "success") {
                        setShowAlert(true);
                        setAlertMessage('삭제되었습니다.');
                        setIsConfirm(false);
                        fetchTodos();
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            deleteTodoAsync();
        }
    }, [isConfirm, todoId]);

    return (
        <>
            <div className="todoContainer">
                <div className="titleWrap">
                    <p className="title">✍️ <span>TODO</span> LIST</p>
                    <Button
                        label={showAddTodo ? "취소" : "➕"}
                        type={'sub'}
                        onClick={toggleAddTodo}
                        className="addTodoButton"
                    />
                </div>
                <ul className="todoList">
                    {
                        todos.length > 0 || showAddTodo ?
                            todos.map((todo) => (
                                <li key={todo?.todoId} className="todoItem">
                                    {
                                        !todo.isEditing ?
                                            <>
                                                <div className="flex">
                                                    <Checkbox
                                                        id={todo?.todoId}
                                                        label={todo?.todoTitle}
                                                        checked={todo?.completed}
                                                        onClick={() => updateTodo(todo?.todoId, todo?.todoTitle, !todo?.completed)}
                                                        className={"todoCheckLabel"}
                                                    />
                                                    <Button
                                                        label={"✏️"}
                                                        type={'sub'}
                                                        className={"mdfTodo"}
                                                        onClick={() => modifyTodo(todo?.todoId, todo?.todoTitle)}
                                                    />
                                                </div>
                                                <Button
                                                    label={"🆇"}
                                                    onClick={() => deleteTodo(todo?.todoId, todo?.todoTitle)}
                                                    className={"deleteTodo"}
                                                />
                                            </>
                                            :
                                            <>
                                                <Text
                                                    value={todo.orgTodoTitle}
                                                    onChange={(e) => setTodos(todos.map(todoItem =>
                                                        todoItem.todoId === todo.todoId
                                                            ? { ...todoItem, orgTodoTitle: e.target.value }
                                                            : todoItem
                                                    ))}
                                                    label={"투두명"}
                                                    onDelete={() => setTodos(todos.map(todoItem =>
                                                        todoItem.todoId === todo.todoId
                                                            ? { ...todoItem, orgTodoTitle: '' }
                                                            : todoItem
                                                    ))}
                                                    setStyle={"outsideLeft"}
                                                    className={"addTodoItem"}
                                                    borderColor={"#0056ff"}
                                                />
                                                <Button
                                                    label={"취소"}
                                                    type={"sub"}
                                                    onClick={() => cancelModifyTodo(todo?.todoId)}
                                                />
                                                <Button
                                                    label={"수정"}
                                                    type={"primary"}
                                                    onClick={() => updateTodo(todo?.todoId, todo?.orgTodoTitle, todo?.completed)}
                                                />
                                            </>
                                    }
                                </li>
                            ))
                            :
                            <div>
                                <p className="noTodo">TODO가 없습니다.</p>
                            </div>
                    }
                    {
                        showAddTodo ?
                            <li className="todoItem">
                                <Text
                                    value={todoTitle}
                                    onChange={(e) => setTodoTitle(e.target.value)}
                                    label={"투두명"}
                                    onDelete={() => setTodoTitle('')}
                                    setStyle={"outsideLeft"}
                                    className={"addTodoItem"}
                                />
                                <Button
                                    label={"등록"}
                                    type={"primary"}
                                    onClick={addTodo}
                                />
                            </li>
                            : <></>
                    }
                </ul>
            </div>

            {showConfirm &&
                <Confirm
                    setShowConfirm={setShowConfirm}
                    message={confirmMessage}
                    setIsConfirm={setIsConfirm}
                    title={"🗑️ TODO 삭제"}
                    button={"삭제"}
                    type={"warning"}
                />
            }
            {showAlert &&
                <Alert
                    setShowAlert={setShowAlert}
                    message={alertMessage}
                />
            }
        </>
    );
};

export default Todo;
