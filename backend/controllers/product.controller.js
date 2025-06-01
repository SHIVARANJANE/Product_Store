import Product from '../models/product.model.js';


export const createProduct = async (req, res) => {
    const { name, price, image, userId } = req.body;

    if (!name || !price || !image || !userId) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    try {
        const newProduct = new Product({ name, price, image, userId });
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create Product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getProducts = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const products = await Product.find({ userId });
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }
        return res.status(200).json({ success: true, data: products });
    } catch (err) {
        console.error("Error in Get Products:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' })
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (err) {
        console.error("Error in Update Product:", err.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product is deleted' });
    } catch (error) {
        console.error("Error in Delete Product:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}