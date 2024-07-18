import { useMediaQuery, Theme, Box } from "@mui/material";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  SimpleList,
  useRecordContext,
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
            <TextField source="FullName" label="Nama" />
            <TextField source="NomorIdentitasPegawai" label="NIP" />
            <TextField source="PhoneNumber" label="No Hp" />
            <TextField source="Email" label="Email" />
            <Role label="Role" />
            <DateField source="createdAt" label="Dibuat pada" />
          </Datagrid>
        )}
      </List>
    </Box>
  );
}

const Role = (props: { label: string }) => {
  const record = useRecordContext();
  return (
    <span>
      {
        record.UserPrivilege && record.UserPrivilege.map((value: any) => {
          return (
            value.Privilege?.Name + " "
          )
        })
      }
    </span>
  );
};

