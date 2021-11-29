import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default function NotificationItem(props) {
  const { message } = props;

  return (

    <div>{message}</div>

  )
}