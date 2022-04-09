import React, { useState } from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate } from 'react-router-dom';
import FileBase64 from "react-file-base64";

const Profile = () => {
  const [image, setImage] = useState("");
  if (localStorage.getItem('profile') == null) {
    return <Navigate to="/"></Navigate>;
  }
  const setProfilePic = ({base64}) => {
      setImage(base64);
      console.log("before");
      console.log(image);
      console.log("After");
  }
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <FileBase64
        type="file"
        multiple= {false}
        onDone = {setProfilePic}
        >
        </FileBase64>
        <img style={{ width: '20%', height: 300 }} src={image}/>
      </div>
    </div>
  );
};

export default Profile;
