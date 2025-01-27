import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { url } from '../const';
import { Header } from '../components/Header';
import './login.scss';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);  // 送信中の状態を管理して、連続でボタンを押せないようにする
  const [errorMessage, setErrorMessage] = useState(''); // APIレスポンスのエラーを格納
  const navigate = useNavigate();

  const onLogin = async (data) => {
    try {
      setIsSubmitting(true);
      const { email, password } = data;
      const requestData = {
        email,
        password,
      };
      const res = await axios.post(`${url}/signin`, requestData);
      console.log('ログインに成功しました。', res);
      navigate('/');
    } catch (err) {
      setErrorMessage(`${err.response?.data?.ErrorMessageJP || `ログイン中にエラーが発生しました。 ${err}`}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="login">
        <h1>ログイン画面</h1>
        <p className="error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(onLogin)}>
          <label>メールアドレス</label>
          <input
            type="email"
            {...register("email", {
              required: "メールアドレスを入力してください。",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "有効なメールアドレスを入力してください。",
              },
            })}
          />
          <p className="error-message" id="email-error">{errors.email?.message}</p>
          <br />

          <label>パスワード</label>
          <input
            type="password"
            {...register("password", {
              required: "パスワードを入力してください。",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@[-`{-~]).{8,}$/,
                message: "パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください。",
              },
            })}
          />
          <p className="error-message" id="password-error">{errors.password?.message}</p>
          <br />
          <button type="submit" id="login-button" disabled={isSubmitting} className="on-login-button">ログイン</button>
        </form>
        <Link to='/signup'>新規作成画面へ</Link>
      </main>
    </>
  )
}
