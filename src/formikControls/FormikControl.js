import React from "react";
import Input from "./components/Input";
import RadioButtons from "./components/RadioButtons";
import Select from "./components/Select";
import CheckboxGrp from "./components/CheckboxGrp";
import DatePicker from "./components/DatePicker";

import TextArea from "./components/TextArea";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxGrp {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
