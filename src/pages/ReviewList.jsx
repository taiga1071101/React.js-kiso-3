import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { increase, descrease, clear } from '../redux/offsetSlice.js';
import { Header } from '../components/Header.jsx';
import { url } from '../const.js';
import { ReviewContent } from './ReviewContent.jsx';

export const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const offset = useSelector((state) => state.offset.count);
  const dispatch = useDispatch();

  const displayReviewList = async () => {
    try {
      const res = await axios.get(`${url}/public/books?offset=${offset}`);
      setReviews(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    displayReviewList();
  }, [offset]);

  const clearList = () => dispatch(clear());

  const nextList = () => {
    if(offset === 0) return;
    dispatch(descrease());
  }

  const preList = () => dispatch(increase());

  return (
    <>
      <Header />
      <h1>書籍一覧画面</h1>
      <ul className='text-left mx-40 my-10'>
        {
          reviews.map(review => {
            return <ReviewContent key={ review.id } review={review}/>
          })
        }
      </ul>
      <button onClick={nextList} className='m-5'>次へ</button>
      <span>{offset + 1}～{offset + 10}</span>
      <button onClick={preList} className='m-5'>前へ</button>
    </>
  )
}