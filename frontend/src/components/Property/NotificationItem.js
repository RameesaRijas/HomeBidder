import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Container, ListGroup, ListGroupItem, Badge, Alert, Button } from 'react-bootstrap';

export default function NotificationItem(props) {
  const { message } = props;

  // use className to conditionally set className="fw-bold" for unread messages
  // and to render the 'new' badge based on the has_read field of the notification.


  return (
    <>
      <ListGroup.Item
        action
        variant="primary"
        className="d-flex justify-content-between align-items-start"
        >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{message}</div>
        </div>
        <Badge variant="primary" pill>
          confirm
        </Badge>
      </ListGroup.Item>

      <ListGroup.Item>
        <div className="ms-2 me-auto">
          <div>{message}</div>
        </div>
      </ListGroup.Item>
    </>
  )
}