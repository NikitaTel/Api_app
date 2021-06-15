import {Card, Heading} from "@shopify/polaris";
import UpdateProductMetafield from "./UpdateProductMetafield";
import {useState} from "react";
import DeleteProductMetafield from "./DeleteProductMetafield";

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
      <UpdateProductMetafield productId={id}
                              metafield={metafield.node}
                              updateValue={updateValue}/>
     <DeleteProductMetafield updateRemoved={updateRemoved} id={metafield.node.id}/>
    </Card>
  )
}

export default  ProductMetafieldInfo;
