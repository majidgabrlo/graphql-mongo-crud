const Recipe = require("../models/Recipe");

module.exports = {
  Query: {
    async recipe(_, { id }) {
      return await Recipe.findById(id);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createNewRecipe = new Recipe({
        name,
        description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });
      const res = await createNewRecipe.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteRecipe(_, { id }) {
      const wasDeleted = await Recipe.deleteOne({ _id: id });
      return !!wasDeleted;
    },
    async editRecipe(_, { id, recipeInput: { name, description } }) {
      const wasEdited = await (
        await Recipe.updateOne({ _id: id }, { name, description })
      ).modifiedCount;
      return !!wasEdited;
    },
  },
};
