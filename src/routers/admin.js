const express = require('express')
const adminAdd = require('../controllers/admin')
const Admin = require('../model/admin')
const bcrypt = require('bcrypt');
const { otp, verifyOtp } = require('../middleware/admin')
const emailController = require('../controllers/emailController');
router.get('/api/user/emails', emailController.getUserEmails);
const router = express.Router()
var userData = {};



router.post('/confirm',(req,res)=>{
    res.render('login')
})


router.post('/allow',(req,res)=>{
    res.redirect('/home')
})
router.get('/home',(req,res)=>{
    res.render('home')
})
router.post('/signup', async (req, res) => {
    const { name, gender, aadhar, phone, ephone1, mail, village, pincode, state, pass1 } = req.body;
    const foundUser = await Admin.findOne({ username: name });
    if (foundUser) {
        res.send("username already exist");
    }
    const send = otp(mail);
    const salts = 10;

    const hashedPass = await bcrypt.hash(pass1, salts);
    userData = {
        name: name,
        gender: gender,
        aadhar: aadhar,
        phone: phone,
        ephone1: ephone1,
        mail: mail,
        village: village,
        pincode: pincode,
        state: state,
        hashedPass: hashedPass
    };
    res.render('otp')
});

router.post('/otp', async (req, res) => {
    const userOtp = req.body;
    console.log(userOtp);
    const re = await verifyOtp(userOtp);
    const name = userData.name;
    const gender = userData.gender;
    const aadhar = userData.aadhar;
    const phone = userData.phone;
    const ephone1 = userData.ephone1;
    const mail = userData.mail;
    const village = userData.village;
    const pincode = userData.pincode;
    const state = userData.state;
    const hashedPass = userData.hashedPass;
    if (re) {
        const result = await adminAdd(name, gender, aadhar, phone, ephone1, mail, village, pincode, state, hashedPass);
        res.render('voluteer_page')
    }
    else {
        res.send("wrong OTP")
    }
})
router.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    const foundUser = await Admin.findOne({ username: user });
    if (!foundUser) {
        return res.render('login', { message: "Invalid id or password" })

       
    }
    // console.log("Found user:", foundUser);
    else {
        const isPassMatch = await bcrypt.compare(pass, foundUser.password1);
        if (!isPassMatch) {

            return res.render('login', { message: "Invalid id or password" })
        }
        else{
            res.render('home',{id:foundUser._id});

        }

    }
});
router.post('/profile',async (req,res)=>{
    const {myid} =req.body;
    const re = await Admin.findById(myid)
    res.render('profile',{username:re.username,
    gend:re.gend,
    adhar:re.adhar,
    mobile:re.mobile,
    Trustedp:re.Trustedp,
    Mail:re.Mail,
    Village:re.Village,
    Pincode:re.Pincode
    });
})
module.exports = router;