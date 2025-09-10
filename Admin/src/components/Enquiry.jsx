import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react';

const Enquiry = () => {
    const [enquiry, setEnquiry] = useState([]);
  
    const getData = async () => {
      try {
        const response = await axios.get(
          'https://gift-nation.onrender.com/api/enquiry/list-enquiry'
        );
        setEnquiry(response.data.enquiries);
        
      } catch (error) {
        console.error(error);
      }
    };

     useEffect(() => {
        getData();
      }, []);
  
  return (
    <div>
  {enquiry.map((enq, index) => (
    <div key={index} style={{ backgroundColor: '#f0f0f0', padding: '20px', margin: '10px', borderRadius: '10px' }}>
      <h4 style={{ marginBottom: '10px' }}>{enq.email}</h4>
      <p style={{ fontSize: '18px' }}>{enq.message}</p>
    </div>
  ))}
</div>
  )
}

export default Enquiry
