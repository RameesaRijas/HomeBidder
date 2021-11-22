import {Link} from 'react-router-dom';
import './PropertyListItem.css';


export default function PropertListItem(props) {
  const { properties, setPropertId, bidders} = props

  const registerdBidders = bidders.filter(item => 
                            item.id === properties.bid_id)
  const imgUrl = properties.thumbnail && properties.thumbnail.map(item =>
                        <img style={{width:"50px"}}src={item.image_url} key={item.id}/>
                  );

  return (
    <>
      <div>
        <li onClick={()=>setPropertId(properties.id)}>
          <Link
            to={{
              pathname:`/listing/${properties.id}`, 
              key: properties.id,
              state: properties, registerdBidders }}>
              {properties.street}
          </Link>
          {imgUrl}
        </li>
      </div>
    </>
  );


}