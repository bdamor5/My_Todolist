import React from 'react'
import './Card.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Card = ({listitem,deleteOne,TextFieldEdit,id}) => {
    return (
        <>
            <div className='container mx-auto'>
                    <div className='carditem'>
                    {
                        //we will only display datas when listitem is not empty
                        listitem
                        &&
                        <ul>
                            <ArrowForwardIosIcon className='arrow' id='arrowhover'/> 
                            <li>{listitem}</li>                                
                            <EditIcon 
                            className='edit'
                            onClick={() => TextFieldEdit(id)}    
                            />
                            
                            <DeleteIcon 
                            className='delete'
                            onClick={() => deleteOne(id)}    
                            />                  
                        </ul>
                    }                        
                                             
                    </div>
                </div>           
        </>
    )
}

export default Card
