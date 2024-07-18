import { Box, Typography, useMediaQuery, Theme, } from "@mui/material";
import {
  Datagrid,
  DateField,
  FilterContext,
  ListBase,
  Pagination,
  RichTextField,
  Show,
  SimpleShowLayout,
  TextField,
  Title,
  useRecordContext
} from "react-admin";
import { useParams } from "react-router";
import Aside from "./Aside";
import { ContextMenu } from "./ContextMenu";
import { UploadDataPendukung } from "./UploadDataPendukung";
import { PilihParameter } from "./PilihParameter";
import { InovationFile } from "./InovationFile";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.Name) {
    errors.Name = "ra.validation.required";
  }

  return errors;
};

const InovationShow = (props: any) => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  const { id } = useParams<{ id: string }>();
  return (
    <Show {...props}>
      <SimpleShowLayout
        sx={{
          marginBottom: "20px"
        }}
      >
        <TextField source="Name" />
        <RichTextField source="Description" />
      </SimpleShowLayout>

      <ListBase resource="inovationindicator" perPage={24} filter={{ Type: "PEMERINTAH DAERAH", Inovation: id }} sort={{ field: "createdAt", order: "DESC" }}>
        <Title defaultTitle={"Inovasi"} />
        <div className="mx-3 md:mx-0">
          <Box >
            {/* <GridList /> */}
            <Datagrid bulkActionButtons={false} optimized >
              <TextField source="DataIndicator.Indicator" label="Indikator" />
              <TextField source="DataIndicator.Explanation" label="Keterangan" />
              <TextField source="Information" label="Informasi" />
              <BobotField label="Bobot" />
              <PilihParameter label="Pilih Parameter" />
              <InovationFile label="Data Pendukung" />
              <TextField source="DataIndicator.SupportingDataType" label="Jenis File" />
            </Datagrid>
            <Pagination rowsPerPageOptions={[24, 48, 72]} />
          </Box>
        </div>
      </ListBase>
    </Show>
  );
};

const BobotField = (props: { label: string }) => {
  const record = useRecordContext();

  if (!record.DataIndicatorParameter || record.DataInovationFile.length <= 0) {
    return (
      <span></span>
    )
  }

  return (
    <span >
      {record.DataIndicatorParameter.Value}
    </span>
  );
};



const SectionTitle = ({ label }: { label: string }) => {
  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};


const SectionTitleDesc = ({ label }: { label: string }) => {

  return (
    <p className="text-xs text-gray-400">
      {label}
    </p>
  );
};

export default InovationShow;
