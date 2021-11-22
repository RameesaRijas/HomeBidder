import PropertListItem from './PropertyListItem';


export default function PropertyList(props) {
  const { onChange, list } = props;
  const propertylist = list.properties.map(item => 
                      <PropertListItem 
                        key={item.id} 
                        properties={item}
                        bidders={list.bidders}
                        setPropertId={onChange} 
                      />)
  
  return (
    <div> 
      {propertylist}
    </div>
  );

}