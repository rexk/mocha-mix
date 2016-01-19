import React from 'react';
export default function ProfileLink(props) {
  let onClick = props.onClick || Function.prototype;
  return (
    <a href={`https://www.facebook.com/${props.username}`}
      onClick={onClick}>
      {props.username}
    </a>
  )
}
