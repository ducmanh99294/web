const productModel = require("../models/productModel");

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const newProduct = new productModel(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: 'Tạo sản phẩm mới thành công',
      product: savedProduct
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo sản phẩm',
      error: error.message
    });
  }
};

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate('category');
    res.status(200).json({
      success: true,
      message: 'Lấy tất cả sản phẩm thành công',
      products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy tất cả sản phẩm',
      error: error.message
    });
  }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lấy sản phẩm thành công',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy sản phẩm',
      error: error.message
    });
  }
};

// Xoá sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm để xoá'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xoá sản phẩm thành công',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xoá sản phẩm',
      error: error.message
    });
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm để cập nhật'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      product: updatedProduct
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật sản phẩm',
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct
};
