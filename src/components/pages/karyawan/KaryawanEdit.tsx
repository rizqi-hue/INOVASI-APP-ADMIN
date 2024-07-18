import { Box, Grid } from "@mui/material";
import { useState } from "react";

import {
  Edit,
  ImageInput,
  FormTab,
  ImageField,
  LinearProgress,
  ListButton,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TabbedForm,
  TextInput,
  Toolbar,
  useCreate,
  useGetIdentity,
  useRecordContext,
  useGetList,
} from "react-admin";

import { useNavigate } from "react-router-dom";

// import { QRCodeSVG } from "qrcode.react";
import { RichTextInput } from "ra-input-rich-text";
import Poster from "./Poster";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.nama) {
    errors.nama = "ra.validation.required";
  }

  if (!values.status) {
    errors.status = "ra.validation.required";
  }

  if (!values.alamat) {
    errors.alamat = "ra.validation.required";
  }

  if (!values.no_hp) {
    errors.no_hp = "ra.validation.required";
  }

  if (!values.lang) {
    errors.lang = "ra.validation.required";
  }

  if (!values.divisi) {
    errors.divisi = "ra.validation.required";
  }

  return errors;
};

const status = [
  { id: "Draft", name: "Draft" },
  { id: "Publish", name: "Publish" },
];

const lang = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
];

const PostEditActions = () => (
  <Toolbar>
    <ListButton />
  </Toolbar>
);


const UseGetDivisi = (filterValues: any) => {
  const { data: referensi } = useGetList("divisi", {
    pagination: { perPage: 200, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues },
  });

  return {
    divisi: referensi,
  };
};

const KaryawanEdit = (props: any) => {
  const { identity } = useGetIdentity();
  const [selectedLang, setSelectedLang] = useState("");

  const onChangeLang = async (v: any) => {
    setSelectedLang(v.target.value);
  };

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab label="Photo" sx={{ maxWidth: "40em" }}>
          <div className="mb-1">
            <Poster />
          </div>
          <ImageInput
            source="imageupdate"
            label="Pilih photo yang sesuai"

            maxSize={20000000}
            placeholder={
              <p>Letakan photo disini, photo harus kurang dari 20 MB</p>
            }
          >
            <ImageField
              source="src"
              title="title"
            />
          </ImageInput>
        </FormTab>
        <FormTab
          label="resources.products.tabs.details"
          path="details"
          sx={{ maxWidth: "40em" }}
        >

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="status"
                label="Status"
                choices={status}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="lang"
                label="Bahasa"
                choices={lang}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
                onChange={(v) => onChangeLang(v)}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput source="nama" label="Nama lengkap" isRequired fullWidth />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput source="no_hp" label="No Handphone" isRequired fullWidth />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <PilihJenisDivisi selectedLang={selectedLang} />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput multiline rows={5} fullWidth label="Catatan" source="prakata" />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextInput multiline rows={5} fullWidth source="alamat" label="Alamat" />
            </Grid>
          </Grid>

        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

const PilihJenisDivisi = (props: { selectedLang: string }) => {
  const record = useRecordContext();
  const { divisi } = UseGetDivisi({ lang: props.selectedLang || record.lang });
  return (
    <SelectInput
      source="divisi"
      label="Pilih Divisi"
      choices={divisi || [{ id: "", title: "Pilih bahasa terlebih dahulu" }]}
      optionText="title"
      optionValue="id"
      fullWidth
      isRequired
    />
  );
};

export default KaryawanEdit;
