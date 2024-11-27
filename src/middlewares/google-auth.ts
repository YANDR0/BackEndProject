import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import { Router } from 'express';
import { User } from '../types/user';

export const googleAuth = (router: Router) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_ID!,
                clientSecret: process.env.GOOGLE_SECRET!,
                callbackURL: process.env.GOOGLE_CALLBACK_URL!
            },
            (accessToken, refreshToken, profile, cb) => {
                // Aquí puedes mapear los datos del perfil al esquema de tu usuario si es necesario
                const user: User = {
                    name: profile.displayName || profile.emails?.[0].value,
                    email: profile.emails?.[0].value || '',
                    status: 1,
                    role: 1 // Puedes establecer un estado predeterminado
                };

                console.log('User profile:', profile);
                return cb(null, user);
            }
        )
    );

    passport.serializeUser((user: User, cb) => {
        cb(null, user); // Almacena los datos del usuario en la sesión
    });

    passport.deserializeUser((user: User, cb) => {
        cb(null, user); // Recupera los datos del usuario desde la sesión
    });

    router.use(
        session({
            resave: false,
            saveUninitialized: true,
            secret: process.env.SECRET_KEY!
        })
    );

    router.use(passport.initialize());
    router.use(passport.session());
};
