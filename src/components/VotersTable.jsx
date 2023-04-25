import React, { useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
// import { Delete } from "@mui/icons-material"
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"

function VotersTable({ rows, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [viewVoter, setViewVoter] = useState({})

  const [selectedRow, setSelectedRow] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")

  const handleRowClick = (params) => {
    setSelectedRow(params.row)
    setOpenModal(true)
    setName(params.row.name)
    setAge(params.row.age)
    setEmail(params.row.email)
  }

  const handleModalClose = () => {
    setOpenModal(false)
    setSelectedRow(null)
    setName("")
    setAge("")
    setEmail("")
  }

  const handleUpdateRow = () => {
    const updatedRows = rows.map((row) => {
      if (row.id === selectedRow.id) {
        return {
          ...row,
          name,
          age,
          email,
        }
      }
      return row
    })
    setRows(updatedRows)
    handleModalClose()
  }

  // Filter the rows based on the search term
  const filteredRows = rows.filter(
    (row) =>
      row.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.voterID.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate the number of pages based on the number of rows and the rows per page setting
  const numPages = Math.ceil(filteredRows.length / rowsPerPage)

  // Get the current page of rows based on the current page setting and rows per page setting
  const currentPageRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handlePageChange = (params) => {
    setPage(params.page)
  }

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDelete = (rowIds) => {
    onDelete(rowIds)
  }

  const handleViewRow = (rowsId) => {
    console.log(rowsId)
    setViewVoter(rowsId)
  }

  const columns = [
    { field: "no", headerName: "No", width: 70 },

    {
      field: "fullName",
      headerName: "Full Name",
      width: 260,
      renderCell: (params) => (
        <span className="flex gap-2 items-center text-white">
          <img
            src={params.row.imgUrl}
            alt=""
            className="h-[50px] w-[50px] rounded-lg items-center border "
          />
          <span> {params.row.fullName}</span>
        </span>
      ),
    },
    {
      field: "age",
      headerName: "Age (Years)",
      width: 90,
      renderCell: (params) => (
        <span className="flex gap-2 items-center text-white">
          <span> {params.row.age}</span>
        </span>
      ),
    },
    {
      field: "sex",
      headerName: "Sex",
      width: 90,
      renderCell: (params) => (
        <span className="flex gap-2 items-center text-white">
          <span> {params.row.sex}</span>
        </span>
      ),
    },
    {
      field: "voterID",
      headerName: "Voter's ID",
      width: 100,
    },
    {
      field: "voterRegLocation",
      headerName: "Registering Location",
      width: 150,
      renderCell: (params) => (
        <span className="flex gap-2 items-center text-white">
          <span> {params.row.regLocation}</span>
        </span>
      ),
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <span className="flex gap-2">
          <Button
            className="bg-blue-900 mr-2"
            variant="contained"
            // color="success"
            //   startIcon={<Delete />}
            onClick={() => handleViewRow(params.row)}>
            View
          </Button>
          <Button
            variant="contained"
            color="error"
            //   startIcon={<Delete />}
            onClick={() => handleDelete([params.id])}>
            Delete
          </Button>
        </span>
      ),
    },
  ]

  const rowsData = currentPageRows.map((row, index) => ({
    id: row._id,
    no: index + 1,
    fullName: row.fullName,
    party: row.party,
    positionVied: row.positionVied,
    imgUrl: row.imgUrl,
    voterID: row.voterID,
    regLocation: row.regLocation,
    votingToken: 0,
    sex: row.sex,
    age: row.age,

    partyIconUrl: row.partyIconUrl,
  }))

  return (
    <>
      <TextField
        className="w-30"
        label="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div style={{ height: 400, width: "100%" }} className="text-white">
        <DataGrid
          className="text-white bg-blue-900"
          rows={rowsData}
          columns={columns}
          onRowClick={handleRowClick}
          pagination
          pageSize={rowsPerPage}
          rowCount={filteredRows.length}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[5, 10, 25]}
          onPageSizeChange={handleRowsPerPageChange}
        />
      </div>
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>View Candidate</DialogTitle>
        <DialogContent>
          <img
            src={viewVoter?.imgUrl}
            alt=""
            className="h-[120px] w-[120px] items-center border mx-auto rounded-full"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            value={viewVoter.fullName}
            onChange={(event) =>
              setViewVoter({ ...viewVoter, fullName: event.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Position Vied"
            value={viewVoter.positionVied}
            onChange={(event) =>
              setViewVoter({ ...viewVoter, positionVied: event.target.value })
            }
            fullWidth
          />
          <div className="flex items-center gap-2">
            <img
              src={viewVoter?.partyIconUrl}
              alt=""
              className="h-[50px] w-[50px] rounded-lg items-center border "
            />
            <TextField
              margin="dense"
              label="Party"
              value={viewVoter.party}
              onChange={(event) =>
                setViewVoter({ ...viewVoter, party: event.target.value })
              }
            />

            <TextField
              margin="dense"
              label="Location"
              value={viewVoter.regLocation}
              onChange={(event) =>
                setViewVoter({ ...viewVoter, party: event.target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleUpdateRow}>Update If Any Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default VotersTable
