import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { url } from '../const.js';
import { Header } from '../components/Header';

export const NewReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = useSelector((state) => state.token.value);
  const navigate = useNavigate();
  const headers = { 'Authorization': `Bearer ${token}` };
  const apiUrl = url;

  const onCreateReview = async (data) => {
    try {
      const { title, url, detail, review } = data;
      const requestData = {
        title,
        url,
        detail,
        review
      };
      const res = await axios.post(`${apiUrl}/books`, requestData, { headers: headers });
      console.log(`投稿完了${res}`);
      navigate('/reviewList');
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <>
    <Header />
    <main>
      <h1>書籍レビュー投稿画面</h1>
      <form onSubmit={handleSubmit(onCreateReview)}>
        <label>タイトル</label>
        <input 
          type='text'
          {...register('title', {
            required: 'タイトルを入力してください。'
          })}
        />
        <br />

        <label>URL</label>
        <input 
          type='text'
          {...register('url', {
            required: 'URLを入力してください。'
          })}
        />
        <br />

        <label>詳細</label>
        <input 
          type='text'
          {...register('detail', {
            required:'詳細を入力してください。'
          })}
        />
        <br />

        <label>レビュー</label>
        <textarea 
          {...register('review', {
            required: 'レビューを入力してください。'
          })}
        />
        <br />

        <button type="submit">投稿</button>
      </form>
    </main>
    </>
  );
} 