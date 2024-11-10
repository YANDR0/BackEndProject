import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import { Handler } from 'express';

export const googleAuth = (app: { use: (arg0: Handler) => void; }) => {
    passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
          },
          (accessToken, refreshToken, profile, cb) => {
            // This callback will be called after Google's authentication process
            // You can perform user validation or save user data to the database here
            console.log('User profile:', profile);
            return cb(null, profile);
          }
        )
    );
    
    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
      
    passport.deserializeUser((user, cb) => {
        cb(null, user);
    });

    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SECRET_KEY 
    }));
    
    // Initialize Passport and restore authentication state if available from the session
    app.use(passport.initialize());
    app.use(passport.session());
}