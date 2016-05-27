
var btArry = [];

var localArry = JSON.stringify(btArry) 

localStorage.setItem('userHistory',localArry);


btArry = JSON.parse(localStorage.getItem('userHistory'));
