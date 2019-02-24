import React from "react";
import { Text, Left, Body, CardItem, Thumbnail } from "native-base";
import ApplicationContext from "../AppContext";

const logo = require("./medias/dentinov.png");

const Infos = () => (
  <ApplicationContext.Consumer>
    {({ project }) => (
      <CardItem>
        <Left>
          <Thumbnail source={logo} />
          <Body>
            <Text>{project.info1}</Text>
            <Text note>{project.info2}</Text>
          </Body>
        </Left>
      </CardItem>
    )}
  </ApplicationContext.Consumer>
);

export default Infos;
