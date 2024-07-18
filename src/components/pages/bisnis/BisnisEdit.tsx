import { Grid } from "@mui/material";

import {
  Edit, FormTab,
  ImageField, ImageInput, LinearProgress,
  ListButton, SelectInput, TabbedForm,
  TextInput,
  Toolbar, useGetIdentity,
  useGetList
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

  if (!values.kategoribisnis) {
    errors.title = "ra.validation.required";
  }

  if (!values.status) {
    errors.status = "ra.validation.required";
  }

  if (!values.content) {
    errors.content = "ra.validation.required";
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


const UseGet = (filterValues: any) => {
  const { data: referensi } = useGetList("kategoribisnis", {
    pagination: { perPage: 200, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues },
  });

  return {
    kategoribisnis: referensi,
  };
};


const BlogEdit = (props: any) => {
  const { identity } = useGetIdentity();
  const [selectedLang, setSelectedLang] = useState("");
  const { kategoribisnis } = UseGet({ lang: selectedLang || "a" });

  const onChangeLang = async (v: any) => {
    setSelectedLang(v.target.value);
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
            <Grid item xs={12} sm={8}>
              <TextInput source="Title" label="Judul" isRequired fullWidth />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
              {/* <ReferenceInput label="Jenis Contracting" source="kategoribisnis" reference="kategoribisnis" fullWidth 
                  page={1}
                  perPage={25}
                  
                  sort={
                    { field: "title", order: 'ASC' }
                  }
                >
                  <SelectInput label="Jenis Contracting" optionText="title" fullWidth />
              </ReferenceInput> */}
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
                source="kategoribisnis"
                label="Pilih Jenis"
                choices={kategoribisnis || [{ id: "", title: "Pilih bahasa terlebih dahulu" }]}
                optionText="title"
                optionValue="id"
                fullWidth
                isRequired
              // onChange={(v) => onChangeLang(v)}
              />
            </Grid>
          </Grid>
        </FormTab>
        <FormTab
          label="resources.products.tabs.description"
          path="description"
          sx={{ maxWidth: "40em" }}
        >
          <RichTextInput source="content" label="" />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default BlogEdit;
