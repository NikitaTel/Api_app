import gql from 'graphql-tag';
import {Mutation, useMutation, useQuery} from 'react-apollo';
import { Heading, Card} from '@shopify/polaris';
import UpdateProductMetafield from "./UpdateProductMetafield";
import {useState} from "react";
import ProductMetafieldInfo from "./ProductMetafieldInfo";

const ShowProductMetafields = ({id})=> {
  const SHOW_PRODUCT_INFO = gql`
      query {
        product(id: "${id}") {
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

      {loading ? <p>Loading...</p>
        : data && data.product.metafields && data.product.metafields.edges.length ?
          data.product.metafields.edges.map((metafield,index)=>
          {
            return (
                <ProductMetafieldInfo metafield={metafield} key={index} id={id}/>
            )
          })
          : error? <p>Something went wrong</p>
            : <p>No Metafields</p>}
      {data && console.log(data)}
      {error && console.log(error)}
    </>
  );
}

export default ShowProductMetafields;
