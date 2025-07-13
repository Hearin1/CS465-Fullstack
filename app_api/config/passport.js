const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Directly import the User model

passport.use(new LocalStrategy( 
    {
        usernameField: 'email'
    },
    async (username, password, done) => {
        const q = await User
            .findOne({email: username })
            .exec();


            //uncoment the following line to show result fo querey
            // on the console
             console.log(q);

            if(!q) //if the DV returned no records, the user doesnt exit 
            {
                return done(null, false, { message: 'Incorrect Username'});
            }
            if(!q.validPassword(password)) //Validate Password
            {
                return done(null, false, { message: 'Incorrect Password'});
            }
            return done(null, q); //everything is okay, return user object
    }
));