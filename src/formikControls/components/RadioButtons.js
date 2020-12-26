import React from "react";
import { ErrorMessage, Field } from "formik";
import TextErr from "./TextErr";

const RadioButtons = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor="name">{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          console.log(field);
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextErr} />
    </div>
  );
};

export default RadioButtons;
