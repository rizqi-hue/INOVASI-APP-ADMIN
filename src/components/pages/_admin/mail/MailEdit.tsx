import { Grid } from "@mui/material";
import {
  Edit, FormTab, LinearProgress,
  ListButton,
  SelectInput, TabbedForm,
  TextInput,
  Toolbar, useGetIdentity, useRecordContext
} from "react-admin";


// import { QRCodeSVG } from "qrcode.react";
import { RichTextInput } from "ra-input-rich-text";
import { useEffect } from "react";
// import api from "../../../services/axios";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.Name) {
    errors.Name = "ra.validation.required";
  }

  if (!values.Status) {
    errors.Status = "ra.validation.required";
  }

  if (!values.Message) {
    errors.Message = "ra.validation.required";
  }

  if (!values.PhoneNumber) {
    errors.PhoneNumber = "ra.validation.required";
  }

  return errors;
};

const status = [
  { id: "Baru", name: "Baru" },
  { id: "Dibaca", name: "Dibaca" },
  { id: "Belum Diproses", name: "Belum Diproses" },
  { id: "Dalam Proses", name: "Dalam Proses" },
  { id: "Selesai", name: "Selesai" },
];

const PostEditActions = () => (
  <Toolbar>
    <ListButton />
  </Toolbar>
);

const MyForm = (props: any) => {
  const record = useRecordContext(props);

  useEffect(() => {

    if (record.status === 'Baru') {
      Object.assign(record, { status: 'Dibaca' })
      // api.put(`/mail/${record.id}`, record);
    }

  }, [record])

  return <></>
};

const BlogEdit = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab
          label="resources.products.tabs.details"
          sx={{ maxWidth: "40em" }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput source="Name" label="Nama" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextInput source="PhoneNumber" label="No HP" isRequired fullWidth />
            </Grid>

          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <RichTextInput source="Message" label="" />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="Status"
                label="Status"
                choices={status}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
              />
            </Grid>
          </Grid>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default BlogEdit;
