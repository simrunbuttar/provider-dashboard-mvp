import { Box, Button, TextField, MenuItem, Select } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const statusEnum = ['Inquiry', 'Waiting for Patient', 'Action Needed', 'Onboarding', 'Active', 'Churned'];

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    const formattedValues = {
      ...values,
      addresses: [
        {
          street: values.street,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
        },
      ],
    };

    console.log(values);
    console.log(formattedValues);
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
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
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
  dateOfBirth: yup.date().nullable().required("Date of Birth is required"),
  street: yup.string().required("Street is required"), 
  city: yup.string().required("City is required"), 
  state: yup.string().required('State is required'),
  postalCode: yup.string().required('Postal Code is required')
});

const initialValues = {
  firstName: "",
  middleName: "", 
  lastName: "",
  email: "",
  year: "",
  month: "",
  day: "",
  dateOfBirth: "",
  street: "", 
  city: "", 
  state: "", 
  postalCode: ""
};

export default Form;