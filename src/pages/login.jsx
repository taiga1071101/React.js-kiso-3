import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({email: '', password: ''});
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onLogin = (e) => {
    e.preventDefault(); // フォーム送信時の余計なリロード防止

    /**
     * バリデーション
     */
    let valid = true;
    let errors = { email: '', password: '' };
    // email
    if (!email) {
      errors.email = "メールアドレスが空欄です";
      valid = false;
    } else if (!email.includes('@')) {
      errors.email = "メールアドレスには「@」を含んでください";
      valid = false;
    }
    // password
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@[-`{-~]).{8,}$/;  // ?=で後続する文字列が一致するか確認。.*は任意の位置を探索可能に。
    if (!password) {
      errors.password = 'パスワードが空欄です';
      valid = false;
    } else if (!regex.test(password)) {
      errors.password = 'パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください';
      valid = false;
    }
    setErrorMessage(errors);

    if (valid) {
      console.log('成功');
    }
  };

  return (
    <>
      <h1>ログイン画面</h1>
      <form onSubmit={onLogin} noValidate>
        <span>メールアドレス</span>
        <input type="email" value={email} onChange={handleEmailChange}></input>
        <br />
        <p>{errorMessage.email}</p>
        <br />
        <span>パスワード</span><input type="password" value={password} onChange={handlePasswordChange} required></input>
        <br />
        <p>{errorMessage.password}</p>
        <br />
        <button type="submit" id="login-button">ログイン</button>
      </form>
    </>
  )
}

export default Login