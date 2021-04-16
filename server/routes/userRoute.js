const express=require('express');
const router=express.Router();

//Validation
const {validLogin,validRegister,
    forgotPasswordValidator,resetPasswordValidator}=require('../helpers/valid.js');

const {
        registerController,
        activationController,
        loginController,
        forgotPasswordController,
        resetController,
        googleController
    }=require('../controllers/userController');

const {
    getVideoData,removeVideoData
}=require('../controllers/videoController');

router.post('/register',validRegister,registerController);
router.post('/login',validLogin,loginController);
router.post('/password/forget',forgotPasswordValidator,forgotPasswordController);
router.post('/password/reset',resetPasswordValidator,resetController);
router.post('/activation',activationController);
router.post('/googleLogin',googleController);
router.post('/getVideoData',getVideoData);
router.post('/deleteVideoData',removeVideoData);



module.exports=router;