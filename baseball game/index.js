let selectNums = document.querySelector('#select-number');
let userNums = document.querySelector('#user-number');
let totalScore = document.querySelector('#score');
let remainCount = document.querySelector('#remain-count');
const userNumbers = document.querySelector('#user-number');

let answerNums = [];

reloadGame();
function reloadGame() {  // 정답 숫자 랜덤 생성 및 카운트 초기화 
    let numsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];  // 랜덤으로 선택할 숫자 배열
    for (let i=0; i<3; i++) { // 정답 자리수 만큼 반복
        let randomindex = numsList.splice(Math.floor(Math.random() * numsList.length), 1);  // numsList 배열에서 랜덤으로 하나의 요소를 추출한 배열
        answerNums[i] = randomindex; // 추출한 숫자를 i번째 정답 숫자로 할당
    }
    remainCount.innerHTML = 10;  // 게임 횟수 초기화
}

console.log(answerNums.join(""));

selectNums.addEventListener('change', checkOverlap); // 사용자 입력창에 숫자 입력 시 중복된 숫자 사용 여부 확인 함수 실행
selectNums.addEventListener('change', checkNums);  // 사용자 입력창에 숫자 입력 시 번호 유효성 검사 함수 실행 

function checkOverlap() {  // 사용자 입력 번호 숫자 중복 사용 여부 확인 함수 예) 112, 202
    let overlapStr = document.getElementById('select-number').value; // 입력값 문자열 가져오기
    for(let i=0; i<overlapStr.length; i++) {
        for(let j=i+1; j<overlapStr.length; j++) { // 중복 여부 체크 
            if(overlapStr[i] === overlapStr[j]) { // 중복한다면 
                return true; // true 반환
            } 
        }
    }
}

function checkNums() {  // 사용자가 입력한 번호 유효성 검사 함수
    const numCondition = /^[0-9]*$/;  // 숫자 정규표현식
    if(!numCondition.test(selectNums.value) || selectNums.value.length !== 3 || checkOverlap()) { 
        alert('중복되지 않는 3자리 숫자만 입력 가능합니다.'); // 얼럿 표시
        selectNums.value=""; // 사용자 입력번호 초기화
        selectNums.focus(); // 사용자 입력창 포커스 
    } else { 
        playGame(); // 정답 확인 및 남은 횟수 카운트 함수 실행 
    }
}

function playGame() { // 정답 확인 및 남은 횟수 카운트 함수
    if (remainCount.innerHTML > 1 && answerNums.join("") !== selectNums.value) { // 남은 횟수가 1이상 이고 정답을 맞추지 못했다면 
        remainCount.innerHTML = remainCount.innerHTML - 1;  // 카운트 1회 줄어듦
        var userNumsText = document.createTextNode(`${selectNums.value}\n`);
        userNumbers.appendChild(userNumsText);
        countScore();  // 점수 계산 함수 실행 
    } else if (selectNums.value === answerNums.join("")){  // 정답을 맞췄다면
        alert(`You win! :)`);  // 얼럿 표시 
        location.reload(); // 게임 새로고침 
    } else {  // 10회 소진 및 정답 맞추지 못했다면
        alert(`You lose :( The answer is '${answerNums.join("")}'`);  //얼럿 표시 
        location.reload(); // 게임 새로고침
    }
}

function countScore() { // 스트라이크, 볼, 아웃 계산 및 표시 함수
    strikeCount = 0; // 스트라이크 점수 초기화
    ballCount = 0; // 스트라이크 점수 초기화
    for(let i=0; i<answerNums.length; i++) {
        if(answerNums[i] == selectNums.value[i]){  // 정답의 i번째 요소와 사용자 번호의 i번째 요소가 동일하다면(스트라이크라면)
            strikeCount += 1; // 스트라이크 점수에 1 추가
        } else { // 스트라이크를 제외하고 
            for(let j=0; j<answerNums.length; j++) {  
                if (answerNums[i] == selectNums.value[j]) { // 정답의 i번째 요소와 사용자 번호의 0~2번째 요소가 동일하다면(볼이라면)
                   ballCount += 1; // 볼 점수에 1 추가
                }
            }
        }
    }

    selectNums.value="";  // 사용자 입력번호 초기화
    selectNums.focus(); // 사용자 입력창 포커스

    if (strikeCount !== 0 || ballCount !== 0) { // 스트라이크, 볼 중 하나라도 0이 아니면
        totalScore.innerHTML = `Strike: ${strikeCount}, Ball: ${ballCount}`; // 스트라이크, 볼 점수 표시
    } else { // 둘 다 0이라면
        totalScore.innerHTML = `OUT!` // out 표시
    }
}