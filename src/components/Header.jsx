import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clear } from '../redux/tokenSlice.js';
import axios from 'axios';
import './header.scss';
import { url } from '../const';

export const Header = () => {
  const token = useSelector((state) => state.token.value);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await axios.get(`${url}/users`, { headers: headers});
      setUserName(res.data.name);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=> {
    if (token.length > 0) {
      fetchUserName();
    }
  }, [token]);

  const logout = () => {
    dispatch(clear());
    navigate('/login');
  };

  return (
    <header>
      <p>書籍レビューアプリ</p>
      {
        token ? (
          <div>
            <p>{userName}</p>
            <Link to='/profile'>ユーザー情報編集</Link>
            <button onClick={logout}>ログアウト</button>
          </div>
        ) : (
          <Link to='/login'>ログイン</Link>
        )
      }
    </header>
  );
};