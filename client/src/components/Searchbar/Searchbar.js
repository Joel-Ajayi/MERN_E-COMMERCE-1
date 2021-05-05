import React,{useState} from 'react'
import {
    Col,
    Row,
    Image,
    ListGroup,
    Button,
    Alert,
    Form,
    Dropdown
  } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
  
  import {useSelector, useDispatch} from 'react-redux'


const Searchbar = () => {
    const [search,setSearch] = useState('')

    const {productList} = useSelector(state => state.products)

    const searchKeyword =(ev)=>{
      setSearch(ev.target.value.toLowerCase())
    }
    
    return (
        <>
        
        <Dropdown style={{padding:'10px 0 0 0'}} onMouseLeave={()=>setSearch('')}  show={search ? true : false}>
        <Form>
        <Form.Control
        name="sreach" 
        type='search'
        placeholder="Search products..."
        onChange={searchKeyword}
        ></Form.Control>   
        </Form>
        <DropdownToggle style={{opacity:0}}>caret</DropdownToggle>
        <DropdownMenu style={{overflow:'auto'}} className="pl-2">
                     {search && productList.filter(product=> product.name.toLowerCase().includes(search))
                     .map((product,i)=>(
                      <DropdownItem key={i} as="div">
                        <Link to={`/product/${product._id}`} style={{fontSize:'10px'}}>{product.name}</Link>
                        </DropdownItem>  
                     ))}
        </DropdownMenu>
        </Dropdown>
        </>
    )
}

export default Searchbar
