import {Card, Heading} from "@shopify/polaris";
import {useState} from "react";

import UpdateCustomerMetafield from "./UpdateCustomerMetafield";
import DeleteProductMetafield from "../../product/metafields/DeleteProductMetafield";

const CustomerMetafieldInfo = ({ metafield, id }) => {
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
      <p>Namespace: {metafield.node.namespace}</p>
      <p>Key: {metafield.node.key}</p>
      <p>Value: {value || metafield.node.value}</p>
      <UpdateCustomerMetafield customerId={id}
                              metafield={metafield.node}
                              updateValue={updateValue}/>
      <DeleteProductMetafield updateRemoved={updateRemoved} id={metafield.node.id}/>
    </Card>
  )
}

export default  CustomerMetafieldInfo;
