import { useMediaQuery, Theme, Box } from "@mui/material";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  SimpleList,
} from "react-admin";

const Filters = [
  <TextInput label="Nama" source="Name" alwaysOn />,
];

export default function MenuList(props: any) {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ marginTop: "1em" }}>
      <List filters={Filters} sort={{ field: 'id', order: 'DESC' }} {...props} >
        {/* {isXsmall ? ( */}
        {/* // <MobileGrid />
          <></>
        ) : ( */}
        <Datagrid optimized rowClick="edit">
          <TextField source="Name" label="Nama" />
          <TextField source="Path" label="Url" />
          <DateField source="createdAt" label="Dikirim pada" />
        </Datagrid>
        {/* )} */}
      </List>
    </Box>
  );
}
