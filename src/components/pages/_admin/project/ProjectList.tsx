import { useMediaQuery, Theme, Box } from "@mui/material";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  SimpleList,
  SelectInput,
  useRecordContext,
} from "react-admin";

const lang = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
];

const type = [
  { id: "Dalam Pengerjaan", name: "Dalam Pengerjaan" },
  { id: "Selesai Pengerjaan", name: "Selesai Pengerjaan" },
];


const filters = [
  <div className="block md:hidden">
    <TextInput source="Title" label="Cari berdasarkan judul" alwaysOn />
  </div>,
  <SelectInput
    source="lang"
    label="Bahasa"
    choices={lang}
    optionText="name"
    optionValue="id"
    alwaysOn
  />,
  <SelectInput
    source="type"
    label="Status Pengerjaan"
    choices={type}
    optionText="name"
    optionValue="id"
    alwaysOn
  />,
];

export default function ProjectList(props: any) {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ marginTop: "1em" }}>
      <List filters={filters} sort={{ field: 'id', order: 'DESC' }} {...props} >
        {/* {isXsmall ? ( */}
        {/* // <MobileGrid />
          <></>
        ) : ( */}
        <Datagrid optimized rowClick="edit">
          <TitleField label="Judul / Nama Project" />
          <TextField source="category" />
          <TextField source="type" />
          <DateField source="start_date" label="Dikerjakan pada" />
          <DateField source="end_date" label="Selesai pada" />
          <TextField source="status" label="Status" />
          <DateField source="createdAt" label="Dibuat pada" />
        </Datagrid>
        {/* )} */}
      </List>
    </Box>
  );
}

const TitleField = (props: { label: string }) => {
  const record = useRecordContext();
  return <span>{record.title.substring(0, 50)}</span>;
};
