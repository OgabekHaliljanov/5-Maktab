const Products = require('../model/products');
const stoyrPro = require('../model/storyProducts');
const Balans = require('../model/Balans')

const getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.json(
            {
                success: true,
                message: 'products retrieved successfully',
                innerData: products
            }
        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const userProducts = await Products.findById({ userId: userId });

        res.json(
            {
                success: true,
                message: 'Products retrieved successfully',
                innerData: userProducts
            }
        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const newProducts = new Products(req.body);
        await newProducts.save();
        res.status(201).json({ message: 'Products created successfully' });
    }
    catch (err) {
        console.log(err);
    }
};

const deleteProducts = async (req, res) => {
    try {
        const Products = await Products.findByIdAndDelete(req.params.id);
        if (!Products) {
            res.status(400).json({ message: 'Products not found!' });
        }
        res.status(200).json({ message: 'Products deleted successfully' });
    }
    catch (err) {
        console.log(err);
    }
}


const UpdateProducts = async (req, res) => {
    try {
        const Products = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!Products) {
            res.status(400).json({ message: 'Products not found!' });
        }
        res.status(200).json({ message: 'Products updated successfully!' });
    }
    catch (err) {
        console.log(err);
    }
}


const saleProducts = async (req, res) => {
    try {
        const amount = parseInt(req.params.count); // Sotiladigan mahsulot miqdorini olish
        const productId = req.params.id;

        // Mahsulotni ID bo'yicha topish
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi!' });
        }

        // Mahsulot yetarli miqdorda bor-yo'qligini tekshirish
        if (product.amount < amount) {
            return res.status(400).json({ message: 'Mahsulot miqdori yetarli emas!' });
        }

        // Konsolga miqdorni chiqarish (debug qilish uchun)
        console.log(`Sotilayotgan miqdor: ${amount}`);

        const money = product.price * amount

        // Sotuv ma'lumotlarini tayyorlash
        const saleData = {
            amount: amount,
            productId: product._id,
            userId: "123", // Bu joyga foydalanuvchining IDsi kiritilishi kerak
            price: money,
        };

        // Yangi sotuv tarixini yaratish va saqlash
        const newSaleStory = new stoyrPro(saleData);
        await newSaleStory.save();

        // Mahsulot miqdorini yangilash
        product.amount -= amount;
        await product.save();

        const balans = await Balans.findOne()

        if (balans) {
            const mainBalans = {
                ...balans,
                balans: balans.balans + money
            }
            await Balans.findByIdAndUpdate({_id: balans._id, body: mainBalans});
        }
        else {
            const newBalans = new Balans({ balans: money});
            await newBalans.save();
        }
        


        // Muvaffaqiyatli javob qaytarish
        res.status(200).json({ message: 'Mahsulot muvaffaqiyatli sotildi!' });
    } catch (err) {
        console.error('Sotuv jarayonida xato:', err);
        res.status(500).json({ message: 'Mahsulot sotishda serverda xatolik yuz berdi.' });
    }
};

module.exports = {
    getProducts,
    createProduct,
    deleteProducts,
    getUserById,
    UpdateProducts,
    saleProducts
}



