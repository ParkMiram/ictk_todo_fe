#### ICTK 코드 리뷰
<sub>이틀동안 만든 거라 부족한 점이 많습니다.</sub>

## 1. 시연 영상 (47초)

https://github.com/user-attachments/assets/4a853561-82a2-46c6-9331-0aff40d78e9c

<img width="691" alt="image" src="https://github.com/user-attachments/assets/c143c4d4-876b-46c2-88a9-45db5e164b8a" />

<br/>
<br/>

## 2. 컴포넌트 소개
### 1️⃣ Text
<img width="890" alt="image" src="https://github.com/user-attachments/assets/cb6a683c-c853-4423-acea-823b5698f127" />


#### 🖥️ 코드 사용 예시
* 사용 시 필요한 import
```javascript
import Text from "../../components/input/Text.jsx"; // --- Text 컴포넌트 호출
import icon from "../../assets/images/icon.svg";    // --- Text 스타일이 "icon"일 경우 사용할 이미지 (svg 추천)
```
* 사용 시 필요한 state
```javascript
const [text, setText] = useState(''); // --- input 값을 설정해 주는 state
```
* 사용 방법 (jsx)
```javascript
<Text
    value={text}                              // --- input 값
    onChange={(e) => setText(e.target.value)} // --- input 값 변경
    label={"Text"}                            // --- label 지정
    onDelete={() => setText('')}              // --- (선택) input 값 초기화 버튼
    borderColor={"#0056ff"}                   // --- (선택) 클릭 시 border 색상
    setStyle={"inside"}                       // --- Text 스타일 선택 (기본값: outside)
    setIcon={[icon, "아이콘"]}                  // --- (선택) 스타일이 "icon"일 경우 icon 지정 [아이콘파일명, "아이콘명"] (기본값: basic, '기본 아이콘')
    className={"textCss"}                     // --- (선택) 추가 css
    readOnly                                  // --- (선택) 또는 disabled
/>
```
##### 👉 Text 컴포넌트 코드 https://github.com/ParkMiram/ictk_todo_fe/blob/main/src/components/input/Text.jsx


<br/>

### 2️⃣ Button
<img width="1103" alt="image" src="https://github.com/user-attachments/assets/42b69106-d83a-463e-ac89-595c84727108" />

#### 🖥️ 코드 사용 예시
* 사용 시 필요한 import
```javascript
import Button from "../../components/button/Button.jsx"; // --- Button 컴포넌트 호출
```
* 사용 방법 (jsx)
```javascript
<Button
    label={"Text"}         // --- label 지정
    type={"primary"}       // --- Button 타입(스타일) 선택
    onClick={handleButton} // --- (선택) Button 클릭 시 작동하는 이벤트
/>
```
##### 👉 Button 컴포넌트 코드 https://github.com/ParkMiram/ictk_todo_fe/blob/main/src/components/button/Button.jsx

<br/>

### 3️⃣ Alert
<img width="760" alt="image" src="https://github.com/user-attachments/assets/ee299e2a-43c0-4d05-8f0f-7997dd031fdd" />

#### 🖥️ 코드 사용 예시
* 사용 시 필요한 import
```javascript
import Alert from "../../components/alert/Alert.jsx"; // --- Alert 컴포넌트 호출
```
* 사용 시 필요한 state
```javascript
const [showAlert, setShowAlert] = useState(false);    // --- Alert 노출 여부
const [alertMessage, setAlertMessage] = useState(''); // --- Alert 메세지
```
* 사용 방법
```javascript
const hanldeAlert = (fieldName) => {
    setAlertMessage(`${fieldName}을(를) 입력하세요.`); // --- Alert 메세지 설정
    setShowAlert(true);                            // --- Alert 노출 true
};
```
* 사용 방법 (jsx)
```javascript
{showAlert &&
    <Alert
        setShowAlert={setShowAlert}
        message={alertMessage}
        title={"알럿"}               // --- (선택) Alert 제목 설정 (기본값: "📢 알림")
    />
}
```
##### 👉 Alert 컴포넌트 코드 https://github.com/ParkMiram/ictk_todo_fe/blob/main/src/components/alert/Alert.jsx

