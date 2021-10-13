const express = require('express'),
  passport = require('passport'),
  passportFacebook = require('passport-facebook'),
  passportGoogle = require('passport-google');
  const app = express();
  let { context } = require('./../../controllers/baseController');

const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const dotenv = require('dotenv');
let router = express.Router();
const {
  UserController,
  AuthController,
} = require('../../../cryptoChatWebAppApi/controllers');
dotenv.config();
passport.serializeUser(function (user, done) {
  done(null, user);
});
const assert = require('assert');
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

const Usermodel = require('./../../model/usermodel');
let facebookToken = {}
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['email', 'name'],
    },
    function (accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        first_name: first_name,
        last_name: last_name,
      };
      const addedUser = new Usermodel(userData);
      facebookToken = accessToken
      console.log(addedUser, 'added user...');
      
      addedUser.save(() => {
        assert(addedUser.isNew == false);
        done(null, profile);
      });
    }
  )
);

router.post('/register', UserController.save);
router.post('/authenticate', AuthController.authenticate);
router.get('/facebook', passport.authenticate('facebook'));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/#/topinvestments',
    failureRedirect: '/facebook/fail',
  })
);
 

router.get('/successfull', ((req,res)=>{
console.log(facebookToken,'token')
return res.json({
    ...context,
    success: true,
    message: 'Facebook Login successful',
    token:facebookToken
  });
}))

 
router.get('/facebook/fail', AuthController.facebookFail);

module.exports = router;


// router.get("/google", passport.authenticate("google"));
// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         successRedirect: "/google/success",
//         failureRedirect: "/google/fail"
//     })
// );

