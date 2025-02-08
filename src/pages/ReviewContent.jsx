import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { url } from '../const.js';

export const ReviewContent = () => {
  const [reviews, setReviews] = useState([]);
  const offset = useSelector((state) => state.offset.count);
  const token = useSelector((state) => state.token.value);
  const headers = { 'Authorization': `Bearer ${token}` };
  const navigate = useNavigate();
  
  const displayReviewList = async () => {
    try {
      const res = await axios.get(`${url}/public/books?offset=${offset}`);
      setReviews(res.data);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    displayReviewList();
  }, [offset]);

  const transitionToDetail = (id) => {
    sendReviewLog(id);
    navigate(`/detail/${id}`);
  }

  const sendReviewLog = async (id) => {
    try {
      const res = await axios.post(`${url}/logs`, { selectBookId: id }, { headers: headers } );
      console.log('ログ送信完了', res);
    } catch (err) {
      console.error('ログ送信エラー', err);
    }
  };

  return (
    <ul className='text-left mx-40 my-10'>
      {
        reviews.map(review => {
          return(
            <li className='p-2 border border-black cursor-pointer hover:bg-gray-100' key={ review.id } >
              <p className='font-bold text-lg' onClick={() => transitionToDetail(review.id)}>{ review.title }</p>
            </li>
          )
        })
      }
    </ul>
  )
}