import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";


function GradeSheetCard(props) {
  const dispatch = useDispatch();
  const {courseId} = useSelector((state) => state.currentCourse);

  const loadGradeSheet = () => {
    
    //dispatch({type: "SET_GRADE_SHEET", payload: })
  }

  return (
    <div className="card-container">
      <div className="class-card">
          <Link to={"/CreateGradeSheet/Old"} onMouseEnter={loadGradeSheet} state={{id: props.id}}>
            <div className="session-link" >
              <h3 >{props.cardName}</h3>
            </div>
          </Link>
        <button
          onClick={() => {
            swal("Are you sure you would like to delete this grade sheet?", {
              buttons: {
                cancel: {
                  text: "Cancel",
                  value: false,
                  visible: true,
                },
                confirm: {
                  text: "Yes",
                  value: true,
                  visible: true,
                },
              },
            }).then((value) => {
              if (value) {
                  /*
                dispatch(
                  removeSession(courseId, props.sessionNumber)
                );*/
              }
            });
          }}
          className="uil uil-trash delete-icon"
        ></button>
        <div></div>
      </div>
    </div>
  );
}

export default GradeSheetCard;
