import React, { Component } from "react";
import { Button, Text, H1, Card, CardItem, Icon, Spinner } from "native-base";
import { Dentinov } from "@api";
import ApplicationContext from "../AppContext";

class Resume extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressChangeProject = () => {
    this.context.changeProject();
    this.props.navigation.navigate("Dashboard");
  };

  render() {
    const {} = this.state;
    return (
      <Dentinov>
        <Card>
          {this.context.uploads.count > 0 && (
            <CardItem header>
              <Text>Votre image est bien en cours de chargement...</Text>
            </CardItem>
          )}
          <CardItem body>
            {this.context.uploads.count === 0 && (
              <Text>
                Il n'y a actuellement aucune image à charger vers le serveur.
              </Text>
            )}
            {this.context.uploads.count === 1 && (
              <Text>
                Il y a actuellement une image en chargement vers le serveur.
              </Text>
            )}
            {this.context.uploads.count > 1 && (
              <Text>
                Il y a actuellement {this.context.uploads.count} images en
                chargement vers le serveur.
              </Text>
            )}
          </CardItem>
          {this.context.uploads.count !== 0 && (
            <CardItem footer>
              <Text>
                Ne quittez pas l'application avant que le compteur ne soit à 0.
              </Text>
            </CardItem>
          )}
        </Card>
        {this.context.uploads.count !== 0 && <Spinner />}
        <Button full onPress={this.onPressChangeProject} danger>
          <Text>Nouveau projet</Text>
        </Button>
      </Dentinov>
    );
  }
}

export default Resume;
