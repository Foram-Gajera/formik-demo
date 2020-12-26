// manually triggering validations
import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
//FastField is optimized version of Field component which is works like shouldComponentUpdate LifeCycle
//the props of FastField component renders when only it updates
import * as Yup from "yup";
import TextError from "./TextError";

//for yup first write validation schema object because  yup isfor object schema validation

const initialValues = {
  //this key names is same as name property of input fields
  name: "forii",
  email: "",
  channel: "",
  comments: "",
  address: "",
  //nested object
  social: {
    facebook: "",
    twitter: "",
  },
  //array
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const savedValues = {
  name: "foram",
  email: "f@gmail.com",
  channel: "formik",
  comments: "load saved data",
  address: "junagadh",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
  console.log(values);
  console.log(onSubmit);
  //this setSubmitting is caalled after successful api request
  onSubmitProps.setSubmitting(false);
  //after submit data to reset the form
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

//For Field Level Validation
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const NewYouTubeForm = () => {
  //useState
  const [formValues, setFormValues] = useState(null);

  //   const formik = useFormik({
  //     initialValues,
  //     onSubmit,
  //     // validate,
  //     validationSchema,
  //   });

  //   console.log(formik.touched);

  return (
    <Formik
      //don't write initialValue || formValues
      //because it checks from first if formValues are not null then only it takes initialValues
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      //it decides whether form canc hage the initial value or not after the form initializa once
      enableReinitialize
      //   validateOnMount -> use for small validation not true with complex validations
    >
      {(formik) => {
        console.log("formik props", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                // {...formik.getFieldProps("name")}
              />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field
                type="email"
                id="email"
                name="email"
                // {...formik.getFieldProps("email")}
              />
              <ErrorMessage name="email">
                {/* render props pattern */}
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                // {...formik.getFieldProps("channel")}
              />
              <ErrorMessage name="channel" />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              {/* Field by default take inpute text box field so to make textarea need to pass as="textarea" */}
              <Field
                // type="text"
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
                // {...formik.getFieldProps("comments")}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  console.log(props);
                  return (
                    <div>
                      <input id="address" type="text" {...field} />
                      {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
              {/* <ErrorMessage name="address" /> */}
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook Profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Twitter Profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary Phone number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>

            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary Phone number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label>List of Phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  console.log(fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  console.log("length: " + phNumbers.length);
                  const check = phNumbers.length !== 1 ? false : true;
                  console.log("phNumbers Field -> form errors: ", form.errors);
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          <button
                            type="button"
                            disabled={check}
                            onClick={() => remove(index)}
                          >
                            -
                          </button>
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              validate Comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              validate all
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Touch field comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({ name: true, email: true, channel: true })
              }
            >
              Touch all field
            </button>
            <br />
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load Saved Data
            </button>

            {/* it reset the forms with initial values */}
            <button type="reset">Reset</button>
            <br />
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {/* disabled={!(formik.dirty && formik.isValid)} */}
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewYouTubeForm;
