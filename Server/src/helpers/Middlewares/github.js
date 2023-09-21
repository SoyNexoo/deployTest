const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
require("dotenv").config();
const {User} = require("../../db")

passport.use(
  "auth-github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://daily-oven-production.up.railway.app/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
    // console.log(profile)
    const {value} = profile.photos[0]
    console.log(value)
    
      const user = await User.findOne({ where: { githubId: profile.id } });
      if (!user) {
        const newUser = await User.create({
          githubId: profile.id,
          profilePic: value,
          fullName:profile.username,
          userName: profile.username,
          email: profile.email || null,
        });
        return cb(null, newUser);
      }
      return cb(null, user);
    }
  )
);
