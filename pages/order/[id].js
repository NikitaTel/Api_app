import {useEffect, useState} from "react";
import { Heading, Card } from '@shopify/polaris'
import Link from "next/link";
import {useQuery} from "react-apollo";
import {gql} from "apollo-boost";
import ShowOrderMetafields from "../../components/order/metafields/ShowOrderMetafields";
import CreateOrderMetafield from "../../components/order/metafields/CreateOrderMetafield";
import CreateDateOrderMetafield from "../../components/order/metafields/CreateDateOrderMetafield";
const {useRouter} = require("next/router");

const Order = () => {
  const [id, setId] = useState('');
  const [created, setCreated] = useState(false);
  const router = useRouter();
  useEffect(()=> setId(`gid://shopify/Order/${router.query.id}`), []);


  const GET_PRODUCT_INFO = gql`
  query {
    order (id: "${id}") {
      email
      phone
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
      <Link href={`/orders`}>
        <a>Back</a>
      </Link>
      {loading ?
        <p>Loading...</p> : error ?
          <p>${error}</p> :
          <>
            <Heading>
              Data: {data.order.name} {data.order.email}
            </Heading>
          </>
      }
      {data && console.log(data)}
      <ShowOrderMetafields id={id} createdFlag={createdFlag} created={created}/>
      <CreateOrderMetafield  id={id} createdFlag={createdFlag} />
      <CreateDateOrderMetafield id={id} createdFlag={createdFlag} />
    </>
  )
}

export default Order;
