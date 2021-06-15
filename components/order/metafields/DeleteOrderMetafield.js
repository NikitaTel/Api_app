import gql from 'graphql-tag';
import {Mutation, useMutation} from 'react-apollo';
import { Heading, TextField, Button} from '@shopify/polaris';

const DELETE_METAFIELD = gql`
      mutation($input: MetafieldDeleteInput!) {
        metafieldDelete(input: $input) {
          deletedId
          userErrors {
            field
            message
          }
        }
      }
  `;

const DeleteOrderMetafield = ({id, updateRemoved})=> {
  const [updateProduct, {loading, error, data}] = useMutation(DELETE_METAFIELD);

  const handleMutation = () => {
    return updateProduct({
      variables: {
        input: {
          id: id
        }
      }
    }).then(()=>updateRemoved());
  }


  return (
    <>
      <Button onClick={ handleMutation } >Delete Metafield</Button>
      {loading ? <p>Loading...</p>
        : data ? <p>Metafield deleted</p>
          : error? <p>Something went wrong</p>
            : ''}
    </>
  );
}

export default DeleteOrderMetafield;
