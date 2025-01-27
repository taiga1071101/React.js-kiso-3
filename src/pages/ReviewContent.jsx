import React from "react";

export const ReviewContent = (props) => {
  return (
    <li className='p-2 border border-black'>
      <p className='font-bold text-lg'>{ props.review.title }</p>
      <p>URL：<a href={ props.review.url }>{props.review.url}</a></p>
      <p>レビュワー：{ props.review.reviewer }</p>
      <p>{ props.review.review }</p>
    </li>
  )
}