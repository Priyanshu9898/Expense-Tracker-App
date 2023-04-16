import React, {useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Form, Container } from 'react-bootstrap';
// import loading from "../../assets/loader.gif";
import "./home.css";
import { addTransaction, getTransactions } from '../../utils/ApiRequest';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';
import TableData from './TableData';

const Home = () => {

  const navigate = useNavigate();
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }
  const [cUser, setcUser] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const avatarFunc = async () => {
      if(localStorage.getItem('user') ){
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        
        if(user.isAvatarImageSet === false || user.avatarImage === ''){
          navigate('/setAvatar');
        }
        setcUser(user);
        setRefresh(true);
      }
      else{
        navigate('/login');
      }
    }

    avatarFunc();

  }, [navigate]);

  const [values, setValues] = useState({
    title : "",
    amount : "",
    description : "",
    category : "",
    date : "",
    transactionType : "",

  });


  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {title, amount, description, category, date, transactionType} = values;
    
    if(!title || !amount || !description || !category || !date || !transactionType){
      toast.error("Please enter all the fields", toastOptions);
    }
    setLoading(true);

    const {data} = await axios.post(addTransaction, {
      title: title,
      amount: amount,
      description: description,
      category: category,
      date: date,
      transactionType: transactionType,
      userId: cUser._id
    });

    

    if(data.success === true){
      toast.success(data.message, toastOptions);
      await handleClose();
      await setRefresh(!refresh);
    }
    else{
      toast.error(data.message, toastOptions);
    }

    setLoading(false);

  }


  

  useEffect(() => {
    const fetchAllTransactions = async (req, res) => {
      try{
  
        setLoading(true);
        const {data} = await axios.get(`${getTransactions}/${cUser._id}`);
        console.log(data);
        
        if(data.success === true){
          setTransactions(data.transactions);
        }
        else{
          toast.error(data.message, toastOptions);
        }
  
        setLoading(false);
      }
      catch(err){
        toast.error("Error please Try again...", toastOptions);
      }
    }

    fetchAllTransactions();
  } , [refresh]);

  return (
    <>
    
      <Header/>

      {loading ? (<>
        <Spinner />
      </>) : (<>
        <Container style={{position: 'relative', zIndex: "2 !important"}} className="mt-3">
        <div className="filterRow">
          <div className='text-white'>Filter</div>
          <div>
            <Button onClick={handleShow}>Add New</Button>

            <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Title</Form.Label>
              <Form.Control  name="title" type="text" placeholder="Enter Transaction Name" value={values.name} onChange={handleChange}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control  name="amount" type="number" placeholder="Enter your Amount" value={values.amount} onChange={handleChange}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formSelect">
              <Form.Label>Category</Form.Label>
              <Form.Select  name="category" value={values.category} onChange={handleChange}>
                <option value="">Choose...</option>
                <option value="groceries">Groceries</option>
                <option value="rent">Rent</option>
                <option value="rent">Salary</option>
                <option value="rent">Tip</option>
                <option value="rent">Food</option>
                <option value="rent">Medical</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="transportation">Transportation</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text"  name="description" placeholder="Enter Description" value={values.description} onChange={handleChange}/>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formSelect1">
            <Form.Label >Transaction Type</Form.Label>
              <Form.Select  name="transactionType" value={values.transactionType} onChange={handleChange}>
                <option value="">Choose...</option>
                <option value="credit">Credit</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date"  name="date" value={values.date} onChange={handleChange}/>
            </Form.Group>
            
            {/* Add more form inputs as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
        </div>
        <br style={{color: "white"}}></br>

        <TableData data={transactions} />
        <ToastContainer />
      </Container>
      </>) }
      

    </>
  )
}

export default Home