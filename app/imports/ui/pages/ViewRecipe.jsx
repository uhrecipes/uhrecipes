import React from 'react';
import { Grid, Loader, Header, Image, List, Container } from 'semantic-ui-react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class ViewRecipe extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const cardStyle = {
      background: '#F3E2C4',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    };
    return (
          <Grid container divided={'vertically'} padded style={cardStyle}>
            <Grid.Row centered columns={2} padded>
              <Grid.Column>
                <Header as="h1" textAlign="center">{this.props.doc.name}</Header>
                <Grid>
                  <Grid.Row centered columns={2}>
                    <Grid.Column>
                      <Header as="h4" textAlign="center">Recipe By: {this.props.doc.owner}</Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h4" textAlign="center">Created: {this.props.doc.createdAt.toLocaleDateString('en-US')}</Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Header as="h3" textAlign="center">"{this.props.doc.description}"</Header>
                <List bulleted>
                  <List.Header as={'h3'}>Ingredients</List.Header>
                  {this.props.doc.ingredients.map((ing, index) => <List.Item
                      key={index}>{ing.measurement} {ing.name}</List.Item>)}
                </List>
                <List ordered>
                  <List.Header as={'h3'}>Directions</List.Header>
                  {this.props.doc.steps.map((step, index) => <List.Item
                      key={index}>{step}</List.Item>)}
                </List>
              </Grid.Column>
              <Grid.Column>
                <Image centered height={'500px'} src={this.props.doc.image}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
ViewRecipe.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Home');
  return {
    doc: Recipes.findOne(documentId),
    ready: subscription.ready(),
  };
})(ViewRecipe);
