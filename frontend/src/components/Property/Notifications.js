import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import { Container } from 'react-bootstrap';
import NotificationItem from "./NotificationItem";


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

  return (
    <>
      <Container className="col-lg-10">
        <h5><hr/>My Notifications</h5>
        {notificationList}
      </Container>
    </>
  )

}