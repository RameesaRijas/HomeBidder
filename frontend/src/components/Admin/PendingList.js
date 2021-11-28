import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


export default function PendingList() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    axios
    .get('/api/properties/admin/pending')
    .then((response) => {
      console.log('response ==> ', response.data)
      setPending([...response.data])
    })
    .catch((error) =>
      console.log(error))
  }, []);

  console.log("pending ==> ", pending)


  return (
    <>
      <h4>This is the Admin Pending List Page</h4>
    </>
  )
}

// import { useContext } from 'react';
// import { propertyContext } from '../../providers/PropertyProvider';
// import PropertListItem from '../Property/PropertyListItem';
// // import '../property/PropertyList.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row } from 'react-bootstrap';


// export default function PendingList() {
//   const {state} = useContext(propertyContext);
//   const user = state.loggedUser;
//   const Userid = user && user.id;

//   const propertylist = state.properties.map(item => {
//     if (item.is_approved === false) {
//      return <PropertListItem
//       key={item.id}
//       properties={item}
//       user={user}
//     />
//     };
//   });


//   return (
//     <>
//     <Container className="col-lg-10">
//       <h5><hr/>My Property Listings</h5>
//       <div className="property-list">
//         <Row>
//           {propertylist}
//         </Row>
//       </div>
//     </Container>
//     </>
//   );
// };
