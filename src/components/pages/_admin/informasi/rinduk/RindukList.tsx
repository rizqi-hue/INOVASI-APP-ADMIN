import { Box, Chip, Theme, useMediaQuery } from "@mui/material";
import {
  BulkDeleteButton,
  CreateButton,
  Datagrid,
  DateField,
  ExportButton,
  FilterContext,
  FilterForm,
  InputProps,
  ListBase,
  Pagination,
  SelectInput,
  SortButton,
  TextField,
  TextInput,
  Title,
  TopToolbar,
  useListContext,
  useTranslate
} from "react-admin";
import Aside from "./Aside";

const lang = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
];

const RindukList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  return (
    <div>
      <ListBase perPage={24} filter={{ Type: "RINDUK" }} sort={{ field: "createdAt", order: "DESC" }}>
        <Title defaultTitle={"Slider"} />

        <div className="px-2 md:mx-0">
          <FilterContext.Provider value={productFilters}>
            <ListActions isSmall={isSmall} />
            {/* {isSmall && ( */}
            <Box m={1}>
              <FilterForm />
            </Box>
            {/* )} */}
          </FilterContext.Provider>
        </div>

        <div className="mx-3 md:mx-0">
          <Box display="flex">
            <Aside />
            <Box width={isSmall ? "auto" : "calc(100% - 16em)"}>
              {/* <GridList /> */}
              <Datagrid optimized rowClick="edit">
                <TextField source="Title" label="Judul" />
                <TextField source="Status" label="Status" />
                <DateField source="createdAt" label="Dibuat pada" />
              </Datagrid>
              <Pagination rowsPerPageOptions={[24, 48, 72]} />
            </Box>
          </Box>
        </div>
      </ListBase>
    </div>
  );
};

const QuickFilter = ({ label }: InputProps) => {
  const translate = useTranslate();
  return <Chip sx={{ mb: 1 }} label={translate(label as string)} />;
};

export const productFilters = [
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
];

const ListActions = ({ isSmall }: any) => {
  const { selectedIds } = useListContext();

  return (
    <TopToolbar sx={{ minHeight: { sm: 56 } }}>
      {selectedIds.length > 0 && <BulkDeleteButton label="DELETE SELECTED" />}
      {/* <FilterButton /> */}
      <SortButton fields={["createdAt"]} />
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};

export default RindukList;
