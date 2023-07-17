var user = {
  name: '류건모',
  password: '********',
  email: 'user@example.com',
  phone: '010-1234-5678',
};
var counselingRecords = [
  {
    date: '2023-07-01',
    time: '3교시',
  },
  {
    date: '2023-07-03',
    time: '3교시',
  },
  {
    date: '2023-07-05',
    time: '3교시',
  },
  {
    date: '2023-07-05',
    time: '3교시',
  },
];


// 사용자 정보 출력
document.getElementById('user_passwd').textContent = user.password;
document.getElementById('user_email').textContent = user.email;
document.getElementById('user_phone').textContent = user.phone;

// 상담 기록 테이블 생성
var recordsTable = document.getElementById('records_table');

counselingRecords.forEach(function (record) {
  var row = recordsTable.insertRow();
  var dateCell = row.insertCell();
  var timeCell = row.insertCell();

  dateCell.textContent = record.date;
  timeCell.textContent = record.time;
});

// 비밀번호 변경 버튼 클릭 시 알림
var passwordButton = document.getElementById('password_button');
passwordButton.addEventListener('click', function () {
  alert('비밀번호 변경 기능은 준비 중입니다.');
});
