import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteData, getData } from "../services/linkService";
import DeleteIcon from "@mui/icons-material/Delete";
import "./list.css";
import { getCurrentUser } from "../services/authService";

export default function ListApp({ thirdField, formHref }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const currnetPage = thirdField.toLowerCase() + "s";

  useEffect(() => {
    async function asyncF() {
      setSelectedRows([]);
      const db = await getData(currnetPage);
      setColumnsData(await db.data);
    }
    asyncF();
    console.log("updated");
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "link",
      headerName: thirdField,
      width: 450,
      editable: true,
    },
  ];

  const removeReptitvieArray = async (obj1, obj2) => {
    const allRows = [];
    for (let row of obj2) {
      for (let column of obj1) {
        if (row["id"] === column["id"]) {
          allRows.push(row);
          await deleteData(currnetPage, row._id);
        }
      }
    }
    return obj1.filter((item) => {
      for (let i = 0; i < allRows.length; i++) {
        if (item._id !== allRows[i]._id) return item;
      }
    });
  };

  const handleDeleteVideos = async () => {
    if (!selectedRows[0]) return null;

    const newData = await removeReptitvieArray(columnsData, selectedRows);

    console.log(newData);
    setColumnsData(newData);
    setSelectedRows([]);
  };
  console.log(columnsData);

  return (
    <div>
      <p>Showing {columnsData.length} movies in the database.</p>
      <Box
        sx={{
          height: 800,
          width: "80%",
          position: "fixed",
          top: "25",
          marginLeft: "15rem",
        }}
      >
        <DataGrid
          rows={columnsData}
          autoHeight
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const allSelectedRows = columnsData.filter((row) =>
              selectedIDs.has(row.id)
            );
            setSelectedRows(allSelectedRows);
          }}
          disableSelectionOnClick
          sx={{
            color: "white",
          }}
        />
        {getCurrentUser() ? (
          <Stack direction="row" spacing={2} sx={{ marginTop: "1rem" }}>
            <Button
              variant="outlined"
              onClick={handleDeleteVideos}
              startIcon={<DeleteIcon />}
              color="error"
            >
              Delete
            </Button>
            <Button variant="outlined" component="label">
              <Link style={{ color: "#90caf9" }} to={formHref}>
                Upload
              </Link>
            </Button>
          </Stack>
        ) : null}
      </Box>
    </div>
  );
}
