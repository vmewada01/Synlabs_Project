// //
// import React, { useState } from 'react';

// const originalData = [
//   { id: 1, type: 'A' },
//   { id: 2, type: 'B' },
//   { id: 3, type: 'A' },
//   { id: 4, type: 'C' },
//   // ... more data
// ];

// // const filteredData = originalData.filter(item => item.type === 'A');

// // console.log(filteredData);

// function FilteredList() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const originalData = [
//     { id: 1, name: 'Apple' },
//     { id: 2, name: 'Banana' },
//     { id: 3, name: 'Orange' },
//     // ... more data
//   ];

//   const filteredData = originalData.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={e => setSearchTerm(e.target.value)}
//       />

//       <ul>
//         {filteredData.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FilteredList;

import React, { useState, useEffect } from "react";
import axios from "axios";

function FilteredListFromAPI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response.data);
        setOriginalData(response.data);
        setFilteredData(response.data); // Initialize filteredData with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Apply filtering when searchTerm changes
    const newFilteredData = originalData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(newFilteredData);
  }, [searchTerm, originalData]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilteredListFromAPI;
