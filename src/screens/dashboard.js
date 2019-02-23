import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Label,
  Icon,
  Item,
  Button,
  Text,
  Card,
  CardItem,
  Title,
  Left,
  Right,
  Body,
  Badge,
  H3,
  Spinner,
  Toast,
  Input
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Space } from "@api";
import { RNCamera } from "react-native-camera";
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

  onPressLogout = () => {
    this.props.navigation.navigate("Sign");
  };

  onChangeTextCode = text => {
    this.setState({ waiting: false, codeError: false, projectId: text });
  };

  onPressSearch = () => {
    this.setState({ waiting: true }, () => {
      this.testCodeBar(this.state.projectId);
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
    if (code && code.barcodes.length > 0 && code.barcodes[0].data) {
      this.setState({ waiting: true, showCamera: false }, () => {
        this.testCodeBar(code.barcodes[0].data);
      });
    }
  };

  render() {
    const { waiting, codeError, projectId, showCamera } = this.state;
    const { width, height } = Dimensions.get("window");
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onPressLogout}>
              <Icon name="logout" type="AntDesign" />
            </Button>
          </Left>
          <Body>
            <Title>Dentinov Images</Title>
          </Body>
          <Right>
            <Badge>
              <Text style={{ fontSize: 16 }}>
                <Icon
                  name="cloud-upload"
                  style={{ fontSize: 16, color: "#fff" }}
                />{" "}
                {this.context.uploads.count}
              </Text>
            </Badge>
          </Right>
        </Header>
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
            height: "100%",
            justifyContent: "space-around"
          }}
        >
          {showCamera ? (
            <Card
              transparent
              style={{
                flex: 1,
                width: "100%",
                height: "100%"
              }}
            >
              <CardItem
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Body
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "center"
                  }}
                >
                  <RNCamera
                    ref={ref => {
                      this.camera = ref;
                    }}
                    type={RNCamera.Constants.Type.back}
                    style={{
                      flex: 0,
                      width: width * 0.8,
                      height: width * 0.8,
                      overflow: "hidden"
                    }}
                    permissionDialogTitle={"Accord pour utiliser la caméra"}
                    permissionDialogMessage={
                      "Nous avons besoin de votre accord pour utiliser la caméra"
                    }
                    onGoogleVisionBarcodesDetected={data => {
                      this.onBarCodeRead(data);
                    }}
                  />
                  <Space />
                  <H3 style={{ textAlign: "center" }}>
                    {`Placer la camera face au code,
à environ 15cm...`}
                  </H3>
                  <Space />
                  <Button danger small full onPress={this.onPressHideScanCode}>
                    <Text>Fermer</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
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
              <Card transparent>
                <CardItem>
                  <Body>
                    <Form style={{ width: "100%" }}>
                      <Label>
                        Vous pouvez aussi entrer directement le code du projet
                      </Label>
                      <Item error={codeError}>
                        <Input
                          regular
                          autoComplete="off"
                          autoCorrect={false}
                          onChangeText={this.onChangeTextCode}
                          placeholder="ex: 34567..."
                        />
                        {codeError && <Icon name="close-circle" />}
                      </Item>
                      <Space />
                      <Button
                        light
                        block
                        iconLeft
                        onPress={this.onPressSearch}
                        disabled={projectId.length === 0}
                      >
                        <Icon name="search" style={{ color: "black" }} />
                        <Text>Rechercher</Text>
                      </Button>
                    </Form>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          )}
        </View>
      </Container>
    );
  }
}

export default Dashboard;
