const moneyBalance = document.querySelector('.tracker-total__money-balance');
const incomeValue = document.querySelector('.tracker-category__income-value');
const expenseValue = document.querySelector('.tracker-category__expense-value');
const historyList = document.querySelector('.tracker-history__list');
const addBtn = document.querySelector('.add-transaction');
const item = document.querySelector('.input-text');
const amount = document.querySelector('.input-amount');
const removeBtns = document.querySelectorAll('.del');

let dataListArr =[];

// 페이지 로드 시 저장 된 데이터 표시
function reLoad() {
    const savedData = JSON.parse(localStorage.getItem('data'));
    if (savedData !== null) {
        savedData.forEach((data) => {
            const newDiv = document.createElement('Div');
            const delBtn = document.createElement('span'); 
            const content = data.content;
            const money = data.money;
            const index = dataListArr.length;
        
            delBtn.setAttribute('class', 'del'); 
            historyList.appendChild(newDiv);
            newDiv.appendChild(delBtn);  
            newDiv.innerHTML = `${content} ₩ ${money} `; 
            delBtn.innerHTML = ` X` 				
            newDiv.appendChild(delBtn);
            delBtn.addEventListener('click',removeData); 
            newDiv.index = index;

            const newData = {index, content, money}
            dataListArr.push(newData);
            saveData();
        })
    }
  }

reLoad();

// '항목추가'클릭 시 내용, 금액 유효성 검사
addBtn.addEventListener('click', function() {
    if(item.value !== '' && amount.value !== '') {
        showList();
        item.value = '';
        amount.value = '';
    } else if(item.value === '') {
        alert ('내용을 입력해 주세요.');
    } else {
        alert ('금액을 입력해 주세요.');
    }
})

// 기록 누적하여 리스트 표시
function showList() {
    const newDiv = document.createElement('div');
    const delBtn = document.createElement('span'); 
    const content = item.value;
    const money = amount.value;
    const index = dataListArr.length;

    delBtn.setAttribute('class', 'del'); 
    historyList.appendChild(newDiv);
    newDiv.appendChild(delBtn);  
    newDiv.innerHTML = `${content} ₩ ${money} `; 
    delBtn.innerHTML = ` X` 				
    newDiv.appendChild(delBtn);
    delBtn.addEventListener('click',removeData); 
    newDiv.index = index;

    const newData = {index, content, money}
    dataListArr.push(newData);
    saveData();
}

function saveData() {
    localStorage.setItem('data', JSON.stringify(dataListArr));
    calcAmount();
}

// 현재 잔액, 수입, 지출 계산 및 표시
function calcAmount() {
    if(dataListArr !== null) {
    const amounts = JSON.parse(localStorage.getItem('data'));
    let balance = 0;
    let income = 0;
    let expense = 0;
    
    amounts.forEach((data) => {
        if (data.money > 0) {
            income += parseInt(data.money);
        } else {
            expense += parseInt(data.money);
        }
    });

    balance = income + expense;
    
    balance > 0 ? moneyBalance.innerHTML = `<font color='blue'> ₩ ${balance}</font>` 
    : moneyBalance.innerHTML = `<font color='red'> ₩ ${balance}</font>`
    incomeValue.innerHTML = `<font color='blue'> ₩ ${income}</font>`;
    expenseValue.innerHTML = `<font color='red'> ₩ ${expense * -1}</font>`;
    }
}

// 데이터 삭제
function removeData(btn) {
    const removeBtn = btn.target;
    historyList.removeChild(removeBtn.parentNode);
    let filtered = dataListArr.filter((data) => data.index !== removeBtn.parentNode.index);
    dataListArr = filtered;
    saveData();
}
