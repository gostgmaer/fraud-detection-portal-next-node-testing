import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function PaginationBlock({page, setPage, count, rowsPerPage, setRowsPerPage,perPage}) {


    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        console.log(event);
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);

    };

    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={perPage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className='w-full'
        />
    );
}
