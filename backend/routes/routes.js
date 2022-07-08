const express = require('express');
const router = express.Router();
const { customerLogin, customerRegister, customerForgotPassword, customerResetPasswordGet, customerResetPasswordPost } = require('../controllers/customerAuth');
const { merchantDashboard, merchantLogin, merchantRegister, merchantForgotPassword, merchantResetPasswordGet, merchantResetPasswordPost } = require('../controllers/merchantAuth');
const { setUserSession: authenticated } = require('../controllers/userSessions')
const { fetchCateringServices, fetchMusicAndDJServices, fetchDecorationAndLigntingServices, fetchVideoPhotographyServices, fetchMakeupAndStylistServices } = require('../controllers/fetchSingleServices')



router.post('/customer/register', customerRegister)
router.post('/customer/login', customerLogin)
router.post('/customer/forgot-password', customerForgotPassword)
router.route('/customer/reset-password/:token').get(customerResetPasswordGet).post(customerResetPasswordPost)
router.post('/merchant/register', merchantRegister)
router.post('/merchant/login', merchantLogin)
router.get('/merchant/dashboard', authenticated, merchantDashboard);
router.post('/merchant/forgot-password', merchantForgotPassword)
router.route('/merchant/reset-password/:token').get(merchantResetPasswordGet).post(merchantResetPasswordPost)
router.get('/services/catering', fetchCateringServices)
router.get('/services/makeup-stylist', fetchMakeupAndStylistServices)
router.get('/services/video-photograpy', fetchVideoPhotographyServices)
router.get('/services/music-dj', fetchMusicAndDJServices)
router.get('/services/decoration-lighting', fetchDecorationAndLigntingServices)




module.exports = router;