import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Label,
  Icon,
  Item,
  Button,
  Text,
  Spinner,
  Toast,
  Input
} from "native-base";
import { Image } from "react-native";
import ApplicationContext from "../AppContext";
import { Space } from "@api";

const logo = require("./medias/dentinov.png");

class Sign extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      loginError: false,
      passwordError: false,
      login: "",
      password: ""
      /*login: "logidents@centres-dentaires.com",
      password: "4F2N5Puf5Aqy"*/
    };
  }

  onChangeTextLogin = text => {
    this.setState({ login: text });
  };

  onChangeTextPassword = text => {
    this.setState({ password: text });
  };

  getFormLogin = () => this.state.login;

  getFormPassword = () => this.state.password;

  tryToLogin = (id, pwd) => {
    return this.context.testLogin(id, pwd);
  };

  goToDashboard = () => {
    this.props.navigation.navigate("DashboardStack");
  };

  onPressEnter = () => {
    this.setState({ waiting: true }, () => {
      const id = this.getFormLogin();
      const pwd = this.getFormPassword();
      this.tryToLogin(id, pwd)
        .then(({ idCorrect, pwdCorrect, error }) => {
          this.setState(
            {
              waiting: false
            },
            this.goToDashboard
          );
        })
        .catch(({ idCorrect, pwdCorrect, error }) => {
          if (idCorrect === false || pwdCorrect === false) {
            this.setState({
              waiting: false,
              loginError: !idCorrect,
              passwordError: !pwdCorrect
            });
            Toast.show({
              type: "danger",
              duration: 3000,
              position: "top",
              text: "Vos identifiants ne sont pas corrects, merci de reéssayer",
              buttonText: "D'accord"
            });
          } else if (error.length > 0) {
            this.setState({
              waiting: false,
              loginError: !idCorrect,
              passwordError: !pwdCorrect
            });
            Toast.show({
              type: "danger",
              duration: 1500,
              position: "top",
              text: error,
              buttonText: "D'accord"
            });
          }
        });
    });
  };

  componentDidMount() {
    this.context.startSendingPictureToServer();
  }

  render() {
    const { waiting, loginError, passwordError } = this.state;
    return (
      <Container>
        <Content padder>
          <Image
            source={logo}
            resizeMode="contain"
            style={{ width: "100%", flex: 0, height: 300 }}
          />
          {!waiting && (
            <Form>
              <Item noIndent floatingLabel error={loginError}>
                <Label>Identifiant</Label>
                <Input
                  autoComplete="off"
                  autoCorrect={false}
                  defaultValue=""
                  onChangeText={this.onChangeTextLogin}
                />
                {loginError && <Icon name="close-circle" />}
              </Item>
              <Item noIndent floatingLabel error={passwordError}>
                <Label>Mot de passe</Label>
                <Input
                  autoComplete="off"
                  autoCorrect={false}
                  secureTextEntry
                  defaultValue=""
                  onChangeText={this.onChangeTextPassword}
                />
                {passwordError && <Icon name="close-circle" />}
              </Item>
              <Space />
              <Button full iconLeft onPress={this.onPressEnter}>
                <Icon name="login" type="AntDesign" />
                <Text>Entrer</Text>
              </Button>
            </Form>
          )}
          {waiting && <Spinner />}
        </Content>
      </Container>
    );
  }
}

export default Sign;
