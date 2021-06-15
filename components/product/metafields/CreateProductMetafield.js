import gql from 'graphql-tag';
import {Mutation, useMutation} from 'react-apollo';
import { Heading, TextField, Button} from '@shopify/polaris';
import {useState} from "react";

const UPDATE_PRODUCT_INFO = gql`
      mutation($input: ProductInput!) {
        productUpdate(input: $input) {
          product {
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
        }
      }
  `;

const CreateProductMetafield = ({id})=> {
  const [key, setKey] = useState('');
  const [namespace, setNamespace] = useState('');
  const [value, setValue] = useState('');
  const [updateProduct, {loading, error, data}] = useMutation(UPDATE_PRODUCT_INFO);


  const handleKeyChange = (value) => {
    setKey(value)
  };

  const handleNamespaceChange = (value) => {
    setNamespace(value);
  };

  const handleValueChange = (value) => {
    setValue(value);
  }

  const handleMutation = () => {
    return updateProduct({
      variables: {
        input: {
          id: id,
          metafields: [
            {
              namespace: namespace,
              key: key,
              value: value,
              valueType: 'STRING'
            }
          ]
        }
      }
    });
  }


  return (
    <>
      <Heading>Create new Metafield</Heading>
      <TextField label="Namespace" value={namespace} onChange={handleNamespaceChange} />
      <TextField label="Key" value={key} onChange={handleKeyChange} />
      <TextField label="Value" value={value} onChange={handleValueChange} />
      <Button onClick={ handleMutation } >Create Metafield</Button>
      {loading ? <p>Loading...</p>
        : data ? <p>Metafield created</p>
          : error? <p>Something went wrong</p>
            : ''}
      {data && console.log(data)}
      {error && console.log(error)}
    </>
  );
}

export default CreateProductMetafield;
