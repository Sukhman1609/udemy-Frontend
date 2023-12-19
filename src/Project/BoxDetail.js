
import React, { useContext,useState } from 'react';
import { useParams } from 'react-router-dom';
import { Store1 } from './ContextAPI';
// import { NavLink } from 'react-router-dom';
import Footer from './Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './Styles/Detail.css'
import { useCart } from './Cart/CartContext';


const Detail = ({ hoveredItem }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { addToCart } = useCart();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
 
  const navigate = useNavigate();
if(showLoginPopup){
  console.log('abc')
}
  if(orderPlaced){
    console.log('asd')
  }
  const { id } = useParams();
  const [ContextData] = useContext(Store1);
  console.log(id);
  const selectedItem = ContextData.find((item) => item && item.id === parseInt(id));

  if (!selectedItem) {
    navigate('/404'); 
    return null;
  }

  const item = ContextData.find(item =>  item && item.id === parseInt(id));

  if (!item) {
    return <div>Item not found</div>;
  }

  
  const handleBuyNow = () => {
   
    const token = localStorage.getItem("token");
    console.log('Handle Buy Now called');
    if (!token) {
      setShowLoginPopup(true);
      alert('Please Login First to continue with purchase!!!')    
      window.location.href = '/login';
    return;
    } 
    else {
      addToCart(item);
      setOrderPlaced(true);
  
      setTimeout(() => {
        setOrderPlaced(false);
      }, 5000);
      console.log('Handle Buy Now called222222222222');
      
     
    }
  };


  return (
    <div className='Detail'>
      
      <div className='mainDetails'>
    
          <div className='rightDetails'>
            <div className='DetailsinBox'><p className='name2'>{selectedItem.name}</p>
          
          <p className='Headingthis'>{selectedItem.heading}</p>
          <p className='rating2'>
           {selectedItem.rating}
            <span style={{ color: ' rgb(209, 176, 8)', fontSize: '15pt', marginTop: '20px' }}>{selectedItem.rating_stars}</span>
          </p>
          <p className='studentsthis'>
1,828,231 students</p>
<p className='authorthis' >
Created By {selectedItem.author}</p></div>
 
<div className='desc'><h2>What you'll Learn</h2>
            <p >&#10003; {selectedItem.description}</p></div>
          
         </div>
          <div className='leftSection'>

<img src={selectedItem.bollywoodimg} alt={selectedItem.name} className='subImg5' />
<p style={{fontSize:'16pt',fontWeight:'600',textAlign:'center'}}>Personal</p>
<hr></hr>
<p className='price2'>₹ {selectedItem.price}&nbsp; <span style={{fontSize:'14pt'}}>80% off</span></p>
<p style={{color:'maroon',fontWeight:'600',marginLeft:'30px'}}>&#128337; 1 day left at this price!</p> <button className='bestSellerButton2' onClick={handleBuyNow}>ADD TO CART</button></div>
        
      </div>
      
      <div className='foot'>
      <Footer /></div>
    </div>
  );
};

export default Detail;

