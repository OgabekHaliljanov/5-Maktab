const { Router } = require('express');

const story = Router();
const { getStory,
    getStoryById,
    deleteStory } = require('../controller/story');

story.get("/getStorys", getStory);
story.delete("/deleteStory/:id", deleteStory);
story.get("/getStoryById/:id", getStoryById);
module.exports = story;





