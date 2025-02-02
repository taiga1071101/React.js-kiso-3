import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { url } from '../const.js';

export const ReviewContent = () => {
  const [reviews, setReviews] = useState([]);
  const offset = useSelector((state) => state.offset.count);
  
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

  return (
    <ul className='text-left mx-40 my-10'>
      {
        reviews.map(review => {
          return(
            <li className='p-2 border border-black' key={ review.id } >
              <p className='font-bold text-lg'>{ review.title }</p>
              <p>URL：<a href={ review.url }>{ review.url}</a></p>
              <p>レビュワー：{ review.reviewer }</p>
              <p>{ review.review }</p>
            </li>
          )
        })
      }
    </ul>
  )
}