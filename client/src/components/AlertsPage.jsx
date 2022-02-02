import React, {useEffect} from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import AlertForm from "./widgets/AlertForm";
import AlertWidget from "./widgets/AlertWidget";
import { useDispatch, useSelector } from "react-redux";
import {fetchAlerts} from "../actions/alerts";


function createAlertBox(alert){
  return <AlertWidget alertData={alert}/>
}

function AlertsPage(props) {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alertReducer);
  
  useEffect(() => {
    dispatch(fetchAlerts(localStorage.getItem("currentUserUniqueId")));
  }, [dispatch])
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <AlertForm />
        {alerts? alerts.map(createAlertBox): null}
      </div>
    </div>
  );
}

export default AlertsPage;
