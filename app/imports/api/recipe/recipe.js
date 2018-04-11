import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Ingredients } from '/imports/api/ingredient/ingredient';

/** Create a Meteor collection. */
const Recipes = new Mongo.Collection('Recipes');

/** Create a schema to constrain the structure of documents associated with this collection. */
const RecipeSchema = new SimpleSchema({
  name: String,
  image: String,
  ingredients: Ingredients,
  steps: String,
  owner: String,
  createdAt: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Recipes.attachSchema(RecipeSchema);

/** Make the collection and schema available to other code. */
export { Recipes, RecipeSchema };