const stoyrPro = require('../model/storyProducts');

const getStory = async (req, res) => {
    try {
        const products = await stoyrPro.find();
        res.json(
            {
                success: true,
                message: 'story retrieved successfully',
                innerData: products
            }
        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getStoryById = async (req, res) => {
    try {
        const userId = req.params.id;
        const userProducts = await stoyrPro.findById({ userId: userId });

        res.json(
            {
                success: true,
                message: 'stories retrieved successfully',
                innerData: userProducts
            }
        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteStory = async (req, res) => {
    try {
        const Products = await stoyrPro.findByIdAndDelete(req.params.id);
        if (!Products) {
            res.status(400).json({ message: 'Story not found!' });
        }
        res.status(200).json({ message: 'Story deleted successfully' });
    }
    catch (err) {
        console.log(err);
    }
}



module.exports = {
    getStory,
    getStoryById,
    deleteStory
}



