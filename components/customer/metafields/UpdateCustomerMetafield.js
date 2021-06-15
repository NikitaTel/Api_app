import gql from 'graphql-tag';
import {Mutation, useMutation} from 'react-apollo';
import { Heading, TextField, Button} from '@shopify/polaris';
import {useEffect, useState} from "react";

const UPDATE_PRODUCT_INFO = gql`
      mutation customerUpdate($input: CustomerInput!) {
        customerUpdate(input: $input) {
            customer {
              id
              metafields(first: 100) {
                edges {
                  node {
                    id
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

const UpdateCustomerMetafield = ({customerId, updateValue, metafield})=> {
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
            id: customerId,
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
    </>
  );
}

export default UpdateCustomerMetafield;
