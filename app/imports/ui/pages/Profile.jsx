import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Recipe from '/imports/ui/components/Recipes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profile extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const sortedByDate = _.sortBy(this.props.recipes, 'createdAt');
    const newest = sortedByDate.reverse();
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>Profile Page</Header>
        <Card.Group>
          {newest.map((recipe, index) => <Recipe key={index} recipe={recipe} />)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Profile.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Recipes');
  return {
    recipes: Recipes.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(Profile);
