const users = [
    { name: 'Jason', money: 2435},
    { name: 'Olson', money: 4466},
    { name: 'Jake', money: 2124},
    { name: 'Kasey', money: 6849},
];
  
const dummyData = [
    { name: 'Liam', money: 9732},
    { name: 'Emma', money: 5432},
    { name: 'Ava', money: 1923},
    { name: 'Sophia', money: 345},
    { name: 'Henry', money: 7843},
    { name: 'Charlotte', money: 2883},
    { name: 'Amelia', money: 2112},
    { name: 'Harper', money: 673},
    { name: 'Lucas', money: 932},
    { name: 'Benjamin', money: 4932},
    { name: 'Mason', money: 709},
    { name: 'Ethan', money: 3843},
];
  
const addUserBtn = document.querySelector('.addUser');
const removeUserBtn = document.querySelector('.removeUser');
const addHundredBtn =  document.querySelector('.addHundred');
const addThousandsBtn = document.querySelector('.addThousands');
const addTenThousandsBtn = document.querySelector('.addTenThousands');
const sortUserBtn = document.querySelector('.sortUser');
const sumMoneyBtn = document.querySelector('.sumMoney');
const sumResult = document.querySelector('.sum-money__total');

function showUser() {
    const userContainer = document.querySelector('.user-list');
    while (userContainer.hasChildNodes()) {
        userContainer.removeChild(userContainer.lastChild);
    }
    for(const user of users) {
        const newDiv = document.createElement('div')
        userContainer.appendChild(newDiv);
        newDiv.innerHTML = `${user.name} $ ${user.money}`;
    }
}
  
showUser();
  
addUserBtn.onclick = function() {
    if(dummyData.length > 0) {
        users.push(dummyData.shift());
        showUser();
    } else {
        alert("User doesn't exist.")
    }
}
  
removeUserBtn.onclick = function() {
    if(users.length > 0) {
        dummyData.unshift(users.pop());
        showUser();   
    } else {
        alert("User doesn't exist.")
        location.reload();
    }
}
  
function addMoney(value) {
    for(const user of users) {
        user.money += value;
    }
    showUser();  
}
  
addHundredBtn.onclick = () => addMoney(100);
addThousandsBtn.onclick = () => addMoney(1000);
addTenThousandsBtn.onclick = () => addMoney(10000);
  
sortUserBtn.onclick = function() {
    users.sort((a, b) => a.money - b.money );
    showUser();
}
  
sumMoneyBtn.onclick = function() {
    sumResult.innerHTML =
    users.reduce((pre,curr) => pre + curr.money,0);
}