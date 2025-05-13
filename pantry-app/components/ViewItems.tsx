import axios from 'axios';
import { useEffect, useState } from 'react';

const ViewItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')  // Fetch data from your backend
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <div>
      <h1>Pantry Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name} - {item.category} - {item.quantity} - {item.expirationDate}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewItems;
