import React from 'react';
import { Box, Button, Label } from 'components/Common/Common.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

let schema = yup.object().shape({
  name: yup.string().min(4).max(12).required(),
  number: yup.number().required(),
});


const initialValues = { 
  name: '', 
  number: '' 
};

const Phonebook = (props) => {
  const handleSubmit = (value, actions) => {
    props.onSubmit(value);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        border="1px solid"
      >
        <Form autoComplete="off">
          <Label>
            Name
            <Field
              type="text"
              name="name"
            />
            <ErrorMessage name="name" />
          </Label>
          <Label>
            Number
            <Field
              type="tel"
              name="number"
            />
            <ErrorMessage name="number" />
          </Label>
          <Button type="submit">Add contact</Button>
        </Form>
      </Box>
    </Formik>
  );
};

export default Phonebook;
