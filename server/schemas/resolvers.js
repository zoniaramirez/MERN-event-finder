const { User, Event } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    searchUsers: async (_parent, args) => {
      const search = args.term;
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(search);
      return User.find({
        $or: [
          {
            email: {
              $regex: searchRgx,
              $options: "i",
            },
          },
          {
            username: {
              $regex: searchRgx,
              $options: "i",
            },
          },
        ],
      });
    },
    users: async () => {
      return User.find();
    },
    events: async () => {
      return Event.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id }).populate("savedEvents");
    },
    event: async (_, args) => {
      return Event.findOne({ _id: args.id });
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedEvents");
      }
      throw new Error("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, username, password }) => {
      const user = await User.findOne(email ? { email } : { username });

      if (!user) {
        throw new Error("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    saveEvent: async(parent, { id }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedEvents: id },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenicationError;
      ('You need to be logged in!')
    },

    removeEvent: async(parent, { id }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {_id: context.user._id},
          { $pull: { savedEvents: id } },
          { new: true } 
        );
      }
      throw AuthencationError;
      ('Error removing event.')
    }    
  },
};

module.exports = resolvers;
