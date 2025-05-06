const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const productModel = require("../models/productModel");

const createCategory = async (req, res) => {
   try {
    const {name, image } = req.body;
    if(!name) {
        return res.status(400).json({
            success: false,
            message: 'Name is required'
        })
    }
    if(!image) {
        return res.status(400).json({
            success: false,
            message: 'Image is required'
        })
    }
    const categoryExist = await categoryModel.findOne({name});
    if(categoryExist) {
        return res.status(400).json({
            success: false,
            message: 'Category already exists'
        })
    }
    const category = await categoryModel.create({
        name,
        slug: slugify(name),
        image
    })
    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        category
    })

   } catch (error) {
    return res.status(500).json({
        success: false,
        message: 'loi ham createCategory',
        error: error.message
    })
   }
 }

 const getCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).json({
            success: true,
            message: 'Category fetched successfully',
            categories
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'loi ham getCategory',
            error: error.message
        })
        
    }
 }

//  const getSingleCategory = async (req, res) => {
//     try {
//         const category = await categoryModel.findOne({ slug: req.params.slug })
//         if(!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Category not found'
//             })
//         }

//         res.status(200).json({
//             success: true,
//             message: 'getSingle product thanh cong',
//             category
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: 'loio hàm getSingleProductController',
//             error: error.message
//         })
//     }
//  }

const getSingleCategory = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Tìm tất cả sản phẩm thuộc category đó
        const products = await productModel.find({ category: category._id }).populate("category");

        res.status(200).json({
            success: true,
            message: 'Lấy danh mục và sản phẩm thành công',
            category,
            products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi ở hàm getSingleCategory',
            error: error.message
        });
    }
};

module.exports = {
    
    createCategory,
    getCategory,
    getSingleCategory
}