import { Page, TextField } from "@shopify/polaris";
import { ResourcePicker} from "@shopify/app-bridge-react";
import {useEffect, useState} from "react";
import ShopInfo from "../components/ShopInfo";
import ProductsInfo from "../components/product/ProductsInfo";
import ProductById from "../components/product/ProductById";
import ProductUpdate from "../components/product/ProductUpdate";
import ProductCreate from "../components/product/ProductCreate";
import ProductDelete from "../components/product/ProductDelete";
import CustomerById from "../components/customer/CustomerById";
import Link from "next/link";

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  // useEffect(()=> {
  // fetch('/products').then(data=>data).then((data)=>console.log('products from rest', data))
  // }, []);

  const handleSelection = (res) => {
    const ids = res.selection.map((resource)=> resource.id);
    console.log(ids);
    setOpened(false);
  };

  const handleNameChange = (value) => {
    setPrice(value);
  };

  const handlePriceChange = (value) => {
    setName(value);
  };

  return (
    <Page title="Metafields editor">
      {/*<ResourcePicker*/}
      {/*  resourceType="Product" open={opened} onCancel={()=>setOpened(false)} onSelection={(res)=>handleSelection(res)}/>*/}
      {/*<TextField label="Product name" value={name} onChange={handleNameChange} />*/}
      {/*<TextField label="Product price" value={price} onChange={handlePriceChange} />*/}
      {/*<ShopInfo />*/}
      {/*<ProductById />*/}
      {/*<ProductUpdate />*/}
      {/*<ProductCreate />*/}
      {/*<ProductDelete />*/}
      {/*<CustomerById />*/}
      <ul>
        <li>
          <Link href={`/products`}>
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link href={`/customers`}>
            <a>Customers</a>
          </Link>
        </li>
        <li>
          <Link href={`/orders`}>
            <a>Orders</a>
          </Link>
        </li>
        <li>
          <Link href={`/exportedOrders`}>
            <a>Exported Orders</a>
          </Link>
        </li>
      </ul>



    </Page>
  )
};

export default Index;
