import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const index = ({ S1, S2, S3, S4 }) => {
  return (
    <Nav className='bg-light justify-content-center mb-4' style={{border:'none'}} >
      <Nav.Item style={{display:'flex',flexDirection:'row'}} >
          {S1 ? (
              <Link to='/login' className='p-2'>
              <b>Sign In</b>
              </Link>
          ):(
            <Nav.Link disabled>Sign In</Nav.Link>
           )}

           {S2 ? (
              <Link to='/shipping' className='p-2'>
                  <b>Shipping</b>
              </Link>
          ):(
            <Nav.Link disabled>Shipping</Nav.Link>
           )}

           {S3 ? (
              <Link to='/payment' className='p-2'>
                  <b>Payment</b>
              </Link>
          ):(
            <Nav.Link disabled>Payment</Nav.Link>
           )}

           {S4 ? (
              <Link to='/placeorder' className='p-2'>
                  <b>Place Order</b>
              </Link>
          ):(
            <Nav.Link disabled>Place Order</Nav.Link>
           )}
      </Nav.Item>
    </Nav>
  );
};

export default index;
