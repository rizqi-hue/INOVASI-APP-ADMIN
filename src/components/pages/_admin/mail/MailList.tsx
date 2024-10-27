import { useMediaQuery, Theme, Box } from "@mui/material";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  SimpleList,
} from "react-admin";

const userFilters = [
  <TextInput label="Nama" source="Name" alwaysOn />,
  <TextInput label="PhoneNumber" source="PhoneNumber" defaultValue="" />,
];

export default function MailList(props: any) {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ marginTop: "1em" }}>
      <List filters={userFilters} sort={{ field: 'id', order: 'DESC' }} {...props} >
        {/* {isXsmall ? ( */}
        {/* // <MobileGrid />
          <></>
        ) : ( */}
        <Datagrid optimized rowClick="edit">
          <TextField source="Name" label="Nama" />
          <TextField source="PhoneNumber" label="Email" />
          <TextField source="Status" />
          <DateField source="createdAt" label="Dikirim pada" />
        </Datagrid>
        {/* )} */}
      </List>
    </Box>
  );
}
