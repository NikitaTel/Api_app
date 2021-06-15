import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {Card, Heading, TextField} from '@shopify/polaris';
import {useState} from "react";

const ProductById = ()=> {
  const [productId, setProductId] = useState('');

  const GET_SHOP_INFO = gql`
  query {
    product(id: "gid://shopify/Product/${productId}") {
      handle
      title
      description
      vendor
    }
  }
`;

  const handleNameChange = (value) => {
    setProductId(value)
  }

  return (<>
    <TextField label="Product name" value={productId} onChange={handleNameChange} />
    {
      <Query query={GET_SHOP_INFO}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>Fill the input</div>;
        console.log(data);
        return (
          <>
            {
              data.product ?
                <>
                  <Card>
                    <Heading element="h3">Product Information</Heading>
                    <p>Handle : {data.product.handle}</p>
                      <p>Vendor : {data.product.vendor}</p>
                      <p>Description : {data.product.description}</p>
                  </Card>
                </>
                :
                <>
                  No product with such id
                </>
            }
          </>
        );
      }}
    </Query>}
    </>
  );
}

export default ProductById;
