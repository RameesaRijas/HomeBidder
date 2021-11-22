import { useLocation } from "react-router-dom";


export default function Property() {
  let location = useLocation();
  const details = location.state;

  return (
   <> 
    <h2>Property {details.street}
    </h2>
   </>
  );
}