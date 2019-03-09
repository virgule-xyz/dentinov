import React, { Component } from "react";
import axios from "axios";

const userDefaultState = {
  login: "",
  password: "",
  name: "",
  id: null
};
const uploadsDefaultState = {
  count: 0,
  files: []
};
const projectDefaultState = {
  id: 0,
  info1: "",
  info2: "",
  picture: null
};

const defaultApplicationState = {
  user: userDefaultState,
  uploads: uploadsDefaultState,
  project: projectDefaultState,
  testLogin: () => {},
  getUser: () => {},
  setUser: () => {},
  searchProjectByCode: () => {},
  setProject: () => {},
  logout: () => {},
  changeProject: () => {},
  setCurrentPicture: () => {},
  cancelCurrentPicture: () => {},
  saveCurrentPicture: () => {}
};

const ApplicationContext = React.createContext(defaultApplicationState);

class ApplicationContextProvider extends Component {
  static API = {
    BASE_URL: "http://www.logidents.com/api/",
    LOGIN_URL: "login.php",
    KEY: "YkcL9zN9CDtwsBJjGn136zDdtgZzpLeYpxtoTf679hKvOEGiXXwYwiZIVHoJyoak"
  };

  constructor(props) {
    super(props);
    this.state = {
      user: userDefaultState,
      uploads: uploadsDefaultState,
      project: projectDefaultState
    };
  }

  axiosParams = (url, body, params = null) => {
    const baseParams = {
      baseURL: ApplicationContextProvider.API.BASE_URL,
      url: `${url}?key=${ApplicationContextProvider.API.KEY}&${body}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      timeout: 30000,
      responseType: "json"
    };
    return { ...baseParams, ...params };
  };

  testLogin = (login, password) => {
    const params = this.axiosParams(
      ApplicationContextProvider.API.LOGIN_URL,
      `login=${login}&password=${password}`
    );

    return new Promise((resolve, reject) => {
      axios(params)
        .then(({ data, status }) => {
          if (status === 200 && data.error > 0) {
            reject({ idCorrect: false, pwdCorrect: false, error: data.error });
          } else {
            this.setState({
              user: {
                token: data.token,
                login: login,
                password: password,
                name: login,
                id: login
              }
            });
            resolve({ idCorrect: true, pwdCorrect: true, error: "" });
          }
        })
        .catch(error => {
          console.warn("ERROR", error);
          reject({ idCorrect: false, pwdCorrect: false, error: error });
        });
    });
  };

  getUser = () => {
    return this.state.user;
  };

  setUser = () => {};

  searchProjectByCode = projectId => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (projectId === "123456" || projectId === "3286010035271") {
          resolve({
            id: 12,
            info1: "projet machin",
            info2: "des trucs",
            picture: null
          });
        } else {
          reject({ msg: "Code introuvable" });
        }
      }, 1000);
    });
  };

  setProject = project => {
    this.setState({
      project: {
        id: project.id,
        info1: project.info1,
        info2: project.info2,
        picture: project.picture
      }
    });
  };

  logout = () => {
    this.setState({
      user: userDefaultState,
      uploads: uploadsDefaultState,
      project: projectDefaultState
    });
  };

  changeProject = () => {
    this.setState({
      project: projectDefaultState
    });
  };

  cancelCurrentPicture = () => {
    this.setState(state => ({
      project: {
        ...state.project,
        picture: null
      }
    }));
  };

  saveCurrentPicture = () => {
    return new Promise((resolve, reject) => {
      this.setState(
        state => {
          const { count, files } = state.uploads;
          const newCount = count + 1;
          const newFiles = [...files, state.project];
          return {
            uploads: {
              count: newCount,
              files: newFiles
            }
          };
        },
        () => resolve()
      );
    });
  };

  setCurrentPicture = source => {
    console.warn(source);
    this.setState(state => ({
      project: {
        ...state.project,
        picture: source
      }
    }));
  };

  render() {
    const { children } = this.props;
    const { user, uploads, project } = this.state;

    return (
      <ApplicationContext.Provider
        value={{
          user,
          uploads,
          project,
          testLogin: this.testLogin,
          getUser: this.getUser,
          setUser: this.setUser,
          searchProjectByCode: this.searchProjectByCode,
          setProject: this.setProject,
          logout: this.logout,
          changeProject: this.changeProject,
          cancelCurrentPicture: this.cancelCurrentPicture,
          saveCurrentPicture: this.saveCurrentPicture,
          setCurrentPicture: this.setCurrentPicture
        }}
      >
        {children}
      </ApplicationContext.Provider>
    );
  }
}

export default ApplicationContext;
export { defaultApplicationState, ApplicationContextProvider };
