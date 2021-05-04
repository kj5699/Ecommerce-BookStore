import { useState } from "react"
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, CardLink, CardTitle,} from "reactstrap"
import ModalComponent from "../UI/Modal"
import './CategoryCard.scss';
import * as Actions from "../../store/actions/index";

const CategoryCard = props => {
    const [modalOpen,setmodalOpen]=useState(false)
    const onClickedDelete = ()=>{
        props.onDeleteCategory(props.id,props.user.token);
      setmodalOpen(false);
  
    }
    const toggleDelete= ()=>{
      setmodalOpen(prevState=>!prevState)
    }
    return (
        <>
        {modalOpen && <ModalComponent
        opened={modalOpen} 
        toggle={toggleDelete}
        header={'Confirm Delete'}
        footer={<>
                <Button color="primary" onClick={onClickedDelete}>Delete</Button>
                <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
                </>}
        >
            <>
            <h5>Do you want to Delete This Category and all its products?</h5>
            <br/>
            <h5>{props.name}</h5>

            </>
        </ModalComponent>}
       
        <NavLink to={`/shop/category/${props.id}`} style={{ textDecoration: 'none', margin:0,padding:0 }} >
        <Card className="CategoryCard">
            
            <CardImg src={`${process.env.REACT_APP_BOOKSTORE_ASSET_URL}/${props.image}`} alt={props.name}/>
            <CardTitle >
            {props.name}

            </CardTitle>
            <CardFooter>

                <CardLink>
                    <NavLink to='/'>View All Items</NavLink>
                </CardLink>
                {props.isAdmin && 
                <CardLink>
                    <NavLink to={`/admin/category/${props.id}`}><AiFillEdit ></AiFillEdit></NavLink>
                    <NavLink to='#' onClick={()=>{setmodalOpen(true)}}><AiTwotoneDelete /></NavLink>
                </CardLink>
                }
            </CardFooter>
        </Card>   
        </NavLink>
        </>
    )
}
const mapStateToProps = state => {
    return {
        isAdmin:state.auth.isAdmin,
        isAuthenticated:state.auth.isAuthenticated,
        user:state.auth.user
    }
}
const mapDispatchToProps =dispatch => {
    return {
        onDeleteCategory : (id,token) =>dispatch(Actions.deleteCategory(id,token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
