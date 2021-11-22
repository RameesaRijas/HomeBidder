import PropertListItem from './PropertyListItem';


export default function PropertyList(props) {
  const { list } = props;
  const propertylist = list.properties.map(item => 
                      <PropertListItem 
                        key={item.id} 
                        properties={item}
                      />)
  
  return (
    <div> 
      {propertylist}
    </div>
  );

}