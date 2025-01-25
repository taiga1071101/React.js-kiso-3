import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>ホーム画面</h1>
      <Link to="/login">ログイン画面へ</Link>
      <br />
      <Link to="/signup">新規登録画面へ</Link>
    </div>
  );
};