const form = document.querySelector('#signup_form');

const addCheck = () => {
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const checkPassword = document.querySelector('#check_password');
  const phone = document.querySelector('#tel');

  if(username.value == ""){
    alert('아이디를 입력하세요.')
    username.focus();
    return false;
  } else if(password.value == ""){
    alert('비밀번호를 입력하세요.')
    password.focus();
    return false;
  } else if(password.value != checkPassword.value){
    alert('비밀번호가 틀립니다. 다시 입력하세요.')
    checkPassword.focus();
    return false;
  } else if(phone.value == ""){
    alert('전화번호를 입력하세요.')
    phone.focus();
    return false;
  } else{
    form.submit();
  }

}