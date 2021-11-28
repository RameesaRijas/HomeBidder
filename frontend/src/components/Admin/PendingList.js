import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import PendingListItem from "./PendingListItem";
import AlertPending from "./AlertPending";
import { Container } from 'react-bootstrap';


export default function PendingList() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    axios
    .get('/api/properties/admin/pending')
    .then((response) => {
      setPending([...response.data])
    })
    .catch((error) =>
      console.log(error))
  }, []);

  const pendingList = pending.map((item, index) => {
    return <PendingListItem
      key={index}
      properties={item}
    />
  });


  console.log("pendingList ==> ", pendingList)

  return (
    <>
    <Container className="col-lg-10">
      <h5><hr/>This is the Admin Pending List Page</h5>
      {pendingList.length === 0 && <AlertPending />}
      {pendingList}
    </Container>
    </>
  );
};
