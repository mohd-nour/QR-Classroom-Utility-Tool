import React, { useEffect, useRef } from "react";
import VerticalNavBar from "../widgets/VerticalNavBar";
import Banner from "../widgets/Banner";
import AddClassComponent from "../Courses/AddClassComponent";
import { Navigate } from "react-router-dom";

function AddClassPage(props) {
  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  if (localStorage.getItem("profile") == null) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <Banner />
        <AddClassComponent />
      </div>
      <div ref={endRef}></div>
    </div>
  );
}

export default AddClassPage;
