import gql from 'graphql-tag';
import {Query, useLazyQuery} from 'react-apollo';
import {Card, Heading} from '@shopify/polaris';
import Link from 'next/link'


const GET_SHOP_INFO = gql`
query {
    customers(first: 15) {
      edges {
        node {
          id
          firstName
          lastName
          email
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

const CustomersInfo = ()=> {
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

            <Heading>Customers Information</Heading>
            <Card>
              {data.customers.edges.map((el, index)=> {
                return (
                  <>
                    <Heading element="h3">Product {index + 1}</Heading>
                    <Link href={`/customer${el.node.id.substring(22)}`}>
                      <a>{el.node.firstName} {el.node.lastName}</a>
                    </Link>
                    <p>Email : {el.node.email}</p>
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

export default CustomersInfo;
