import gql from 'graphql-tag';
import {Query, useLazyQuery} from 'react-apollo';
import {Card, Heading} from '@shopify/polaris';
import Link from 'next/link'


const GET_SHOP_INFO = gql`
query {
    orders(first: 15) {
      edges {
        node {
          id
          name
          note
          email
          metafields (first: 15) {
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
  }
`;

const OrdersInfo = ({ exported })=> {
  const checkExported  = (order) => {
    let exportedIndex = -1;
    order.node.metafields.edges.forEach((meta, index)=> {
      if(meta.node.namespace==="metafield_exported" && meta.node.key==="exported" && meta.node.value === "true") {
        exportedIndex = index;
      }
    })

    return exportedIndex;
  }

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

            <Heading>Orders Information</Heading>
            <Card>
              {data.orders.edges.map((el, index)=> {
                return (
                  <>
                    {
                      exported ?
                        <>
                          {
                            checkExported(el) > -1 &&
                            <>
                              <Heading element="h3">Order {index + 1}</Heading>
                              <Link href={`/order${el.node.id.substring(19)}`}>
                              <a>{el.node.name}</a>
                              </Link>
                              <p>
                                {el.node.note && el.node.note}
                              </p>
                              <p>
                                {el.node.email && el.node.email}
                              </p>
                            </>
                          }

                        </>
                        :
                      <>
                        <Heading element="h3">Order {index + 1}</Heading>
                        <Link href={`/order${el.node.id.substring(19)}`}>
                          <a>{el.node.name}</a>
                        </Link>
                        <p>
                          {el.node.note && el.node.note}
                        </p>
                        <p>
                          {el.node.email && el.node.email}
                        </p>
                      </>
                    }

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

export default OrdersInfo;
