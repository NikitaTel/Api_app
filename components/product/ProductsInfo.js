import gql from 'graphql-tag';
import {Query, useLazyQuery} from 'react-apollo';
import {Card, Heading} from '@shopify/polaris';
import Link from 'next/link'


const GET_SHOP_INFO = gql`
query {
    products(first: 15) {
      edges {
        node {
          id
          onlineStoreUrl
          handle
          description
          vendor
          metafields (first: 15) {
              edges {
                node {
                    id
                    namespace
                    key
                }
              }
          }
        }
      }
    }
  }
`;

const ShopInfo = ()=> {
  const [getCustomer, { loading, data, error}] = useLazyQuery(GET_SHOP_INFO);

  return (
    <Query query={GET_SHOP_INFO}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;
        console.log(data);
        return (
          <>
            <Link href={`/`}>
              <a>Home</a>
            </Link>

            <Heading>Products Information</Heading>
            <Card>
              {data.products.edges.map((el, index)=> {
                return (
                  <>
                    <Heading element="h3">Product {index + 1}</Heading>
                    <Link href={`/product/${el.node.id.substring(22)}`}>
                      <a>{el.node.handle}</a>
                    </Link>
                    <p>Handle : {el.node.handle}</p>
                    <p>Vendor : {el.node.vendor}</p>
                    <p>Description : {el.node.description}</p>
                  </>
                )
              })}
            </Card>
          </>
        );
      }}
    </Query>
  );
}

export default ShopInfo;
