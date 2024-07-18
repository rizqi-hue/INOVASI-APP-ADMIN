import { Grid } from "@mui/material";

import {
  Edit, FormTab, LinearProgress,
  ListButton, SelectInput,
  TabbedForm, Toolbar,
  useGetIdentity,
  useGetList
} from "react-admin";

// import { QRCodeSVG } from "qrcode.react";
import { RichTextInput } from "ra-input-rich-text";
import { useState } from "react";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

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
  const { data: referensi } = useGetList("referensi", {
    pagination: { perPage: 1, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues, ref_group: 'VM' },
  });

  return {
    referensi: referensi,
  };
};


const VisiMisiEdit = (props: any) => {
  const { identity } = useGetIdentity();
  const [selectedLang, setSelectedLang] = useState("");
  const { referensi } = UseGet({ lang: selectedLang || "a" });

  const onChangeLang = async (v: any) => {
    console.log(v.target.value)
    setSelectedLang(v.target.value)
  }

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab
          label="resources.products.tabs.details"
          sx={{ maxWidth: "40em" }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <SelectInput
                source="referensi"
                label="Pilih Jenis Visi / Misi"
                choices={referensi || [{ id: "", content: "Pilih bahasa terlebih dahulu" }]}
                optionText="content"
                optionValue="id"
                fullWidth
                isRequired
              // onChange={(v) => onChangeLang(v)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <RichTextInput source="content" label="" />
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

export default VisiMisiEdit;
