const router = require("express").Router()
const multer=require("multer")
const brandController = require("../server/brands/brandController")
const productController = require("../server/products/productController")
const categoryController = require("../server/category/categoryController")
const cartController = require("../server/carts/cartController")
const customerController=require("../server/customer/customerController")
const userController=require("../server/users/userController")
const dashboardController=require("../server/dashboard/DashboardController")
const orderController=require("../server/order/OrderController")

// router.method("/path", controller.module)
router.post("/getAllBrand", brandController.getAllBrand)
router.post('/getSingleBrand', brandController.getSingleBrand)

router.post("/getAllProduct", productController.getAllProduct)
router.post("/getSingleProduct", productController.getSingleProduct)


router.post("/getAllCategory", categoryController.getAllCategory)
router.post("/getSingleCategory", categoryController.getSingleCategory)

const customerStorage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "./public/customers/")
  },
  filename: function(req, file, cb){
    const uniqueSuffix= Date.now() + "-" + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})
const customerUpload = multer({storage: customerStorage})

router.post("/register", customerUpload.fields([{name:"adhaarImage", maxCount:1}, {name:"residentialProofImage", maxCount:1}]), customerController.register)
router.post("/login", userController.login)

//with token
router.use(require("../config/midddleware"))

//brand apis
const brandStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/brands/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})
const brandUpload = multer({ storage: brandStorage })
router.post("/addBrand",brandUpload.array("brandLogo"), brandController.addBrand)
// router.post("/deleteBrand", brandController.deleteBrand)
// router.delete("/deleteByParam/:_id", brandController.deleteBrandByParam)
router.post("/updateBrand", brandUpload.array("brandLogo"), brandController.updateBrand)
router.post("/softDeleteBrand", brandController.softDeleteBrand)

//product apis
const productStorage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, "./public/products/")
    },
    filename: function(req, file, cb){
      const uniqueSuffix= Date.now() + "-" + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})
const productUpload = multer({storage: productStorage})
router.post("/addProduct", productUpload.single("productImages"), productController.addProduct)

// router.post("/deleteProduct", productController.deleteProduct)
// router.get("/deleteByParam/:_id", productController.deleteProductByParam)
router.post("/updateProduct", productController.updateProduct)
router.post("/softDeleteProduct", productController.softDeleteProduct)

//category apis
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "./public/categories/")
  },
  filename: function(req, file, cb){
    const uniqueSuffix= Date.now() + "-" + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const categoryUpload = multer({storage: categoryStorage})
router.post("/addCategory", categoryUpload.single("categoryImages"), categoryController.addCategory)
// router.post("/deleteCategory", categoryController.deleteCategory)
// router.delete("/deleteByParam/:_id", categoryController.deleteCategoryByParam)
router.post("/updateCategory", categoryUpload.single("category"), categoryController.updateCategory)
router.post("/softDeleteCategory", categoryController.softDeleteCategory)

//customer or user api 
router.post("/changePassword", userController.changePassword)
router.post("/getAllUser", userController.getAllUser)
router.post("/getSingleUser", userController.getSingleUser)
router.post("/updateUser", userController.updateUser)

//cart api
router.post("/addToCart", cartController.addToCart)
router.post("/getAllCart", cartController.getAllCart)
router.post("/getSingleCart", cartController.getSingleCart)
router.post("/updateCart", cartController.updateCart)
router.post("/deleteCart", cartController.deleteCart)

//dashboard api
router.get("/dashboard", dashboardController.dashboard)

//order apis
router.post("/addOrder", orderController.addOrder)
router.post("/getAllOrder", orderController.getAllOrder)
router.post("/getSingleOrder", orderController.getSingleOrder)
router.post("/updateOrder", orderController.updateOrder)

module.exports=router

