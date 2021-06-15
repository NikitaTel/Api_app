import gql from 'graphql-tag';
import {Mutation, useMutation} from 'react-apollo';
import { Heading, TextField, Button} from '@shopify/polaris';
import {useState} from "react";

const UPDATE_PRODUCT_INFO = gql`
      mutation productCreate($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
        }
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
  const [productTitle, setProductTitle] = useState('');
  const [updateProduct, data] = useMutation(UPDATE_PRODUCT_INFO);
  const [mutationResult, setMutationResult] = useState('');

  const [newDescription, setNewDescription] = useState('');

  const handleTitleChange = (value) => {
    setProductTitle(value)
  };

  const handleDescriptionChange = (value) => {
    setNewDescription(value);
  };

  const handleMutation = () => {
    setMutationResult('pending')
    return updateProduct({variables: {input: { descriptionHtml: newDescription, title: productTitle}}})
      .then(()=> {
        console.log(data);
        setMutationResult('done');
      })
  }


  return (<>
      <Heading>Create new Product</Heading>
      <TextField label="New Product Title" value={productTitle} onChange={handleTitleChange} />
      <TextField label="New Product description" value={newDescription} onChange={handleDescriptionChange} />
      <Button onClick={productTitle && newDescription ? handleMutation : ()=>setMutationResult('error')} >Create Product</Button>
      {mutationResult==='pending' ? <p>Loading...</p>
        : mutationResult==='done' ? <p>Product updated</p>
          : mutationResult==='error'? <p>Fill the fields</p>
            : ''}
    </>
  );
}

export default ProductCreate;
