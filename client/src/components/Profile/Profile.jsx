import React, { useState } from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate, useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { setProfilePicture } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const [img, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hiddenFileInput = React.useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // Use a regex to remove data url part
      const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '');

      console.log(base64String);
      setImage(base64String);
      // Logs wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(fileUploaded);
  };
  /*
  const setProfilePic = () => {
    console.log(image);
    dispatch(setProfilePicture(localStorage.getItem('currentUserUniqueId'), image, navigate));
  };
  */
  const hidden = {
    display: 'none'
  }
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container profile-page">
        <div className="profile-header">
          <div className="profile-picture">
            <div className="upload-picture flex-center">
              <i className="uil uil-camera" onClick={handleClick}></i>
              <input type="file" style={hidden} ref={hiddenFileInput} onChange={handleChange}></input>
            </div>
          </div>
          <div className="information-section">
            <div>
              <h2 className="profile-heading" >Ali El Hajj</h2>
              <h5 className="profile-subheading">
                American University of Beirut
              </h5>
              <h5 className="profile-subheading">
                Beirut
                <i className="location-icon uil uil-map-marker"></i>
              </h5>
            </div>
            <div className="profile-stats">
              <div className="stat-card">
                <h4 className="stat-card-title">Active Classes</h4>
                <h1>4</h1>
              </div>
              <div className="stat-card">
                <h4 className="stat-card-title">Polls Administered</h4>
                <h1>5</h1>
              </div>
              <div className="stat-card">
                <h4 className="stat-card-title">Sheets Graded</h4>
                <h1>7</h1>
              </div>
              <div className="stat-card">
                <h4 className="stat-card-title">Students</h4>
                <h1>80</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-body">
          <div className="profile-sidebar">
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Role</h4>
              <h5 className="profile-subheading">Assistant Professor</h5>
            </div>
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Department</h4>
              <h5 className="profile-subheading">Electrical & Computer</h5>
            </div>
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Email</h4>
              <h5 className="profile-subheading">elhajj@aub.edu.lb</h5>
            </div>
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Extension</h4>
              <h5 className="profile-subheading">4456</h5>
            </div>
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Office</h4>
              <h5 className="profile-subheading">Bechtel 502</h5>
            </div>
          </div>
          <div className="profile-form">
            <div className="profile-form-column">
              <div className="input-container">
                <label>Name</label>
                <input className="std-input"></input>
              </div>
              <div className="input-container">
                <label>Department</label>
                <input className="std-input"></input>
              </div>
              <div className="input-container">
                <label>City</label>
                <input className="std-input"></input>
              </div>
            </div>
            <div className="profile-form-column">
              <div className="input-container">
                <label>Role</label>
                <input className="std-input"></input>
              </div>
              <div className="input-container">
                <label>Extension</label>
                <input className="std-input"></input>
              </div>
              <div className="input-container">
                <label>Office</label>
                <input className="std-input"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
