import React, { Component } from "react";
import { View } from "react-native";
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
import ApplicationContext from "../AppContext";

class Dashboard extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = { waiting: false, codeError: false, projectId: "" };
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
      this.context
        .searchProjectByCode(this.state.projectId)
        .then(project => {
          this.setState({ waiting: false, codeError: false }, () => {
            this.context.setProject(project);
            this.gotoNextScreen();
          });
        })
        .catch(err => {
          this.setState({ waiting: false, codeError: true, projectId: "" });
          Toast.show({
            position: "bottom",
            text: err.msg,
            buttonText: "Fermer"
          });
        });
    });
  };

  onPressScanCode = () => {
    this.gotoNextScreen();
  };

  render() {
    const { waiting, codeError, projectId } = this.state;
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
          {waiting && <Spinner />}
          {!waiting && (
            <>
              <Button
                block
                large
                primary
                iconLeft
                style={{ paddingTop: 100, paddingBottom: 100 }}
                onPress={this.onPressScanCode}
              >
                <Icon name="qr-scanner" />
                <Text>Scanner le code</Text>
              </Button>
              <Card>
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
                        block
                        iconLeft
                        onPress={this.onPressSearch}
                        disabled={projectId.length === 0}
                      >
                        <Icon name="search" />
                        <Text>Rechercher</Text>
                      </Button>
                    </Form>
                  </Body>
                </CardItem>
              </Card>
            </>
          )}
        </View>
      </Container>
    );
  }
}

export default Dashboard;
