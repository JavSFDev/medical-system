import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useCallApi } from '../../hooks/useCallApi'
import TableMaintenanceHead from '../TableMaintenanceHead'
import ToolbarTable from '../ToolbarTable'
import { Box } from '@mui/material'



const headCells = [
  {
    id: 'Enfermedades_nombreA',
    numeric: false,
    disablePadding: true,
    label: 'Enfermedad'
  },
  // {
  //   id: 'nombreC',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Categoria'
  // }

]

export function TableEnfermedades () {
  const { data, error, loaded } = useCallApi({ endpoint: 'enfermedad/' })
  const [order, setOrder] = React.useState('asc')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty data.
  const emptydata =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  return (
    <>
      {!loaded && <div>Loading</div>}
      {data && data.length > 0 &&
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <ToolbarTable 
             numSelected={selected.length} 
             idSelected={Number(selected[0]) || 0} 
             path={`/enfermedad/update/`}
             Title ={'Enfermedades'}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
              >
                <TableMaintenanceHead
                  numSelected={selected.length}
                  order={order}
                 // orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                  headCells={headCells}
                  page = {'/enfermedad/create/'}

                />
                <TableBody>
                  {//stableSort(data)
                    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.idEnfermedad)
                      const labelId = `enhanced-table-checkbox-${index}`
                     
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.idEnfermedad)}
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.idEnfermedad}
                          selected={isItemSelected}
                        >
                          <TableCell padding='checkbox'>
                              <Checkbox
                                color='primary'
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId
                                }}
                              />
                          </TableCell>
                          <TableCell
                              component='th'
                              id={labelId}
                              scope='row'
                              padding='none'
                            >
                              {row.nombre}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  {emptydata > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptydata
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Paginacion */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label='Dense padding'
          />
        </Box>}
    </>
  )
}
