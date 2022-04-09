 import React, { useState } from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate, useNavigate } from 'react-router-dom';
import FileBase64 from "react-file-base64";
import { setProfilePicture } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('currentUserUniqueId');
  if (localStorage.getItem('profile') == null) {
    return <Navigate to="/"></Navigate>;
  }

  const setProfilePic = () => {
    console.log(image);
    console.log(userId);
    dispatch(setProfilePicture(userId, image, navigate));
  }
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <FileBase64
        type="file"
        multiple= {false}
        onDone = {({ base64 }) => setImage(base64)}
        >
        </FileBase64>
        <img style={{ width: '20%', height: 300 }} src={image}/>
        <button  style={{ width: '20%', height: 100 }} onClick={setProfilePic}>Set profile picture!</button>
      </div>
    </div>
  );
};

export default Profile;
