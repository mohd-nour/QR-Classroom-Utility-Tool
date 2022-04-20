import Poll from "../models/poll.js";

export const fetchPollsForProfessor = async (req, res) => {
    try {
      const professorId = req.params.professorId;
      const polls = await Poll.find({
        createdBy: professorId
      });
      res.status(201).json(polls);
    } catch (error) {
      res.status(409).json({message: error.message});
    }
};

export const fetchPollsForStudent = async (req, res) => {
  try {
    const arrayOfClassesIds = req.body;
    const polls = await Poll.find({
      classId: {
        $in: arrayOfClassesIds
      }
    });
    res.status(201).json(polls);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};
  
export const createPoll = async (req, res) => {
    try {
      const {classId, options, professorId, title, professorName, courseTitle} = req.body;
      const poll = await Poll.create({
        createdBy: professorId,
        classId: classId,
        options: options,
        title: title,
        professorName: professorName,
        courseTitle: courseTitle
      });
      res.status(201).json({result:poll, error: false});
    } catch (error) {
      res.status(409).json({message: error.message, error: true});
    }
};

export const updatePoll = async (req, res) => {
  try {
      const { optionNumber, pollId, instituteId } = req.body;
      const poll = await Poll.findById(pollId);
      if (poll){
        const studentIds = poll.studentIds;
        for (var j=0; j<studentIds.length; j++){
          if (studentIds[j] === instituteId){
            return res.send({message: "This student already answered this poll", error:true});
          }
        }
        const options = poll.options;
        for (var i=0; i<options.length; i++){
          if (options[i].optionNumber === optionNumber){
            options[i].optionVotes += 1;
          }
        }
        Poll.findByIdAndUpdate(pollId, {
          options: options,
          $addToSet: {studentIds: instituteId}
        }, function(err, result){
          if (err){
            res.send(err);
          }
          else{
            res.status(200).send({message: "Vote submited successfully!", error:false});
          }
        });
      }
      else{
        res.send({message: "Poll not found", error: true});
      }
  } catch (error) {
    res.status(500).json({message: error.message, error: true});
  }
};