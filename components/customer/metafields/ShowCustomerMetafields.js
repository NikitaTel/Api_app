import gql from 'graphql-tag';
import {Mutation, useLazyQuery, useMutation, useQuery} from 'react-apollo';
import { Heading, Card} from '@shopify/polaris';
import CustomerMetafieldInfo from "./CustomerMetafieldInfo";

const ShowCustomerMetafields = ({id})=> {
  const SHOW_CUSTOMER_METAFIELDS = gql`
      query {
        customer (id: "${id}") {
          metafields(first: 5) {
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
  `;

  const {loading, error, data} = useQuery(SHOW_CUSTOMER_METAFIELDS);
  const [updateCustomers, {loading2, error2, data2}] = useLazyQuery(SHOW_CUSTOMER_METAFIELDS);

  return (
    <>
      <Heading>View existing Metafields</Heading>
      {loading ? <p>Loading...</p>
        : data && data.customer.metafields && data.customer.metafields.edges.length ?
          data.customer.metafields.edges.map((metafield,index)=>
          {
            return (
              <CustomerMetafieldInfo metafield={metafield} key={index} id={id}/>
            )
          })
          : error? <p>Something went wrong</p>
            : <p>No Metafields</p>}
      {data && console.log(data)}
      {error && console.log(error)}
    </>
  );
}

export default ShowCustomerMetafields;
