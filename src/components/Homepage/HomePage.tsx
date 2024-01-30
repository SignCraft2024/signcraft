import React, { useState } from "react";
import { Button } from "react-bootstrap";
import SignatureHistory from "./SignatureHistory";
import "../../styles/Home.css";

const Home = () => {
 const [signature] = useState("");

 const handleSubmit = (event: { preventDefault: () => void; }) => {
   event.preventDefault();
   console.log("Signature:", signature);
 };

 return (
   <div>
     <h1>SignCraft for your online signature</h1> {}
     <Button onClick={handleSubmit}>Add signature</Button>
     <SignatureHistory/>
   </div>
 );
};

export default Home;
