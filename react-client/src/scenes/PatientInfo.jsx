import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const statusEnum = ['Inquiry', 'Waiting for Patient', 'Action Needed', 'Onboarding', 'Active', 'Churned'];

const EditPatientForm = ({ initialPatientData, onSubmit }) => {
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
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
    addresses: []
  });

  useEffect(() => {
    const secondaryAddresses = initialPatientData.addresses
    ? initialPatientData.addresses.filter(address => address.type === "Secondary")
    : [];

    setInitialValues({
      firstname: initialPatientData.firstname ?? "",
      middlename: initialPatientData.middlename ?? "",
      lastname: initialPatientData.lastname ?? "",
      email: initialPatientData.email ?? "",
      year: initialPatientData.dateOfBirth ? new Date(initialPatientData.dateOfBirth).getFullYear().toString() : "",
      month: initialPatientData.dateOfBirth ? (new Date(initialPatientData.dateOfBirth).getMonth() + 1).toString() : "",
      day: initialPatientData.dateOfBirth ? new Date(initialPatientData.dateOfBirth).getDate().toString() : "",
      status: initialPatientData.status ?? "",
      dateOfBirth: initialPatientData.dateOfBirth ?? "",
      street: initialPatientData.addresses && initialPatientData.addresses.length > 0 ? initialPatientData.addresses[0].street ?? "" : "",
      city: initialPatientData.addresses && initialPatientData.addresses.length > 0 ? initialPatientData.addresses[0].city ?? "" : "",
      state: initialPatientData.addresses && initialPatientData.addresses.length > 0 ? initialPatientData.addresses[0].state ?? "" : "",
      postalCode: initialPatientData.addresses && initialPatientData.addresses.length > 0 ? initialPatientData.addresses[0].postalCode ?? "" : "",
      fields: initialPatientData.fields || [],
      addresses: secondaryAddresses || []
    });
  }, [initialPatientData]);

  const checkoutSchema = yup.object().shape({
    firstname: yup.string().required("First name is required"),
    middlename: yup.string(),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    year: yup
      .number()
      .min(1906, 'Year cannot be before 1906')
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required('Year is required'),
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
    ),
  });

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setValues
      }) => (
        <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                name="firstname"
                error={!!touched.firstname && !!errors.firstname}
                helpertext={touched.firstname && errors.firstname}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Middle Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middlename}
                name="middlename"
                error={!!touched.middlename && !!errors.middlename}
                helpertext={touched.middlename && errors.middlename}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                name="lastname"
                error={!!touched.lastname && !!errors.lastname}
                helpertext={touched.lastname && errors.lastname}
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
                helpertext={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                select
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helpertext={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }} >
                {statusEnum.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
                </TextField>
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
                helpertext={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                value={values.year}
                onChange={handleChange}
                onBlur={handleBlur}
                select
                name="year"
                label="Year"
                variant="filled"
                fullWidth
                helpertext="Year"
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
              </TextField>
              <TextField
                value={values.month}
                onChange={handleChange}
                onBlur={handleBlur}
                select
                name="month"
                label="Month"
                variant="filled"
                fullWidth
                helpertext="Month"
                sx={{ gridColumn: "span 1" }}
              >
               {/* Generate a list of months */}
               {Array.from({ length: 12 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                value={values.day}
                onChange={handleChange}
                onBlur={handleBlur}
                select
                name="day"
                label="Day"
                variant="filled"
                fullWidth
                helpertext="Day"
                sx={{ gridColumn: "span 1" }}
              >
                {/* Generate a list of days */}
                {Array.from({ length: 31 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </TextField>
              {/* Addressses Array */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Primary Street"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street}
                name="street"
                error={!!touched.street && !!errors.street}
                helpertext={touched.street && errors.street}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Primary City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helpertext={touched.city && errors.city}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Primary State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                helpertext={touched.state && errors.state}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Primary Postal Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.postalCode}
                name="postalCode"
                error={!!touched.postalCode && !!errors.postalCode}
                helpertext={touched.postalCode && errors.postalCode}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            {/* Secondary Addresses */}
            {values.addresses.map((address, index) => ( 
              address.type === "Secondary" &&
                <React.Fragment key={index}>
                  {/* Address fields */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={`Secondary Street ${index + 1}`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.street}
                    name={`addresses[${index}].street`}
                    error={!!touched.addresses?.[index]?.street && !!errors.addresses?.[index]?.street}
                    helpertext={touched.addresses?.[index]?.street && errors.addresses?.[index]?.street}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={`Secondary City ${index + 1}`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.city}
                    name={`addresses[${index}].city`}
                    error={!!touched.addresses?.[index]?.city && !!errors.addresses?.[index]?.city}
                    helpertext={touched.addresses?.[index]?.city && errors.addresses?.[index]?.city}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={`Secondary State ${index + 1}`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.state}
                    name={`addresses[${index}].state`}
                    error={!!touched.addresses?.[index]?.state && !!errors.addresses?.[index]?.state}
                    helpertext={touched.addresses?.[index]?.state && errors.addresses?.[index]?.state}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={`Secondary Postal Code ${index + 1}`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={address.postalCode}
                    name={`addresses[${index}].postalCode`}
                    error={!!touched.addresses?.[index]?.postalCode && !!errors.addresses?.[index]?.postalCode}
                    helpertext={touched.addresses?.[index]?.postalCode && errors.addresses?.[index]?.postalCode}
                    sx={{ gridColumn: "span 1" }}
                  />
                </React.Fragment>
              ))}
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="button"
                  color="info"
                  variant="contained"
                  onClick={() => {
                    console.log("Adding Secondary Address");
                    setValues(prevValues => ({
                      ...prevValues,
                      addresses: [
                        ...prevValues.addresses,
                        {
                          street: "",
                          city: "",
                          state: "",
                          postalCode: "",
                          type: "Secondary",
                        },
                      ],
                    }));
                  }}
                  sx={{ gridColumn: "span 0.5", marginTop: "16px", marginRight: "5px" }}
                >
                  Add Secondary Address
                </Button>
                <Button
                  type="button"
                  color="warning"
                  variant="contained"
                  onClick={() => {
                    console.log("Removing Secondary Address");
                    setValues(prevValues => ({
                    ...prevValues,
                    addresses: prevValues.addresses.slice(0, -1),
                  }));
                  }}
                  sx={{ gridColumn: "span 0.5", marginTop: "16px", marginLeft: "5px" }}
                >
                  Remove Secondary Address
                </Button>
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
                    helpertext={touched.fields?.[index]?.label && errors.fields?.[index]?.label}
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
                    helpertext={touched.fields?.[index]?.value && errors.fields?.[index]?.value}
                    sx={{ gridColumn: "span 0.5", width: "45%", paddingLeft: "10px" }}
                  />
                </React.Fragment>
              ))}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="button"
                color="success"
                variant="contained"
                onClick={() => {
                  setValues(prevValues => ({
                    ...prevValues,
                    fields: [
                      ...prevValues.fields,
                      {
                        label: "", 
                        value: ""
                      },
                    ],
                  }));
                }}
                sx={{ gridColumn: "span 0.5", marginTop: "16px", marginRight: "5px"}}>
                Add Field
              </Button>
              <Button
                    type="button"
                    color="error"
                    variant="contained"
                    onClick={() => {
                      setValues(prevValues => ({
                        ...prevValues,
                        fields: prevValues.fields.slice(0, -1),
                      }));
                    }}
                    sx={{ gridColumn: "span 0.5", marginTop: "16px", marginLeft: "5px"}}
                  >
                    Remove Field
                </Button>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Patient
              </Button>
            </Box>
          </form>
      )}
    </Formik>
  );
};

const PatientInfo = () => {
  const { patientId } = useParams();
  const navigate = useNavigate()
  const [patientDetails, setPatientDetails] = useState();

  useEffect(() => {
    // Fetch patient details using patientId
    fetch(`/api/patients/${patientId}`)
      .then(response => response.json())
      .then(data => {
        setPatientDetails(data);
      })
      .catch(error => console.error('Error fetching patient details:', error));
  }, [patientId]);

  const handleDeletePatient = () => {
    console.log("Deleting Patient Data:", `${patientId}`);
    // Implement logic to delete patient
    fetch(`/api/patients/${patientId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            console.log('Patient deleted successfully');
            navigate(`/`);    
          } else {
            console.error('Failed to delete patient');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

  const handleUpdatePatient = (updatedPatientData) => {
    // Implement logic to update patient data
    console.log("Updated Patient Data:", updatedPatientData);

    const formattedValues = {
        firstname: updatedPatientData.firstname,
        middlename: updatedPatientData.middlename,
        lastname: updatedPatientData.lastname,
        email: updatedPatientData.email,
        dateOfBirth: new Date(updatedPatientData.year, updatedPatientData.month - 1, updatedPatientData.day).toISOString().split('T')[0],
        status: updatedPatientData.status,
        addresses: [
          {
            street: updatedPatientData.street,
            city: updatedPatientData.city,
            state: updatedPatientData.state,
            postalCode: updatedPatientData.postalCode,
            type: "Primary"
          },
          ...updatedPatientData.addresses.map(address => ({
            street: address.street,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            type: "Secondary",
          })),
        ],
        fields: updatedPatientData.fields.map(field => ({ label: field.label, value: field.value })),
      };


    console.log("Formatted Patient Data:", formattedValues);
    fetch(`/api/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedValues),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          navigate('/');
        })
        .catch(error => {
          console.error('Error:', error);
        });
  };

  return (
    <div>
      <h2>Patient Details</h2>
      <h3> Edit Patient Information here</h3>
      <Box>
        <Button
                type="button"
                color="error"
                variant="contained"
                onClick={() => {
                    handleDeletePatient()
                }}
                sx={{marginTop: "3px", marginBottom: "15px", marginRight: "5px"}}
                >
                Delete Patient
                </Button>
      </Box>
      {patientDetails ? (
        <EditPatientForm
          initialPatientData={patientDetails}
          onSubmit={handleUpdatePatient}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientInfo;
