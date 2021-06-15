import gql from 'graphql-tag';
import {Mutation, useMutation} from 'react-apollo';
import {Card, Heading, TextField, Button} from '@shopify/polaris';
import {useState} from "react";

const UPDATE_PRODUCT_INFO = gql`
      mutation productUpdate($input: ProductInput!) {
        productUpdate(input: $input) {
            product {
              id
            }
          }
      }
  `;

const ProductUpdate = ()=> {
  const [productId, setProductId] = useState('');
  const [updateProduct, { data }] = useMutation(UPDATE_PRODUCT_INFO);
  const [mutationResult, setMutationResult] = useState('');

  const [newDescription, setNewDescription] = useState('');

  const handleNameChange = (value) => {
    setProductId(value)
  };

  const handleDescriptionChange = (value) => {
    setNewDescription(value);
  };

  const handleMutation = () => {
    setMutationResult('pending')
    return updateProduct({variables: {input: {id: `gid://shopify/Product/${productId}`, descriptionHtml: newDescription}}})
      .then(()=>setMutationResult('done'))
  }


  return (<>
      <Heading>Update Product</Heading>
      <TextField label="Product id" value={productId} onChange={handleNameChange} />
      <TextField label="New Product description" value={newDescription} onChange={handleDescriptionChange} />
      <Button onClick={productId? handleMutation : ()=>setMutationResult('error')} >Update Product</Button>
      {mutationResult==='pending' ? <p>Loading...</p>
        : mutationResult==='done' ? <p>Product updated</p>
          : mutationResult==='error'? <p>No Id provided</p>
            : ''}
    </>
  );
}

export default ProductUpdate;
