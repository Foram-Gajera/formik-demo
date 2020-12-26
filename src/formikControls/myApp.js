import React from "react";
import "./style.css";
import FormikContainer from "./FormikContainer";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const App = () => {
  return (
    <div className="App">
      <RegistrationForm />
      {/* <LoginForm /> */}
      {/* <FormikContainer /> */}
    </div>
  );
};

export default App;
