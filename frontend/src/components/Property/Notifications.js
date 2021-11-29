import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import { Container, ListGroup } from 'react-bootstrap';
import NotificationItem from "./NotificationItem";
import AlertNotification from "./AlertNotification";


export default function Notification(props) {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
    .get('/api/properties/notifications')
    .then((response) => {
      setNotifications([...response.data])
    })
    .catch((error) =>
      console.log(error))
  }, []);

  const notificationList = notifications.map(item => {
    return <NotificationItem
      message={item.message}
    />
  })

  console.log('notifications ==> ', notifications)

  return (
    <>
      <Container className="col-lg-10">
        <h5><hr/>My Notifications</h5>
        {notifications.length === 0 && <AlertNotification />}
        <ListGroup as="ul">
          {notificationList}
        </ListGroup>
      </Container>
    </>
  )

}