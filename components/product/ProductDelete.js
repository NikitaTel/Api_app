import gql from 'graphql-tag';
import {Mutation, useMutation} from 'react-apollo';
import { Heading, TextField, Button} from '@shopify/polaris';
import {useState} from "react";

const UPDATE_PRODUCT_INFO = gql`
      mutation productDelete($input: ProductDeleteInput!) {
      productDelete(input: $input) {
        deletedProductId
        shop {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

const ProductCreate = ()=> {
  const [productId, setProductId] = useState('');
  const [updateProduct, data] = useMutation(UPDATE_PRODUCT_INFO);
  const [mutationResult, setMutationResult] = useState('');

  const handleIdChange = (value) => {
    setProductId(value);
  };

  const handleMutation = () => {
    setMutationResult('pending')
    return updateProduct({variables: {input: { id: `gid://shopify/Product/${productId}` }}})
      .then(()=> {
        console.log(data);
        setMutationResult('done');
      })
  }


  return (<>
      <Heading>Delete Product</Heading>
      <TextField label="Product ID" value={productId} onChange={handleIdChange} />
      <Button onClick={productId ? handleMutation : ()=>setMutationResult('error')} >Delete Product</Button>
      {mutationResult==='pending' ? <p>Loading...</p>
        : mutationResult==='done' ? <p>Product deleted</p>
          : mutationResult==='error'? <p>Fill the fields</p>
            : ''}
    </>
  );
}

export default ProductCreate;
