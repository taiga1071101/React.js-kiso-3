import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { useForm } from 'react-hook-form';
import { url } from '../const';

export const EditUser = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm();
  const token = useSelector((state) => state.token.value);
  const [userName, setUserName] = useState('');
  const headers = { 'Authorization': `Bearer ${token}` };
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const res = await axios.get(`${url}/users`, { headers: headers});
      setUserName(res.data.name);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUserName();
  }, []);

  const updateUserName = async (data) => {
    try{
      const { name } = data;
      const requestData = {
        name
      }
      const res = await axios.put(`${url}/users`, requestData, { headers: headers });
      console.log('更新成功', res);
      navigate('/reviewList');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Header />
      <main>
        <h1 className="m-5">ユーザー情報編集</h1>
        <form onSubmit={handleSubmit(updateUserName)}>
          <div className="m-10">
            <label>ユーザー名</label>
            <input 
              defaultValue={userName}
              type="text"
              {...register("name", {
                required: "ユーザー名を入力してください。"
              })}
            />
          </div>
          <button type="submit">更新</button>
        </form>
      </main>
    </>
  );
}