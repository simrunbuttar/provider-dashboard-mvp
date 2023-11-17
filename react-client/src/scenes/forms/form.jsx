import { Box, Button, TextField, MenuItem, Select } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from 'react';

const statusEnum = ['Inquiry', 'Waiting for Patient', 'Action Needed', 'Onboarding', 'Active', 'Churned'];

const Form = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    const formattedValues = {
      firstname: values.firstName,
      middlename: values.middleName || " ",
      lastname: values.lastName,
      email: values.email,
      year: values.year,
      month: values.month,
      day: values.day,
      dateOfBirth: `${values.year}-${values.month}-${values.day}`,
      status: values.status,
      addresses: [
        {
          street: values.street,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
        },
      ],
      fields: values.fields.map(field => ({ label: field.label, value: field.value })),
    };

    console.log("values");

    console.log(values);
    console.log("formattedValues");

    console.log(formattedValues);

    fetch('/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedValues),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Box m="20px">
      <Header title="ADD NEW PATIENT" subtitle="Add a New Patient Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Middle Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleName}
                name="middleName"
                error={!!touched.middleName && !!errors.middleName}
                helperText={touched.middleName && errors.middleName}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <Select
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }} >
                {statusEnum.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
                </Select>
              {/* Dropdowns for Date of Birth */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date of Birth"
                disabled
                value={`${values.year}-${values.month}-${values.day}`}
                name="dateOfBirth"
                error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: "span 1" }}
              />
              <Select
                value={values.year}
                onChange={handleChange}
                onBlur={handleBlur}
                name="year"
                label="Year"
                variant="filled"
                fullWidth
                sx={{ gridColumn: "span 1" }}
              >
                {/* Generate a list of years */}
                {Array.from({ length: 118 }, (_, index) => {
                  const year = new Date().getFullYear() - index;
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
              <Select
                value={values.month}
                onChange={handleChange}
                onBlur={handleBlur}
                name="month"
                label="Month"
                variant="filled"
                fullWidth
                sx={{ gridColumn: "span 1" }}
              >
               {/* Generate a list of months */}
               {Array.from({ length: 12 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
              <Select
                value={values.day}
                onChange={handleChange}
                onBlur={handleBlur}
                name="day"
                label="Day"
                variant="filled"
                fullWidth
                sx={{ gridColumn: "span 1" }}
              >
                {/* Generate a list of days */}
                {Array.from({ length: 31 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
              {/* Addressses Array */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Street"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street}
                name="street"
                error={!!touched.street && !!errors.street}
                helperText={touched.street && errors.street}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Postal Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.postalCode}
                name="postalCode"
                error={!!touched.postalCode && !!errors.postalCode}
                helperText={touched.postalCode && errors.postalCode}
                sx={{ gridColumn: "span 1" }}
              />
              
            </Box>
            <Box>
            {values.fields.map((field, index) => (
                <React.Fragment key={index}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={`Field ${index + 1}`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={field.label}
                    name={`fields[${index}].label`}
                    error={!!touched.fields?.[index]?.label && !!errors.fields?.[index]?.label}
                    helperText={touched.fields?.[index]?.label && errors.fields?.[index]?.label}
                    sx={{ gridColumn: "span 0.5", width: "45%", paddingRight: "10px" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={`Value ${index + 1}`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={field.value}
                    name={`fields[${index}].value`}
                    error={!!touched.fields?.[index]?.value && !!errors.fields?.[index]?.value}
                    helperText={touched.fields?.[index]?.value && errors.fields?.[index]?.value}
                    sx={{ gridColumn: "span 0.5", width: "45%", paddingLeft: "10px" }}
                  />
                </React.Fragment>
              ))}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={() => {
                  // Add a new field to the form
                  values.fields.push({ label: "", value: "" });
                }}
              >
                Add Field
              </Button>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Patient
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string(), 
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  year: yup.number().min(1906, 'Year cannot be before 1906').max(new Date().getFullYear(), "Year cannot be in the future").required('Year is required'),
  month: yup.number().required('Month is required'),
  day: yup.number().required('Day is required'),
  dateOfBirth: yup.date().nullable(),
  street: yup.string().required("Street is required"), 
  city: yup.string().required("City is required"), 
  state: yup.string().required('State is required'),
  postalCode: yup.string().required('Postal Code is required'),
  status: yup
    .string()
    .oneOf(statusEnum, 'Invalid status')
    .required('Status is required'),
  fields: yup.array().of(
    yup.object().shape({
      label: yup.string().required("Field label is required"),
      value: yup.string().required("Field value is required"),
    })
  )
});

const initialValues = {
  firstName: "",
  middleName: "", 
  lastName: "",
  email: "",
  year: "",
  month: "",
  day: "",
  status: "", 
  dateOfBirth: "",
  street: "", 
  city: "", 
  state: "", 
  postalCode: "", 
  fields: [],
};

export default Form;