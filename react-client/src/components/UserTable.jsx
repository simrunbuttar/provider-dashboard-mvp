import * as React from 'react';
import { useUserData } from '../data/UserDataContext';
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
} from '@table-library/react-table-library/table';

import { MDBDataTable } from 'mdbreact';

const DatatablePage = () => {
  const streetAccessor = (row) => (row.addresses && row.addresses.length > 0 ? row.addresses[0].street : '');
  // const cityAccessor = (row) => (row.addresses && row.addresses.length > 0 ? row.addresses[0].city : '');
  // const stateAccessor = (row) => (row.addresses && row.addresses.length > 0 ? row.addresses[0].state : '');
  // const postalCodeAccessor = (row) => (row.addresses && row.addresses.length > 0 ? row.addresses[0].postalCode : '');

  const {userData, updateUserData } = useUserData();
  const list = userData;
  console.log("list");
  console.log(list);


  const data = { 
     columns: [
        { label: 'First Name', field: 'firstname', sort: 'asc', width: 150 },
        { label: 'Last Name', field: 'lastname', sort: 'asc', width: 150 },
        { label: 'Email', field: 'email', sort: 'asc', width: 150},
        { label: 'Date of Birth', field: 'dateOfBirth', sort: 'asc', width: 150 },
        { label: 'Status', field: 'status', sort :'asc', width: 150},
        { label: 'Street', field: streetAccessor, sort: 'asc', width : 150},
        // { label: 'City', field: 'addresses[0].city', sort: 'asc', width : 150 },
        // { label: 'State', field: 'addresses[0].state', sort: 'asc', width: 150 },
        // { label: 'Postal Code', field: 'addresses[0].postalCode', sort: 'asc', width: 150 }

      ], 
    rows: list
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

// const UserTable = () => {
//   const {userData, updateUserData } = useUserData();
//   const list = userData;
//   console.log("list");
//   console.log(list);

//   // return (
//   //   <Table data={list}>
//   //     {(tableList) => (
//   //       <Header>
//   //         <HeaderRow>
//   //           <HeaderCell>Task</HeaderCell>
//   //           <HeaderCell>Deadline</HeaderCell>
//   //           <HeaderCell>Type</HeaderCell>
//   //           <HeaderCell>Complete</HeaderCell>
//   //         </HeaderRow>
//   //       </Header>
//   //     )}
//   //   </Table>
//   // );
// };

// export default UserTable;

// // import React from 'react';
// // import { useTable, usePagination } from 'react-table';
// // import TablePagination from '@mui/material/TablePagination';
// // import Paper from '@mui/material/Paper';
// // import Table from '@mui/material/Table';
// // import TableBody from '@mui/material/TableBody';
// // import TableCell from '@mui/material/TableCell';
// // import TableContainer from '@mui/material/TableContainer';
// // import TableHead from '@mui/material/TableHead';
// // import TableRow from '@mui/material/TableRow';

// // const UserTable = React.memo(({ data }) => {
// //     console.log("usertable 1");
// //     const streetAccessor = (row) => (row.addresses && row.addresses.length > 0 ? row.addresses[0].street : '');
// //     const cityAccessor = (row) => (row.addresses && row.addresses.length > 0 ? row.addresses[0].city : '');
// //     const stateAccessor = (row) => (row.addresses && row.addresses.length > 0 ? row.addresses[0].state : '');
// //     const postalCodeAccessor = (row) => (row.addresses && row.addresses.length > 0 ? row.addresses[0].postalCode : '');
// //     // Define your columns
// //     const columns = [
// //         { Header: 'First Name', accessor: 'firstname' },
// //         { Header: 'Last Name', accessor: 'lastname' },
// //         { Header: 'Email', accessor: 'email' },
// //         { Header: 'Date of Birth', accessor: 'dateOfBirth' },
// //         { Header: 'Status', accessor: 'status' },
// //         { Header: 'Street', accessor: streetAccessor },
// //         { Header: 'City', accessor: cityAccessor },
// //         { Header: 'State', accessor: stateAccessor },
// //         { Header: 'Postal Code', accessor: postalCodeAccessor },
// //       ];
// //       console.log("usertable 2");


// //   // Create a new table instance
// //   const {
// //     getTableProps,
// //     getTableBodyProps,
// //     headerGroups,
// //     page,
// //     prepareRow,
// //     state: { pageIndex, pageSize },
// //   } = useTable(
// //     {
// //       columns,
// //       data,
// //       initialState: { pageIndex: 0, pageSize: 5 },
// //     },
// //     usePagination
// //   );

// //   console.log("usertable 3");


// //   return (
// //     <Paper>
// //       <TableContainer>
// //         <Table {...getTableProps()}>
// //           <TableHead>
// //             {headerGroups.map((headerGroup) => (
// //               <TableRow {...headerGroup.getHeaderGroupProps()}>
// //                 {headerGroup.headers.map((column) => (
// //                   <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableHead>
// //           <TableBody {...getTableBodyProps()}>
// //             {page.map((row) => {
// //               prepareRow(row);
// //               return (
// //                 <TableRow {...row.getRowProps()}>
// //                   {row.cells.map((cell) => (
// //                     <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
// //                   ))}
// //                 </TableRow>
// //               );
// //             })}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //       <TablePagination
// //         rowsPerPageOptions={[5, 10, 20]}
// //         component="div"
// //         count={data.length}
// //         rowsPerPage={pageSize}
// //         page={pageIndex}
// //         onPageChange={(event, newPage) => {
// //           // Handle page change
// //           console.log("handle page change")
// //         }}
// //         onRowsPerPageChange={(event) => {
// //           // Handle rows per page change
// //           console.log("Handle row change")
// //         }}
// //       />
// //     </Paper>
// //   );
// // }, (prevProps, nextProps) => prevProps.data === nextProps.data);

// // export default UserTable;