import { Grid } from "@mui/material";

import {
  Edit, FormTab, ImageField, ImageInput, LinearProgress, SelectInput,
  TabbedForm, TextInput, useGetIdentity,
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

  if (!values.status) {
    errors.status = "ra.validation.required";
  }

  if (!values.title) {
    errors.content = "ra.validation.required";
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
  const { data: referensi } = useGetList("admin/referensi", {
    pagination: { perPage: 1, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues, ref_group: 'VM' },
  });

  return {
    referensi: referensi,
  };
};


const LogoEdit = (props: any) => {
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
      </TabbedForm>
    </Edit>
  );
};

export default LogoEdit;
