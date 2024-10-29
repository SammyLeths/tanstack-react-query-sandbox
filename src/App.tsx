// import { useEffect, useState } from "react";
// import axios from "axios";

// // Old way of fetching

// const App = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/todos")
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return <div>{JSON.stringify(data)}</div>;
// };

// export default App;

import Projects from "./components/Projects";
//import Todo from "./components/Todo";

const App = () => {
  return (
    <>
      <Projects />
    </>
  );

  // <Todo />;
};

export default App;