<br/>

### 4️⃣ Confirm
<img width="1449" alt="image" src="https://github.com/user-attachments/assets/f875fb18-90c3-4006-8796-2964011cd1ca" />


#### 🖥️ 코드 사용 예시
* 사용 시 필요한 import
```javascript
import Confirm from "../../components/alert/Confirm.jsx"; // --- Confirm 컴포넌트 호출
```
* 사용 시 필요한 state
```javascript
const [showConfirm, setShowConfirm] = useState(false);    // --- Confirm 노출 여부
const [confirmMessage, setConfirmMessage] = useState(''); // --- Confirm 메세지
const [isConfirm, setIsConfirm] = useState(false);        // --- Confirm에서 확인 버튼 눌렀을 경우 true
```
* 사용 방법
```javascript
const hanldeConfirm = () => {
    setConfirmMessage("정말입니까?"); // --- Confirm 메세지 설정
    setShowConfirm(true);          // --- Confirm 노출 true
};
```
* 사용 방법 (jsx)
```javascript
{showConfirm &&
    <Confirm
        setShowConfirm={setShowConfirm}
        message={confirmMessage}
        setIsConfirm={setIsConfirm}
        title={"컨펌"}                   // --- (선택) Confirm 제목 설정 (기본값: "📢 알림")
        button={"확인"}                  // --- 버튼 텍스트 설정
        type={"warning"}                // --- Button 타입(스타일) 선택
    />
}
```
##### 👉 Confirm 컴포넌트 코드 https://github.com/ParkMiram/ictk_todo_fe/blob/main/src/components/alert/Confirm.jsx

<br/>

### 5️⃣ Checkbox
<img width="360" alt="image" src="https://github.com/user-attachments/assets/9636a074-4702-4610-96f9-616f27678453" />


#### 🖥️ 코드 사용 예시
* 사용 시 필요한 import
```javascript
import Checkbox from "../../components/input/Checkbox.jsx"; // --- Checkbox 컴포넌트 호출
```
* 사용 방법 (jsx)
```javascript
<Checkbox
    id={"check1"}                           // --- Checkbox id 지정
    label={"Git 커밋하기"}                    // --- label 지정
    checked={false}                         // --- (선택) checked 여부 (기본값: false)
    onClick={() => handleCheckbox(checkId)} // --- (선택) Checkbox 클릭 시 작동하는 이벤트
    className={"todoCheckLabel"}            // --- (선택) 추가 css
/>
```
##### 👉 Checkbox 컴포넌트 코드 https://github.com/ParkMiram/ictk_todo_fe/blob/main/src/components/input/Checkbox.jsx

<br/>
<br/>

## 3. 그 외 코드 리뷰
### 1️⃣ 로그인 시 서버에서 Token을 발급 받아 Token으로 사용자를 인증합니다.
* navigation을 통해 router.param에 담겨진 token을 전달 받습니다.
<p>👉 (사용된 예시 코드 : https://github.com/ParkMiram/fe-click-bank/blob/dev/page/friend/MyFriend.tsx)</p>
<br/>

```javascript
export default function MyFriend({ navigation, route }: any) {
    const { token } = route.params;                // --- 이전 화면에서 navigation을 통해 전달받은 Token
    const bearerToken: string = `Bearer ${token}`; // --- Authorization 헤더에서 사용되는 인증 방식으로 변경
    ...
    // (생략)
}
```

```javascript
const response: AxiosResponse<any, any> = await axios.get('https://just-click.shop/api/v1/friends', {
    headers: {
        Authorization: bearerToken // --- Token으로 사용자 인증
    }
});
```
