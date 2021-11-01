
import { FiSearch } from 'react-icons/all'
import { CustomInput, Form, FormGroup, Label } from 'reactstrap'
import './FilterSidebar.scss';
import { Categories} from '../../data'
const FilterSidebar = props => {
    const searchSubmitHandler=(event)=>{
        event.preventDefault()
    }
    return (
        <div className="sidedrawer">

            <form className="searchForm" onSubmit={searchSubmitHandler}>
                <input placeholder="Search items"></input>
                <FiSearch />
               
                <button hidden type='submit'></button>
            </form>

        <Form className="filterForm">
        <FormGroup>
            <Label for="Category Box" className="formLabel">Categories</Label>
            <div>
                {props.categories.map((category)=>(
                    <CustomInput type="checkbox" 
                            id={category.id} 
                            label={category.name}
                            value ={category.name}></CustomInput>
                    ))
                }
            
            </div>
      </FormGroup>
      </Form> 
    </div>
    )
}


export default FilterSidebar
