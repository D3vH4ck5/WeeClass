const form = document.querySelector('#login_form');

const addCheck = () => {
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');

  if(username.value == ""){
    alert('아이디를 입력하세요.')
    username.focus();
    return false;
  } else if(password.value == ""){
    alert('비밀번호를 입력하세요.')
    password.focus();
    return false;
  } else{
    form.submit();
  }

}