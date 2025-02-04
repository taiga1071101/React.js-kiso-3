import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increase, descrease } from '../redux/offsetSlice.js';
import { Header } from '../components/Header.jsx';
import { ReviewContent } from './ReviewContent.jsx';

export const ReviewList = () => {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.offset.count);

  const nextList = () => {
    if(offset === 0) return;
    dispatch(descrease());
  }

  const preList = () => dispatch(increase());

  return (
    <>
      <Header />
      <h1 className='m-5'>書籍一覧画面</h1>
      <ReviewContent />
      <div>
        <button onClick={nextList} className='m-5'>次へ</button>
        <span>{offset + 1}～{offset + 10}</span>
        <button onClick={preList} className='m-5'>前へ</button>
      </div>
      <br />
      <div>
        <Link to='/new'>書籍レビュー投稿画面へ</Link>
      </div>
    </>
  )
}