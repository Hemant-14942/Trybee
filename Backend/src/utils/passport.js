import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URI}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          user = new userModel({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: profile.displayName + profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return done(null, { user, token });
      } catch (error) {
        console.error("Error authenticating user with Google:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
