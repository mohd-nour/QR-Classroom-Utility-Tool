import React, { useEffect } from 'react';
import VerticalNavBar from './widgets/VerticalNavBar';
import AlertForm from './widgets/AlertForm';
import AlertWidget from './widgets/AlertWidget';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlerts } from '../actions/alerts';

function createAlertBox(alert) {
  const seconds = (new Date() - new Date(alert.createdAt)) / 1000;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  var createdSince;

  if (days === 1) {
    createdSince = `${days} day ago`;
  } else if (days >= 1) {
    createdSince = `${days} days ago`;
  } else if (hours === 1) {
    createdSince = `${hours} hour ago`;
  } else if (hours >= 1) {
    createdSince = `${hours} hours ago`;
  } else if (minutes === 1) {
    createdSince = `${minutes} minute ago`;
  } else if (minutes >= 1) {
    createdSince = `${minutes} minutes ago`;
  }

  return (
    <AlertWidget
      alertData={alert}
      key={alert._id}
      createdSince={createdSince}
    />
  );
}

function AlertsPage(props) {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alertReducer);
  useEffect(() => {
    dispatch(fetchAlerts(localStorage.getItem('currentUserUniqueId')));
  }, [dispatch]);
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <AlertForm />
        {alerts ? alerts.slice(0).reverse().map(createAlertBox) : null}
      </div>
    </div>
  );
}

export default AlertsPage;
