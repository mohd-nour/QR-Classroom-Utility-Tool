import React, { useEffect, useRef } from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import Banner from "./widgets/Banner";
import AddClassComponent from "./widgets/AddClassComponent";

function AddClassPage(props) {
  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);
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
