import React from 'react';
import { useUserData } from '../data/UserDataContext';
import { Link } from 'react-router-dom';
import '../css/DatatablePage.css';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';


const DatatablePage = () => {
  const {userData } = useUserData();

  const flattenAddress = (user) => {
    return {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      status: user.status,
      primaryAddressStreet: user.addresses.length > 0 ? user.addresses[0].street : '',
      primaryAddressCity: user.addresses.length > 0 ? user.addresses[0].city : '',
      primaryAddressState: user.addresses.length > 0 ? user.addresses[0].state : '',
      primaryAddressPostalCode: user.addresses.length > 0 ? user.addresses[0].postalCode : '',
    };
  }
 
  const data = { 
     columns: [
        { label: 'First Name', field: 'firstname', sort: 'asc', width: 150 },
        { label: 'Last Name', field: 'lastname', sort: 'asc', width: 150 },
        { label: 'Email', field: 'email', sort: 'asc', width: 150},
        { label: 'Date of Birth', field: 'dateOfBirth', sort: 'asc', width: 150 },
        { label: 'Status', field: 'status', sort :'asc', width: 150},
        { label: 'City', field: 'primaryAddressCity', sort: 'asc', width : 150 },
        { label: 'State', field: 'primaryAddressState', sort: 'asc', width: 150 },
        { label: 'Postal Code', field: 'primaryAddressPostalCode', sort: 'asc', width: 150 },
        { label: 'See More', field: 'seeMore', width: 150 }
      ], 
    rows: userData.map((patient) => ({
        ...flattenAddress(patient),
        seeMore: (
          <Link to={`/patientInfo/${patient._id}`}>
            <button>See More Info</button>
          </Link>
        ),
      }))
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
}

export default DatatablePage;
