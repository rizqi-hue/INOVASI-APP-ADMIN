import { Box, Theme, useMediaQuery } from "@mui/material";
import {
  Datagrid,
  DateField,
  List,
  TextField,
  TextInput
} from "react-admin";

const userFilters = [
  <TextInput label="Nama" source="FullName" alwaysOn />,
  <TextInput label="Email" source="email" defaultValue="" />,
];

export default function UserList(props: any) {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ marginTop: "1em" }}>
      <List filters={userFilters} {...props}>
        {isXsmall ? (
          // <MobileGrid />
          <></>
        ) : (
          <Datagrid optimized rowClick="edit">
            <TextField source="Name" label="Nama" />
            <TextField source="Description" label="Keterangan" />
            <DateField source="createdAt" label="Dibuat pada" />
          </Datagrid>
        )}
      </List>
    </Box>
  );
}

