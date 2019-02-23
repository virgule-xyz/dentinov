import React, { Component } from "react";
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
  Title,
  Left,
  Right,
  Body,
  Spinner,
  Toast,
  Input
} from "native-base";
import ApplicationContext from "../AppContext";

class Resume extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressLogout = () => {
    this.props.navigation.navigate("Sign");
  };

  render() {
    const {} = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>Coucou</Text>
          <Button onPress={this.onPressLogout}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Resume;
