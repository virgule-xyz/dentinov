import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Content, Icon, Button, Text, Spinner, Toast } from "native-base";
import { Dentinov, Scanner, ProjectInput } from "@api";
import ApplicationContext from "../AppContext";

class Dashboard extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      waiting: false,
      codeError: false,
      projectId: "",
      showCamera: false
    };
  }

  gotoNextScreen = () => {
    this.props.navigation.navigate("Editor");
  };

  onPressSearch = id => {
    this.setState({ waiting: true }, () => {
      this.testCodeBar(id);
    });
  };

  testCodeBar = code => {
    this.context
      .searchProjectByCode(code)
      .then(project => {
        this.setState({ waiting: false, codeError: false }, () => {
          this.context.setProject(project);
          this.gotoNextScreen();
        });
      })
      .catch(err => {
        this.setState({ waiting: false, codeError: true, projectId: "" });
        Toast.show({
          type: "danger",
          duration: 5000,
          position: "bottom",
          text: err.msg,
          buttonText: "Fermer"
        });
      });
  };

  onPressScanCode = () => {
    this.setState({ showCamera: true }, () => {});
  };

  onPressHideScanCode = () => {
    this.setState(
      { showCamera: false, waiting: false, codeError: false },
      () => {}
    );
  };

  onBarCodeRead = code => {
    this.setState({ waiting: true, showCamera: false }, () => {
      this.testCodeBar(code);
    });
  };

  render() {
    const { waiting, codeError, projectId, showCamera } = this.state;
    const { width } = Dimensions.get("window");
    return (
      <Dentinov>
        {showCamera ? (
          <Scanner
            onPressHideScanCode={this.onPressHideScanCode}
            onBarCodeReadSuccess={this.onBarCodeRead}
          />
        ) : waiting ? (
          <Spinner />
        ) : (
          <Content padder>
            <Button
              full
              large
              primary
              iconLeft
              style={{ height: width * 0.8 }}
              onPress={this.onPressScanCode}
            >
              <Icon name="qr-scanner" />
              <Text>Scanner le code</Text>
            </Button>
            <ProjectInput
              codeError={codeError}
              onPressSearch={this.onPressSearch}
            />
          </Content>
        )}
      </Dentinov>
    );
  }
}

export default Dashboard;
