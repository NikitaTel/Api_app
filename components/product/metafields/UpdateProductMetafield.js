import gql from 'graphql-tag';
import {Mutation, useMutation} from 'react-apollo';
import { Heading, TextField, Button} from '@shopify/polaris';
import {useEffect, useState} from "react";

const UPDATE_PRODUCT_INFO = gql`
      mutation ($input: ProductInput!) {
        productUpdate(input: $input) {
            product {
              metafields(first: 100) {
                edges {
                  node {
                    namespace
                    key
                    value
                  }
                }
              }
            }
            userErrors {
              field
              message
            }
          }
      }
  `;

const UpdateProductMetafield = ({productId, namespace, updateValue, metafield})=> {
  const [value, setValue] = useState('');
  const [updateProduct, {loading, error, data}] = useMutation(UPDATE_PRODUCT_INFO);

  const handleValueChange = (value) => {
    setValue(value);
  }

  const handleMutation = () => {
    !value ?
      alert('no value')
      :
      updateProduct({
      variables: {
        input: {
          id: productId,
          metafields: [
            {
              id: metafield.id,
              namespace: metafield.namespace,
              key: metafield.key,
              value: value
            }
          ]
        }
      }
    }).then(()=>updateValue(value));
  }


  return (
    <>
      <Heading>Update Metafield</Heading>
      <TextField label="Value" value={value} onChange={handleValueChange} />
      <Button onClick={ handleMutation } >Update Metafield</Button>
      {loading ? <p>Loading...</p>
        : data ? <p>Metafield updated</p>
          : error? <p>Something went wrong</p>
            : ''}
      {data && console.log(data)}
      {error && console.log(error)}
    </>
  );
}

export default UpdateProductMetafield;
