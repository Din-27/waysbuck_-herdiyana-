const express = require('express')
const router = express.Router()
const { getUsers, deleteUser, updateUser, getUser } = require('../controllers/user')
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getTopings, getToping, addToping, updateToping, deleteToping } = require('../controllers/toping')
const { register, Login, checkAuth } = require('../controllers/auth')
const { auth } = require('../middlewars/auth')
const { addToCart } = require('../controllers/profile')
const { uploadFile } = require('../middlewars/uploadFile')
const { getTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction')
const { addOrder, getOrders, getOrderUser, deleteOrder } = require('../controllers/order')

router.post('/register', register)
router.post('/login', Login)
router.get("/check-auth", auth, checkAuth);

router.delete('/user/:id', deleteUser)
router.patch('/user/:id', auth, uploadFile("image"), updateUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.post('/cart', auth, uploadFile("image"), addToCart)

router.get('/products', getProducts)
router.post('/product', auth, uploadFile("image"), addProduct)
router.patch('/product/:id', auth, uploadFile("image"), updateProduct)
router.get('/product/:id', getProduct)
router.delete('/product/:id', deleteProduct)

router.get('/topings', getTopings)
router.get('/toping/:id', getToping)
router.post('/toping', auth, uploadFile("image"), addToping)
router.patch('/toping/:id', auth, uploadFile("image"), updateToping)
router.delete('/toping/:id', deleteToping)

router.get('/transaction/:id', getTransaction)
router.patch('/transaction/:id', auth, updateTransaction)
router.delete('/transaction/:id', auth, deleteTransaction)

router.delete('/order/:id', auth, deleteOrder)
router.get('/my-transactions', auth, getOrderUser)
router.post('/transaction', auth, addOrder)
router.get('/orders', auth, getOrders)


module.exports = router