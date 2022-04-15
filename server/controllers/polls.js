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
      const {classId, options, professorId} = req.body;
      const poll = await Poll.create({
        createdBy: professorId,
        classId: classId,
        options: options
      });
      res.status(201).json(poll);
    } catch (error) {
      res.status(409).json({message: error.message});
    }
};

export const updatePoll = async (req, res) => {
  try {
      const { optionNumber, pollId } = req.body;
      const poll = Poll.findById(pollId);
      var options = poll.options;
      options.optionNumber += 1;
      Poll.findByIdAndUpdate(pollId, {
        options: options
      }, function(err, result){
        if (err){
          res.send(err);
        }
        else{
          res.status(200).send(result);
        }
      });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};