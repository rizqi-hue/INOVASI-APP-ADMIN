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
  <TextInput label="Nama" source="firstName" alwaysOn />,
  <TextInput label="Email" source="email" defaultValue="" />,
];

export default function PelamarList(props: any) {
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
            <TextField source="lowongan_detail.title" label="Lowongan" />
            <TextField source="member_detail.firstName" label="Pelamar" />
            <DateField source="createdAt" label="Dibuat pada" />
          </Datagrid>
        )}
      </List>
    </Box>
  );
}
