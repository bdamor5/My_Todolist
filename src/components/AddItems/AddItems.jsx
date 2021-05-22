import React,{useState,useEffect} from 'react'
import './AddItems.css';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Card from '../Card/Card';
import EditIcon from '@material-ui/icons/Edit';

//to get data from local storage when we refresh our page , so that our todolist will not become empty
const getLocalItems = () =>{
    const todolists = localStorage.getItem('todolists');

    if(todolists){
        return JSON.parse(todolists);
    }else{
        return [];
    }
    
}

const AddItems = () => {    

    const [item , setItem] = useState('');

    //by calling our getlocalitems , we will set the data stae and that way we can display our items
    const [data , setData] = useState(getLocalItems());
    
    //if getlocalitems() returns [] , it will be 0 else it will be 1
    //so that way we can alter our clear all button to show or not
    //console.log(getLocalItems().length);
    const [showclearall , setShowClearAll] = useState(getLocalItems().length ? true : false);
    
    const [showedit , setShowEdit] = useState(false);
    const [editItemId,setEditItemId] = useState(0);

    //whenever the data state is updated , 
    //we will store the data array values in the local storage as todolists
    useEffect(()=>{
        localStorage.setItem('todolists', JSON.stringify(data));
    },[data]);

//will trigger when addicon is clicked
    const addItem = () =>{
        //checking if the textfield is empty or not
        if(!item){
            alert('Please Enter An Item');
        }else{
            //creating an object which will contain id & user item
            const userItem = {
                id : new Date().getTime().toString(),
                todoitem : item
            }

            //added the object in to the array
            setData([...data , userItem]);
            //console.log(data,userItem);
            
            //now as the data state contains an entry , we will show the clear all button
            setShowClearAll(true);
            setItem('');
        }
                
    }

//will trigger when delete icon from Card.js is clicked on , 
//which passes the id of the item to be deleted
    const deleteOne = (deleteId) =>{

        //removing that entry using filter method
        const updatedData = data.filter((curr)=>{
            return curr.id !== deleteId;
        })

        //updating the new data array
        setData(updatedData);

        //experimental , we can observe the console value to be 1 , 
        //so we will not show clear all button
        
        //console.log(data.length);
        if(data.length === 1){
            setShowClearAll(false);
        }
    }

//will trigger when clear all button is clicked on
    const deleteAll = () =>{
        setData([]);
        setShowClearAll(false);
    }

//will trigger when editicon from Card.js is clicked on , 
//which passes the id of the item to be edited    
    const TextFieldEdit = (editId) =>{

        //as we are going to edit ,we will replace add icon to edit icon
        //console.log(editId);
        setShowEdit(true);

        //finding that entry which is to be edited
        var toEdit = data.find((curr)=>{
           return curr.id === editId;
        })

        //toEdit contains the value which is to be edited
        toEdit = toEdit.todoitem;

        //now we will update textfield to the edited value
        setItem(toEdit);

        //storing the id of that item to be edited
        setEditItemId(editId);
    }

    //will trigger when edit icon is clicked on
    const addEditItem = () =>{

        //finding that id to be edited and updating it with the new field value which the user will input
        const editedItem = data.find((curr)=>{
            if(curr.id === editItemId){
                return curr.todoitem = item;
            }
        })
        
        //now that we have edited our value , we will show the add icon
        setShowEdit(false);
        setItem('');
    }

    return (
        <>
            <div className='container mx-auto my-5'>
                <div className='additems'>
                    <h3>Enter An Item Name :</h3>
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder='Ex. eggs' 
                        autoComplete='off'
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        />
                    {
                        showedit 
                        ? 
                        <EditIcon
                            className='edit'
                            onClick={addEditItem}
                        />
                        :
                        <AddIcon 
                        className='addicon'
                        onClick={addItem}
                        />
                    }                    

                    <HighlightOffIcon
                        className='clearicon'
                        onClick={() => setItem('')}
                    />
                </div>                
            </div>
            <div className='item'>
                {
                    data.map((curr,i) =>{
                        return <Card 
                        key={i}
                        listitem={curr.todoitem}
                        id={curr.id} 
                        deleteOne={deleteOne}
                        TextFieldEdit = {TextFieldEdit}                        
                        />
                    })
                }
                {
                    showclearall
                    &&
                    <button 
                    className='btn btn-outline'
                    onClick={deleteAll}>Clear All</button>
                }
                
            </div>
        </>
    )
}

export default AddItems
