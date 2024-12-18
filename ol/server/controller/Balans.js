const storyBalans = require('../model/storyProducts');

const getBalans = async (req, res) => {
    try {
        const products = await storyBalans.find();
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

const updateMoney = async (req, res) =>{
    try {
        const {_id, amount, action} = req.body;

        const existingBalans = await getBalansStory.findById(_id);

        if (!existingBalans) {
            return res.status(400).json({message: "Balans not find"});
        }
        let updateBalans;
        if (action === 'add') {
            updateBalans = existingBalans.balance + amount;
        } else if (action === 'get'){
            updateBalans = existingBalans.balance - amount;
            if(updateBalans < 0){
                return res.status(400).json({message: "Insufficient funds"});
            }
        } else {
            return res.status(400).json({message: "Invalid action"});
        }
        existingBalans.balans = updateBalans;
        await existingBalans.save();
        res.json({message: "Balans updated successfully"});
        } catch (err) {
            res.status(500).json({ message: err.message });

}
}

const deleteStory = async (req, res) => {
    try {
        const Products = await storyBalans.findByIdAndDelete(req.params.id);
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
    getBalans,
    updateMoney
}



