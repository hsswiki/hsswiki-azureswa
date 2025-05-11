// import React from 'react';

// function App() {
//   const value = 'World';
//   return <div>Hello {value}</div>;
// }

// export default App;

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [data, setData] = useState('');

//   useEffect(() => {
//     (async function () {
//       // const { text } = await( await fetch(`/api/message`)).json();
//       const text = await fetch(`/api/message`);
//       setData(text);
//     })();
//   });

//   return <div>{data}</div>;
// }

// export default App;

import React, { useState } from "react";

function App() {
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/message`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();
      setData(text);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData("An error occurred while fetching the data.");
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Message</button>
      <div>{data}</div>
    </div>
  );
}

export default App;
