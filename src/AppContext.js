import React, { Component } from "react";

const defaultApplicationState = {
  user: {
    login: "",
    password: "",
    name: "",
    id: null
  },
  uploads: {
    count: 0,
    files: []
  },
  testLogin: () => {},
  getUser: () => {},
  setUser: () => {},
  searchProjectByCode: () => {},
  setProject: () => {}
};

const ApplicationContext = React.createContext(defaultApplicationState);

class ApplicationContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        login: "",
        password: "",
        name: "",
        id: null
      },
      uploads: {
        count: 6,
        files: [
          "filename.jpg",
          "filename.jpg",
          "filename.jpg",
          "filename.jpg",
          "filename.jpg",
          "filename.jpg"
        ]
      }
    };
  }

  testLogin = (login, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (login === "pierre" && password === "pierre") {
          this.setState({
            user: {
              login: "pierre",
              password: "pierre",
              name: "Pierre",
              id: 1
            }
          });
          resolve({ idCorrect: true, pwdCorrect: true, error: "" });
        } else reject({ idCorrect: false, pwdCorrect: false, error: "" });
      }, 1000);
    });
  };

  getUser = () => {
    return this.state.user;
  };

  setUser = () => {};

  searchProjectByCode = projectId => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (projectId === "123456") {
          resolve({ id: 12, name: "projet machin" });
        } else {
          reject({ msg: "Code introuvable" });
        }
      }, 1000);
    });
  };

  setProject = project => {};

  render() {
    const { children } = this.props;
    const { user, uploads } = this.state;

    return (
      <ApplicationContext.Provider
        value={{
          user,
          uploads,
          testLogin: this.testLogin,
          getUser: this.getUser,
          setUser: this.setUser,
          searchProjectByCode: this.searchProjectByCode,
          setProject: this.setProject
        }}
      >
        {children}
      </ApplicationContext.Provider>
    );
  }
}

export default ApplicationContext;
export { defaultApplicationState, ApplicationContextProvider };
