import {Card, Heading} from "@shopify/polaris";
import {useState} from "react";

import DeleteOrderMetafield from "./DeleteOrderMetafield";
import UpdateOrderMetafield from "./UpdateOrderMetafield";

const ProductMetafieldInfo = ({ metafield, id }) => {
  const [value, setNewValue] = useState('');
  const [removed, setRemoved] = useState(false);

  const updateValue = (data) => {
    setNewValue(data);
  };

  const updateRemoved = () => {
    setRemoved(true);
  };

  return (
    !removed &&
    <Card>
      {console.log(metafield.node)}
      <p>Namespace: {metafield.node.namespace}</p>
      <p>Key: {metafield.node.key}</p>
      <p>Value: {value || metafield.node.value}</p>
      <UpdateOrderMetafield productId={id}
                              metafield={metafield.node}
                              updateValue={updateValue}/>
     <DeleteOrderMetafield updateRemoved={updateRemoved} id={metafield.node.id}/>
    </Card>
  )
}

export default  ProductMetafieldInfo;
