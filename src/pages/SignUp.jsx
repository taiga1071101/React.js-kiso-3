import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Compressor from "compressorjs";
import { url } from '../const';
import { Header } from '../components/Header';
import './signUp.scss';

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSignUp = async (data) => {
    const { name, email, password, icon } = data;
    const requestData = {
      name,
      email,
      password,
    };
    
    try {
      const res = await axios.post(`${url}/users`, requestData);  // ユーザー情報作成
      console.log('サインアップに成功しました。', res);
      const file = FileCompression(icon[0]);
      await OnIconUpload(res.data.token, icon[0]);
      navigate('/');
    } catch (err) {
      setErrorMessage(`${err.response?.data?.ErrorMessageJP || `サインアップ中にエラーが発生しました。 ${err}`}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ファイルサイズ圧縮
  const FileCompression = (file) => {
    new Compressor(file, {
      quality: 0.8,
      maxWidth: 100,
      maxHeight: 100,
      mimeType: 'image/jpg',
      success (result) {
        console.log('圧縮に成功しました。', result);
        return result;
      },
      error (err) {
        console.error('ファイルサイズ圧縮エラー：', err);
      }
    });
  }

  // アイコンアップロード
  const OnIconUpload = (token, file) => {
    return new Promise((resolve, reject) => {
      // 圧縮結果をAPIで送信できるようにFormDataに変換
      const formData = new FormData();
      formData.append('icon', file);

      const iconUploadHeaders = { 'Authorization': `Bearer ${token}` };
      axios
        .post(`${url}/uploads`, formData, { headers: iconUploadHeaders})
        .then((res) => {
          console.log('アップロードに成功しました。', res);
          resolve(res);
        })
        .catch((err) => {
          setErrorMessage(`${err.response?.data?.ErrorMessageJP || `画像アップロード中にエラーが発生しました。 ${err}`}`);
          reject(err);
        });
    });
  }

  return (
    <>
      <Header />
      <main className="signup">
        <h1>新規登録画面</h1>
        <p className="error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSignUp)}>
          <label>ユーザ名</label>
          <input 
            type="text"
            {...register("name", {
              required: "ユーザー名を入力してください。"
            })}
          />
          <p className="error-message">{errors.name?.message}</p>
          <br />

          <label>ユーザアイコン</label>
          <input
            type="file"
            accept="image/*"
            {...register("icon", {
              required: "アイコンを選択してください。"
            })}
          />
          <p className="error-message">{errors.icon?.message}</p>
          <br />

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
          <p className="error-message">{errors.email?.message}</p>
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
          <br />
          <p className="error-message">{errors.password?.message}</p>
          <br />

          <button type="submit" disabled={isSubmitting} className="on-signup-button">新規登録</button>
        </form>
        <Link to='/login' className="to-login-link">ログイン画面へ</Link>
      </main>
    </>
  )
}
