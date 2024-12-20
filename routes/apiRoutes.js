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
router.post("/getAllBrands", brandController.getAllBrand)
router.post('/getSingleBrand', brandController.getSingleBrand)

router.post("/getAllProducts", productController.getAllProduct)
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

router.post("/addBrand", brandController.addBrand)
router.delete("/deleteByParam/:_id", brandController.deleteBrandByParam)
router.post("/updateBrand", brandController.updateBrand)
router.post("/changeStatus", brandController.changeStatus)

//product apis


router.post("/addProduct", productController.addProduct)
router.post("/updateProduct", productController.updateProduct)
router.post("/changeStatus", productController.changeStatus)

//category apis


router.post("/addCategory",  categoryController.addCategory)
router.post("/updateCategory", categoryController.updateCategory)
router.post("/changeStatus", categoryController.changeStatus)

//customer or user api 
router.post("/changePassword", userController.changePassword)
router.post("/getAllUsers", userController.getAllUser)
router.post("/getSingleUser", userController.getSingleUser)
router.post("/getSingleCustomer", customerController.getSingleCustomer)
router.post("/getAllCustomers", customerController.getAllCustomers)
router.post("/updateCustomer", customerController.updateCustomer)
router.post("/updateUser", userController.updateUser)

//cart api
router.post("/addToCart", cartController.addToCart)
router.post("/getAllCarts", cartController.getAllCart)
router.post("/getSingleCart", cartController.getSingleCart)
router.post("/updateCart", cartController.updateCart)
router.post("/deleteCart", cartController.deleteCart)

//dashboard api
router.get("/dashboard", dashboardController.dashboard)

//order apis
router.post("/addOrder", orderController.addOrder)
router.post("/getAllOrders", orderController.getAllOrders)
router.post("/getSingleOrder", orderController.getSingleOrder)
router.post("/updateOrder", orderController.updateOrder)

module.exports=router

