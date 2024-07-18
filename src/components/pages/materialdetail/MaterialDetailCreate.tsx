import { Grid } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import { useState } from "react";
import { Create, FormTab, ImageField, ImageInput, LinearProgress, SelectInput, TabbedForm, TextInput, useGetIdentity, useGetList } from "react-admin";

export const validateForm = (values: Record<string, any>): Record<string, any> => {
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
  const { data: material } = useGetList("material", {
    pagination: { perPage: 200, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues },
  });

  return {
    material: material,
  };
};

const MaterialDetailCreate = (props: any) => {
  const { identity } = useGetIdentity();
  const [selectedLang, setSelectedLang] = useState("");
  const { material } = UseGet({ lang: selectedLang || "a" });

  const onChangeLang = async (v: any) => {
    setSelectedLang(v.target.value);
  };

  if (!identity) return <LinearProgress />;

  return (
    <Create>
      <TabbedForm validate={validateForm}>
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <ImageInput
            source="image"
            label="Pilih Gambar yang Sesuai"
            maxSize={20000000}
            placeholder={<p>Letakan Gambar Disini, Gambar harus kurang dari 20 MB</p>}
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </FormTab>
        <FormTab label="resources.products.tabs.details" path="details" sx={{ maxWidth: "40em" }}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput source="Title" label="Judul" isRequired fullWidth />
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
            <Grid item xs={12} sm={4}>
              {/* <ReferenceInput label="Jenis Material Supply" source="kategoribisnis" reference="material" fullWidth page={1} perPage={25}  sort={{ field: "title", order: "DESC" }}>
                <SelectInput label="Jenis Material Supply" optionText="title" fullWidth />
              </ReferenceInput> */}
              <SelectInput
                source="kategoribisnis"
                label="Pilih Jenis Material Supply"
                choices={material || [{ id: "", title: "Pilih bahasa terlebih dahulu" }]}
                optionText="title"
                optionValue="id"
                fullWidth
                isRequired
              // onChange={(v) => onChangeLang(v)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput source="status" label="Status" choices={status} optionText="name" optionValue="id" fullWidth isRequired />
            </Grid>
          </Grid>
        </FormTab>
        <FormTab label="resources.products.tabs.description" path="description" sx={{ maxWidth: "40em" }}>
          <RichTextInput source="content" label="" />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default MaterialDetailCreate;
