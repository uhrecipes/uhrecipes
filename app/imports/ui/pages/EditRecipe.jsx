import React from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import BoolField from 'uniforms-semantic/BoolField';
import ListField from 'uniforms-semantic/ListField';
import NestField from 'uniforms-semantic/NestField';
import ListItemField from 'uniforms-semantic/ListItemField';
import ListDelField from 'uniforms-semantic/ListDelField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditRecipe extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, image, description, vegan, glutenFree, dairyFree, ingredients, steps, _id } = data;
    Recipes.update(_id, { $set: { name, image, description, vegan, glutenFree, dairyFree, ingredients, steps } }, (error) => (error ?
      Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
      Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const formStyle = {
      background: '#D7E0CD',
    };
    const buttonStyle = {
      background: '#ACC198',
    };

    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Recipe</Header>
          <AutoForm schema={RecipeSchema} onSubmit={this.submit} model={this.props.doc}>
            <Segment style={formStyle}>
              <TextField name='name'/>
              <TextField name='image'/>
              <TextField name='description'/>
              <Form.Group>
                <BoolField name='vegan'/>
                <BoolField name='glutenFree'/>
                <BoolField name='dairyFree'/>
              </Form.Group>
              <ListField name='ingredients'>
                <ListItemField name='$'>
                  <NestField>
                    <Form.Group width='equal'>
                      <TextField name='name'/>
                      <TextField name='measurement'/>
                    </Form.Group>
                  </NestField>
                </ListItemField>
              </ListField>
              <ListField name='steps'>
                <ListDelField name='$'/>
                <TextField name='$'/>
              </ListField>
              <ErrorsField/>
              <SubmitField style={buttonStyle} value='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditRecipe.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Recipes');
  return {
    doc: Recipes.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditRecipe);
