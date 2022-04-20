import React, { useEffect } from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolls } from '../../actions/polls';

const createPollCard = (poll) => {
  return (
    <div className="poll-card" key={poll._id}>
      <h2>{poll.title}</h2>
      <div className="flex-row">
        <div className="creator-section">
          <div className="post-avatar"></div>
          <div className="post-info">
            <h5>{poll.professorName}</h5>
            <h6 className="sub-info">40 minutes ago • {poll.courseTitle}</h6>
          </div>
        </div>
        <Link to="/Polls" className="removeUnderline white">
          <button className="form-button fit-content">
            <span>View Results</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

const ViewPolls = () => {
  const dispatch = useDispatch();
  const polls = useSelector((state) => state.polls);
  console.log(polls);
  useEffect(() => {
    dispatch(fetchPolls(localStorage.getItem('currentUserUniqueId')));
  }, [dispatch]);
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <div className="view-polls-column">
          <h2 className="view-poll-title">Your Polls</h2>
          {polls.map(createPollCard)}
        </div>
      </div>
    </div>
  );
};

export default ViewPolls;
