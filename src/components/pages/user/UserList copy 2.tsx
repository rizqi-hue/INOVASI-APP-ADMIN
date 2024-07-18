import { useMediaQuery, Theme, Box } from "@mui/material";
import { useState } from "react";
import { List, Datagrid, useGetList, Title, DateField } from "react-admin";
import {
  Card,
  TextField,
  Button,
  Toolbar,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { PlusOne } from "@mui/icons-material";

export default function UserList(props: any) {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const sort = { field: "id", order: "DESC" };

  const { data, total, isLoading } = useGetList("users", {
    filter: { q: filter },
    pagination: { page, perPage },
    sort,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title title="Users" />
      <Box display={{ xs: "block", sm: "flex" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextField
            label="Search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            variant="filled"
            size="small"
            margin="dense"
          />
        </Box>
      </Box>

      <Card>
        <Table sx={{ padding: 2 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                </TableRow>
              ))
              : ""}
          </TableBody>
        </Table>
      </Card>
      {total ? (
        <Toolbar>
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)}>Previous page</Button>
          )}
          {page < 2 / perPage && (
            <Button onClick={() => setPage(page + 1)}>Next page</Button>
          )}
        </Toolbar>
      ) : (
        ""
      )}
    </>
  );
}
