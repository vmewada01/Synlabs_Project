 

import React, { useState } from 'react';

const C = () => {
  const initialData = {
    name: 'John Doe',
    age: 25,
  };

  const [data, setData] = useState(initialData);
  const [additionalDataFetched, setAdditionalDataFetched] = useState(false);
  const [checking_data, setChecking_data] = useState({
    name:'vishal',
    surname:'mewada',
    company: 'synergy private limited',
    location: 'gurgaon'
  })

  const new_Data=[
    {
        name:'jatin',
        surname:'mewada',
        company: 'self Employed',
        location: 'MP'
    },
    {
        name:'safal',
        surname:'mewada',
        company: 'College',
        location: 'BU University'
    }
  ]

  // Simulate fetching additional data from an API
  const fetchAdditionalData = () => {
    // Replace this with your actual API fetch logic
    alert("Button got clicked")
    setTimeout(() => {
      const fetchedAdditionalData = {
        address: '123 Main St',
        phoneNumber: '555-1234',
      };
      setData((prevData) => ({ ...prevData, ...fetchedAdditionalData }));
      setChecking_data({...checking_data, new_Data })
      setAdditionalDataFetched(true);
      
    }, 2000); // Simulating a 2-second API call delay
  };



  return (
    <div>
      <h1>{data.name}</h1>
      <p>Age: {data.age}</p>

      {additionalDataFetched ? (
        <>
          <p>Address: {data.address}</p>
          <p>Phone Number: {data.phoneNumber}</p>
        </>
      ) : (
        <button onClick={fetchAdditionalData}>Fetch Additional Data</button>
      )}


      <div>
        
         <h1>New Bug Fixing</h1>
         <div>
            <p>{checking_data.name}</p>
            <p>{checking_data.surname}</p>
            <p>{checking_data.company}</p>
            <p>{checking_data.location}</p>
         </div>
      </div>
    </div>
  );
};

export default C;
