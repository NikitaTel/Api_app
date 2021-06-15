import gql from 'graphql-tag';
import {Mutation, useMutation, useQuery, useLazyQuery} from 'react-apollo';
import { Heading, TextField, Button} from '@shopify/polaris';
import {useState} from "react";

const CustomerById = ()=> {
  const [customerId, setCustomerId] = useState('');

  const READ_CUSTOMER = gql`
      query {
        customer(id: "gid://shopify/Customer/${customerId}") {
           firstName
           lastName
           email
           note
           phone
        }
      }
  `;

  const [getCustomer, { loading, data, error}] = useLazyQuery(READ_CUSTOMER);
  const [mutationResult, setMutationResult] = useState('');

  const handleMutation = () => {
    return getCustomer();
  }

  const handleIdChange = (value) => {
    setCustomerId(value);
  };

  return (
    <>
      <Heading>Read Customer Data</Heading>
      <TextField label="Customer ID" value={customerId} onChange={handleIdChange} />
      <Button onClick={customerId ? handleMutation : ()=>setMutationResult('error')} >Read Customer data</Button>
      {loading ? <p>Loading...</p>
        : data ? <p>Data retrieved</p>
          : error ? console.log(error)
            : ''}
    </>
  );
}

export default CustomerById;
