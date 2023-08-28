import logo from "./logo.svg";
import "./App.css";
import Table_com from "./components/Table_com";
import New_component from "./components/New_component";
import Routing from "./Routes/Routes.config";

import Checking from "./components/Checking ";
import FilteredListFromAPI from "./components/Checking ";
import Checking2 from "./components/Chekcing2";

function App() {
  return (
    <div className="App">
      {/* <h1>Table data creating</h1> */}
      <Routing />
      {/* <FilteredListFromAPI /> */}
      {/* {<New_component />} */}
      {/* <Checking /> */}
      {/* <Checking2/> */}
    </div>
  );
}

export default App;
