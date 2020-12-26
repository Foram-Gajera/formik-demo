import React from "react";
import { Field, ErrorMessage } from "formik";
import TextErr from "./TextErr";

const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextErr} />
    </div>
  );
};

export default Input;
