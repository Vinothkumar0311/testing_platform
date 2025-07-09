const { Challenge, UserChallenge } = require('../models');

// Get all challenges with user progress
exports.getAllChallenges = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get all challenges
    const challenges = await Challenge.findAll();
    
    // Get user's progress for each challenge
    const userChallenges = await UserChallenge.findAll({
      where: { userId }
    });
    
    // Combine data
    const result = challenges.map(challenge => {
      const userChallenge = userChallenges.find(uc => uc.challengeId === challenge.id) || {};
      return {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        points: challenge.points,
        timeLimit: challenge.timeLimit,
        languages: challenge.languages,
        status: userChallenge.status || 'Available',
        attempts: userChallenge.attempts || 0,
        successRate: challenge.successRate,
        score: userChallenge.score,
        completedAt: userChallenge.updatedAt
      };
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ error: 'Failed to fetch challenges' });
  }
};

// Get challenge details by ID
exports.getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const challenge = await Challenge.findByPk(id);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    
    const userChallenge = await UserChallenge.findOne({
      where: { userId, challengeId: id }
    });
    
    const result = {
      ...challenge.get({ plain: true }),
      status: userChallenge?.status || 'Available',
      attempts: userChallenge?.attempts || 0,
      score: userChallenge?.score
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    res.status(500).json({ error: 'Failed to fetch challenge' });
  }
};


exports.submitChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { answers, timeSpent } = req.body;

    const challenge = await Challenge.findByPk(id);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    // Calculate score based on answers
    const totalQuestions = challenge.questions?.length || 0;
    const correctAnswers = Object.entries(answers).filter(
      ([questionId, answer]) => {
        const question = challenge.questions.find(q => q.id === questionId);
        return question && question.correctAnswer === answer;
      }
    ).length;

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const status = score >= challenge.passingScore ? 'Passed' : 'Failed';

    // Update or create user challenge record
    const [userChallenge, created] = await UserChallenge.findOrCreate({
      where: { userId, challengeId: id },
      defaults: {
        status,
        attempts: 1,
        score,
        timeSpent,
        answers
      }
    });

    if (!created) {
      userChallenge.attempts += 1;
      userChallenge.status = status;
      userChallenge.score = score;
      userChallenge.timeSpent = timeSpent;
      userChallenge.answers = answers;
      await userChallenge.save();
    }

    res.json({
      success: true,
      score,
      status,
      correctAnswers,
      totalQuestions
    });
  } catch (error) {
    console.error('Error submitting challenge:', error);
    res.status(500).json({ error: 'Failed to submit challenge' });
  }
};