import gql from 'graphql-tag';
import {Mutation, useMutation, useQuery} from 'react-apollo';
import { Heading, Card} from '@shopify/polaris';
import OrderMetafieldInfo from "./OrderMetafieldInfo";

const ShowOrderMetafields = ({id})=> {
  const SHOW_PRODUCT_INFO = gql`
      query {
        order(id: "${id}") {
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
  `;

  const {loading, error, data} = useQuery(SHOW_PRODUCT_INFO);


  return (
    <>
      <Heading>View existing Metafields</Heading>
      {data && console.log(data)}
      {console.log(id)}
      {loading ? <p>Loading...</p>
        : data && data.order.metafields && data.order.metafields.edges.length ?
          data.order.metafields.edges.map((metafield,index)=>
          {
            return (
                <OrderMetafieldInfo metafield={metafield} key={index} id={id}/>
            )
          })
          : error? <p>Something went wrong</p>
            : <p>No Metafields</p>}

    </>
  );
}

export default ShowOrderMetafields;
