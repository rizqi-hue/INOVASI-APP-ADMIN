import { Box, Chip, Theme, useMediaQuery } from "@mui/material";
import {
  BulkDeleteButton,
  CreateButton,
  ExportButton,
  FilterContext,
  FilterForm,
  InputProps,
  ListBase,
  Pagination,
  SelectInput,
  SortButton,
  TextInput,
  Title,
  TopToolbar,
  useListContext,
  useTranslate
} from "react-admin";
import Aside from "./Aside";
import ImageList from "./GridList2";

const lang = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
];

const KategoriBisnisList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  return (
    <div>
      <ListBase perPage={24} sort={{ field: "createdAt", order: "DESC" }}>
        <Title defaultTitle={"Blog"} />

        <FilterContext.Provider value={productFilters}>
          <ListActions isSmall={isSmall} />
          {/* {isSmall && ( */}
          <Box m={1}>
            <FilterForm />
          </Box>
          {/* )} */}
        </FilterContext.Provider>

        <div className="mx-3 md:mx-0">
          <Box display="flex">
            <Aside />
            <Box width={isSmall ? "auto" : "calc(100% - 16em)"}>
              <ImageList />
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

export default KategoriBisnisList;
