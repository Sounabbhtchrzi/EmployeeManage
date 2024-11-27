import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/userModel.js'; // Ensure you use the .js extension

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        // Username/email does NOT exist
        if (!user) {
          return done(null, false, {
            message: 'Username/email not registered',
          });
        }
        // Email exists and now we need to verify the password
        const isMatch = await user.isValidPassword(password);
        return isMatch
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password' });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport; // Export passport so it can be imported elsewhere
