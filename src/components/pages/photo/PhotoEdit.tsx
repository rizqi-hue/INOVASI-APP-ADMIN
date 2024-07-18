import { Grid } from "@mui/material";
import { useState } from "react"
import {
  Edit,
  ImageInput,
  FormTab,
  ImageField,
  LinearProgress,
  ListButton,
  SelectInput,
  TabbedForm,
  TextInput,
  Toolbar,
  useGetIdentity,
  useGetList,
  useRecordContext,
} from "react-admin";

// import { QRCodeSVG } from "qrcode.react";
import Poster from "./Poster";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.title) {
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

const PostEditActions = () => (
  <Toolbar>
    <ListButton />
  </Toolbar>
);

const UseGet = (filterValues: any) => {
  const { data: referensi } = useGetList("photocategory", {
    pagination: { perPage: 200, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues },
  });

  return {
    photocategory: referensi,
  };
};

const BlogEdit = (props: any) => {
  const { identity } = useGetIdentity();
  const [selectedLang, setSelectedLang] = useState("");

  const onChangeLang = async (v: any) => {
    setSelectedLang(v.target.value);
  };

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab label="Foto" sx={{ maxWidth: "40em" }}>
          <div className="mb-1">
            <Poster />
          </div>
          <ImageInput
            source="imageupdate"
            label="Pilih foto yang Sesuai"

            maxSize={20000000}
            placeholder={
              <p>Letakan foto disini, gambar harus kurang dari 20 MB</p>
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
              <TextInput
                source="title"
                label="Nama Foto"
                isRequired
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
              <PilihPhotoCategory selectedLang={selectedLang} />
            </Grid>
          </Grid>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

const PilihPhotoCategory = (props: { selectedLang: string }) => {
  const record = useRecordContext();
  const { photocategory } = UseGet({ lang: props.selectedLang || record.lang });
  return (
    <SelectInput
      source="photo_category"
      label="Pilih Jenis"
      choices={photocategory || [{ id: "", title: "Pilih bahasa terlebih dahulu" }]}
      optionText="title"
      optionValue="id"
      fullWidth
      isRequired
    // onChange={(v) => onChangeLang(v)}
    />
  );
};

export default BlogEdit;
