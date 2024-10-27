import { Box, Chip, Theme, useMediaQuery } from "@mui/material";
import jwtDecode from "jwt-decode";
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
  SortButton,
  TextField,
  TextInput,
  Title,
  TopToolbar,
  useListContext,
  usePermissions,
  useRecordContext,
  useTranslate
} from "react-admin";
import { getData } from "../../../../../utils/storage";
import { ContextMenu } from "./ContextMenu";

const lang = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
];

const InovationList = () => {
  const { permissions } = usePermissions();

  const token = getData("AccessToken")
  let filter = {}
  let decoded = {
    "sub": "",
    "role": [],
    "iat": 0,
    "exp": 0,
    "type": ""
  };

  if (token) {
    decoded = jwtDecode(token);
  }

  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));


  if (permissions) {
    if (!permissions.includes("Admin")) {
      Object.assign(filter, { MadeBy: parseInt(decoded.sub.toString()) })
    }
  }

  return (
    <div>
      <ListBase filterDefaultValues={filter} perPage={24} filter={{ Type: "PEMERINTAH DAERAH" }} sort={{ field: "createdAt", order: "DESC" }}>
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
            {/* <Aside /> */}
            {/* <Box width={isSmall ? "auto" : "calc(100% - 16em)"}> */}
            <Box>
              {/* <Box > */}
              {/* <GridList /> */}
              <Datagrid optimized >
                <TextField source="Name" label="Nama Inovasi" />
                <TextField source="DataStep.Name" label="Tahapan Inovasi" />
                <TextField source="DataMainAffair.Name" label="Urusan Pemerintahan Utama" />
                <TextField source="DataMadeBy.FullName" label="Perangkat Daerah / Instansi / BUMD" />
                <DateField source="TrialTime" label="Waktu Uji Coba" />
                <DeploymentTimeField label="Waktu Penerapan" />
                <Score label="Skor Kematangan" />
                <TextField source="Status" label="Status" />
                <ContextMenu label="Action" />
              </Datagrid>
              <Pagination rowsPerPageOptions={[24, 48, 72]} />
            </Box>
          </Box>
        </div>
      </ListBase>
    </div>
  );
};

const DeploymentTimeField = (props: { label: string }) => {
  const record = useRecordContext();
  const yearNow = new Date().getFullYear()
  const year = new Date(record.DeploymentTime).getFullYear()
  let className = { backgroundColor: '#EB5353', padding: "10px", borderRadius: "30px", color: "white" }

  if (((yearNow - year) <= 2) && ((yearNow - year) > 0)) {
    className = { backgroundColor: '#36AE7C', padding: "10px", borderRadius: "30px", color: "white" }
  }

  return (
    <span style={className}>
      {new Intl.DateTimeFormat('en-US').format(new Date(record.DeploymentTime))}
    </span>
  );
};

const Score = (props: { label: string }) => {
  const record = useRecordContext();

  let score = 0;
  if (record.InovationIndicator) {
    record.InovationIndicator.map((value: any) => {
      if (value.DataIndicatorParameter && value.DataInovationFile.length <= 0) {
        score += value.DataIndicatorParameter.Value
      }
    })
  }

  return (
    <span >
      {score > 0 ? score : ""}
    </span>
  );
};

const QuickFilter = ({ label }: InputProps) => {
  const translate = useTranslate();
  return <Chip sx={{ mb: 1 }} label={translate(label as string)} />;
};

export const productFilters = [
  // <div className="block md:hidden">
  // </div>,
  <TextInput source="Name" label="Cari berdasarkan nama inovasi" alwaysOn />,
  // <SelectInput
  //   source="lang"
  //   label="Bahasa"
  //   choices={lang}
  //   optionText="name"
  //   optionValue="id"
  //   alwaysOn
  // />,
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

export default InovationList;
