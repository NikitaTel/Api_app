import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {Card, Heading, TextField} from '@shopify/polaris';
import {useState} from "react";

const GET_SHOP_INFO = gql`
query {
    shop {
      name
      primaryDomain {
        url
        host
      }
    }
  }
`;



const ShopInfo = ()=> {
    return (
      <Query query={GET_SHOP_INFO}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          console.log(data);
          return (
            <>
              <Heading>Single product information </Heading>
              <Card>
                <p>{data.shop.name}</p>
                <p>{data.shop.primaryDomain.host}</p>
              </Card>
            </>
          );
        }}
      </Query>
    );
}

export default ShopInfo;
