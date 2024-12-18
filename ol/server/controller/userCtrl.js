const User = require('../model/user');
const jwt = require('jsonwebtoken');
const ValidationUser = require('../validation/userValidation');

const getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(
            {
                success: true,
                message: 'User retrieved successfully',
                innerData: user
            }
        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById({ _id: id });

        res.json(
            {
                success: true,
                message: 'User retrieved successfully',
                innerData: user
            }
        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const SignIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username, }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.json(
            {
                message: 'User logged in successfully',
                token,
                user,
            });


    } catch (err) {
        console.log(err);
    }
}

const createUser = async (req, res) => {
    const { username } = req.body;
    try {
        const { error } = ValidationUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await User.findOne({ username: username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (err) {
        console.log(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        console.log(err);
    }
}

const UpdateUser = async (req, res) => {
    try {
        const { error } = ValidationUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
        }
        res.status(200).json({ message: 'User updated successfully!' });
    }
    catch (err) {
        console.log(err);
    }
}

const searchUsers = async (req, res) => {
    console.log(req.query.name);
    try {
        const query = req.query.name;
        const users = await User.find({ firstName: query });
        if (!users) {
            res.status(400).json({ message: 'No users found!' });
        }
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
    }
}


// ------------------------------------------
// req.query URL ning so'rov qatoridagi (query string)
// parametrlarini olish uchun ishlatiladi. Bu ma'lumotlar 
// URL oxirida "?" belgisi orqali kiritiladi.

// req.params URL yo'nalishi (route) orqali yuborilgan 
// dinamik parametrlarni olish uchun ishlatiladi. 
// Parametrlar URL ichida kiritiladi va ular odatda to'g'ridan-to'g'ri 
// marshrutda belgilanadi.

// get user query
const UserQuery = (req, res) => {
    try {
        const { firstName } = req.query;

        const users = User.find(firstName);
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
}

// get user params
const getUserParams = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getUserParams,
    UserQuery,
    createUser,
    getUser,
    SignIn,
    deleteUser,
    UpdateUser,
    searchUsers
};




