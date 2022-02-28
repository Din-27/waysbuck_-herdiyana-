const express = require('express')
const router = express.Router()
const { getUsers, deleteUser, updateUser, getUser } = require('../controllers/user')
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getTopings, getToping, addToping, updateToping, deleteToping } = require('../controllers/toping')
const { register, Login, checkAuth } = require('../controllers/auth')
const { auth } = require('../middlewars/auth')
const { uploadFile } = require('../middlewars/uploadFile')
const { updateTransactionOTW, updateTransactionCancel, getTransaction, updateTransaction, deleteTransaction, addToCart, getTransactions } = require('../controllers/transaction')
const { deleteOrderUser, addOrder, getOrders, getOrderUser, deleteOrder, getOrder } = require('../controllers/order')

router.post('/register', register)
router.post('/login', Login)
router.get("/check-auth", auth, checkAuth);

router.delete('/user/:id', deleteUser)
router.patch('/user/:id', auth, uploadFile("image"), updateUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)


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

router.get('/transactions', getTransactions)
router.get('/transaction/:id', getTransaction)
router.patch('/transaction/:id', updateTransaction)
router.patch('/transaction-cancel/:id', updateTransactionCancel)
router.patch('/transaction-otw/:id', updateTransactionOTW)
router.delete('/transaction/:id', auth, deleteTransaction)
router.post('/payout/:id', auth, uploadFile("image"), addToCart)

router.delete('/order/:id', auth, deleteOrder)
router.get('/my-transactions', auth, getOrderUser)
router.post('/order', auth, addOrder)
router.get('/order/:id', getOrder)
router.get('/orders', getOrders)
router.delete('/orders', auth, deleteOrderUser)


module.exports = router