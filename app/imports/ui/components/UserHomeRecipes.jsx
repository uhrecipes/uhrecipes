import React from 'react';
import { Card, Image, Button, Feed, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserHomeRecipes extends React.Component {

  render() {
    const cardStyle = {
      background: '#F3E2C4',
    };
    const buttonStyle = {
      background: '#dacfb3',
    };
    return (
        <Card centered style={cardStyle}>
          <Card.Content>
            <Card.Header>
              {this.props.recipe.name}
            </Card.Header>
            <div style={{ marginTop: '10px' }}>
              <Image floated='center' height='350px' width='300px' src={this.props.recipe.image}/>
            </div>

            <Card.Description>
              <div style={{ marginTop: '375px', marginBottom: '20px' }}>
                {this.props.recipe.description}
              </div>
            </Card.Description>

            <Grid columns={2}>
              <Grid.Column>
                <Card.Meta>
                  Created By
                </Card.Meta>
                <Feed.Content content={this.props.recipe.owner}/>
              </Grid.Column>
              <Grid.Column>
                <Card.Meta>
                  Added on
                </Card.Meta>
                <Feed.Date content={this.props.recipe.createdAt.toLocaleDateString('en-US')}/>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content extra>
            <Button style={buttonStyle} as={NavLink} exact to="/recipe"> View Recipe </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
UserHomeRecipes.propTypes = {
  recipe: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserHomeRecipes);