import { Grid } from "@mui/material";

import {
  Edit, FormTab,
  ImageField, ImageInput, LinearProgress,
  ListButton, SelectInput, TabbedForm,
  TextInput,
  Toolbar, useGetIdentity,
  useGetList,
  useRecordContext
} from "react-admin";


// import { QRCodeSVG } from "qrcode.react";
import { RichTextInput } from "ra-input-rich-text";
import { useState } from "react";
import Poster from "./Poster";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.title) {
    errors.title = "ra.validation.required";
  }

  if (!values.bisnis) {
    errors.bisnis = "ra.validation.required";
  }

  if (!values.status) {
    errors.status = "ra.validation.required";
  }

  if (!values.lang) {
    errors.lang = "ra.validation.required";
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


const UseGetBussines = (filterValues: any) => {
  const { data: referensi } = useGetList("admin/bussines", {
    pagination: { perPage: 200, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues },
  });

  return {
    bussines: referensi,
  };
};

const UseGetBussinesCategory = (filterValues: any) => {
  const { data: referensi } = useGetList("admin/bussinescategory", {
    pagination: { perPage: 200, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues },
  });

  return {
    bussinescategory: referensi,
  };
};


const BussinesDetailEdit = (props: any) => {
  const { identity } = useGetIdentity();
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedBussines, setSelectedBussines] = useState("");

  const onChangeLang = async (v: any) => {
    setSelectedLang(v.target.value);
  };

  const onChangeBussines = async (v: any) => {
    setSelectedBussines(v.target.value);
  };

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <div className="mb-1">
            <Poster />
          </div>
          <ImageInput
            source="imageupdate"
            label="Pilih Gambar yang Sesuai"

            maxSize={20000000}
            placeholder={
              <p>Letakan Gambar Disini, Gambar harus kurang dari 20 MB</p>
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
              <TextInput source="Title" label="Judul" isRequired fullWidth />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput source="content" label="Deskripsi" fullWidth multiline rows={5} />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
              <PilihJenisBussines selectedLang={selectedLang} onChange={(v: any) => onChangeBussines(v)} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PilihJenisBussinesCategory selectedLang={selectedLang} selectedBussines={selectedBussines} />
            </Grid>
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
          </Grid>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

const PilihJenisBussines = (props: { selectedLang: string, onChange: any }) => {
  const record = useRecordContext();
  const { bussines } = UseGetBussines({ lang: props.selectedLang || record.lang });

  return (
    <SelectInput
      source="bisnis"
      label="Pilih Jenis"
      choices={bussines || [{ id: "", title: "Pilih bahasa terlebih dahulu" }]}
      optionText="title"
      optionValue="id"
      fullWidth
      isRequired
      onChange={props.onChange}
    />
  );
};

const PilihJenisBussinesCategory = (props: { selectedLang: string, selectedBussines: string }) => {
  const record = useRecordContext();
  const { bussinescategory } = UseGetBussinesCategory({ lang: props.selectedLang || record.lang, bisnis: props.selectedBussines || record.bisnis });
  return (
    <SelectInput
      source="bisnis_category"
      label="Jenis Bisnis Kategori"
      choices={bussinescategory || [{ id: "", title: "Pilih bahasa terlebih dahulu" }]}
      optionText="title"
      optionValue="id"
      fullWidth
    />
  );
};

export default BussinesDetailEdit;
