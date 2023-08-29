import { Routes, Route } from "react-router-dom"
import Table_com from "../components/Table_com";
import Personal_Details from "../components/Personal_Details";
import Create_New_Account from "../components/Create_New_Account";


const Routing =()=> {
    return (
       <Routes>
          <Route path="/api/customer/list" element={<Table_com/>} />
          <Route path="/api/customer/personalDetails" element={<Personal_Details/>} />
          <Route path="/api/customer/create_new_account" element={<Create_New_Account />} />
          
       </Routes>
    )
}

export default Routing;

