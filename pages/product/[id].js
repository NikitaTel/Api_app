import {useEffect, useState} from "react";
import { Heading, Card } from '@shopify/polaris'
import Link from "next/link";
import {useQuery} from "react-apollo";
import {gql} from "apollo-boost";
import CreateProductMetafield from "../../components/product/metafields/CreateProductMetafield";
import ShowProductMetafields from "../../components/product/metafields/ShowProductMetafields";
const {useRouter} = require("next/router");
//gid://shopify/Product

const Product = () => {
  const [id, setId] = useState('');
  const router = useRouter();
  useEffect(()=> setId(`gid://shopify/Product/${router.query.id}`), []);


  const GET_PRODUCT_INFO = gql`
  query {
    product(id: "${id}") {
      handle
      title
      description
      vendor
      metafields(first: 5) {
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
`;

  const {loading, error, data} = useQuery(GET_PRODUCT_INFO, {
    variables: { id: id },
  })

  return (
    <>
      <Link href={`/`}>
        <a>Back</a>
      </Link>
        {loading ?
          <p>Loading...</p> : error ?
            <p>${error}</p> :
            <>
              <Heading>
                Title: {data.product.title}
              </Heading>
              <p>Product handle: {data.product.handle}</p>
            </>
        }
      {data && console.log(data)}
    <ShowProductMetafields id={id}/>
    <CreateProductMetafield  id={id}/>
    </>
  )
}

export default Product;
