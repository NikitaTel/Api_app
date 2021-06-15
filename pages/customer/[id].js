import {useEffect, useState} from "react";
import { Heading, Card } from '@shopify/polaris'
import Link from "next/link";
import {useQuery} from "react-apollo";
import {gql} from "apollo-boost";
import CreateProductMetafield from "../../components/product/metafields/CreateProductMetafield";
import ShowProductMetafields from "../../components/product/metafields/ShowProductMetafields";
import ShowCustomerMetafields from "../../components/customer/metafields/ShowCustomerMetafields";
import CreateCustomerMetafield from "../../components/customer/metafields/CreateCustomerMetafield";
const {useRouter} = require("next/router");
//gid://shopify/Product

const Product = () => {
  const [id, setId] = useState('');
  const [created, setCreated] = useState(false);
  const router = useRouter();
  useEffect(()=> setId(`gid://shopify/Customer/${router.query.id}`), []);


  const GET_PRODUCT_INFO = gql`
  query {
    customer (id: "${id}") {
      firstName
      lastName
    }
  }
`;

  const {loading, error, data} = useQuery(GET_PRODUCT_INFO, {
    variables: { id: id },
  })

  const createdFlag = (data) => {
    data? setCreated(true) : setCreated(false)
  }

  return (
    <>
      <Link href={`/customers`}>
        <a>Back</a>
      </Link>
      {loading ?
        <p>Loading...</p> : error ?
          <p>${error}</p> :
          <>
            <Heading>
              Name: {data.customer.firstName} {data.customer.lastName}
            </Heading>
          </>
      }
      {data && console.log(data)}
      <ShowCustomerMetafields id={id} createdFlag={createdFlag} created={created}/>
      <CreateCustomerMetafield  id={id} createdFlag={createdFlag} />
    </>
  )
}

export default Product;
