import React, { Component } from "react";
import { Button, Text } from "native-base";
import { Dentinov, ProjectCameraTaker } from "@api";
import ApplicationContext from "../AppContext";

class Editor extends Component {
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
        <ProjectCameraTaker
          navigation={this.props.navigation}
          nextScreen="Resume"
        />
        <Button full onPress={this.onPressChangeProject} danger>
          <Text>Changer de projet</Text>
        </Button>
      </Dentinov>
    );
  }
}

export default Editor;
