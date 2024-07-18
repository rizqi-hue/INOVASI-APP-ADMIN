import { Grid, Typography } from "@mui/material";

import {
  DateTimeInput,
  Edit, FormTab,
  ImageField, ImageInput,
  LinearProgress,
  ListButton,
  SelectInput, TabbedForm,
  TextInput,
  Toolbar, useGetIdentity, useGetList, useRecordContext
} from "react-admin";

import Poster from "./Poster";
import ShowPdf from "./ShowPdf";
import { useState } from "react";
import { RichTextInput } from "ra-input-rich-text";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.Title) {
    errors.Title = "ra.validation.required";
  }

  if (!values.Status) {
    errors.Status = "ra.validation.required";
  }



  return errors;
};

const type = [
  { id: "Home Slider", name: "Home Slider" },
  { id: "About Slider", name: "About Slider" },
];

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

const UseGetProvince = (filterValues: any) => {

  const { data: referensi } = useGetList("province", {
    pagination: { perPage: 50, page: 1 },
    sort: { field: "Name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    province: referensi,
  };
};

const UseGetRegency = (filterValues: any) => {

  const { data: referensi } = useGetList("regency", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "Name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    regency: referensi,
  };
};

const UseGetSubdistrict = (filterValues: any) => {

  const { data: referensi } = useGetList("subdistrict", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "Name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    subdistrict: referensi,
  };
};

const UseGetVillage = (filterValues: any) => {

  const { data: referensi } = useGetList("village", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "Name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    village: referensi,
  };
};

const AgendaEdit = (props: any) => {
  const { identity } = useGetIdentity();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedSubdistric, setSelectedSubdistrict] = useState("");

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <SectionTitle label="Upload Gambar" />
          <div className="mb-1">
            <Poster />
          </div>
          <ImageInput
            source="Imageupdate"
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
        <FormTab path="file" label="File" sx={{ maxWidth: "40em" }}>
          <div className="mb-1">
            <ShowPdf />
          </div>
          <SectionTitle label="Upload File" />
          <ImageInput
            source="Fileupdate"
            label="Pilih file yang sesuai"
            maxSize={20000000}
            accept="application/pdf"
            placeholder={
              <p>Letakan file disini, file harus kurang dari 20 MB</p>
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
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Title"
                label="Judul"
                isRequired
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <RichTextInput
                source="Content"
                label="Deskripsi"
              />
            </Grid>
          </Grid>
          <SectionTitle label="(Optional) Kegiatan diselenggarakan pada : " />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <DateTimeInput
                variant="filled"
                label="Diselenggarakan pada :"
                source="StartEventDate"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimeInput
                variant="filled"
                label="Sampai dengan"
                source="EndEventDate"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Location"
                label="Lokasi atau tempat kegiatan"
                fullWidth
              />
            </Grid>
          </Grid>
          <SectionTitle label="(Optional) Alamat Lengkap" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Address" label="Jalan :" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ marginTop: "-6px" }}>
              <ProvinceSelect
                value={selectedProvince}
                onChange={(v: any) => {
                  setSelectedProvince(v.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ marginTop: "-6px" }}>
              <RegencySelect
                value={selectedProvince}
                onChange={(v: any) => {
                  setSelectedRegency(v.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ marginTop: "-6px" }}>
              <SubdistrictSelect
                value={selectedRegency}
                onChange={(v: any) => {
                  setSelectedSubdistrict(v.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ marginTop: "-6px" }}>
              <VillageSelect
                value={selectedSubdistric}
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <SelectInput
                variant="filled"
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


const ProvinceSelect = (props: { value: string, onChange: any }) => {
  const record = useRecordContext();
  const { province } = UseGetProvince({});

  return (
    <SelectInput
      variant="filled"
      size="small"
      source="ProvinceId"
      label="Provinsi"
      choices={province || [{ id: "", title: "" }]}
      optionText="Name"
      optionValue="id"
      fullWidth
      isRequired
      defaultValue={record.ProvinceId}
      onChange={props.onChange}
    />
  );
};

const RegencySelect = (props: { value: string, onChange: any }) => {
  const record = useRecordContext();
  const { regency } = UseGetRegency({ ProvinceId: props.value || record.ProvinceId });

  return (
    <SelectInput
      variant="filled"
      size="small"
      source="RegencyId"
      label="Kota / Kabupaten"
      choices={regency || [{ id: "", title: "" }]}
      optionText="Name"
      optionValue="id"
      fullWidth
      isRequired
      defaultValue={record.RegencyId}
      onChange={props.onChange}
    />
  );
};

const SubdistrictSelect = (props: { value: string, onChange: any }) => {
  const record = useRecordContext();
  const { subdistrict } = UseGetSubdistrict({ RegencyId: props.value || record.RegencyId });

  return (
    <SelectInput
      variant="filled"
      size="small"
      label="Kecamatan"
      source="SubdistrictId"
      choices={subdistrict || [{ id: "", title: "" }]}
      optionText="Name"
      optionValue="id"
      fullWidth
      isRequired
      defaultValue={record.SubdistrictId}
      onChange={props.onChange}
    />
  );
};

const VillageSelect = (props: { value: string }) => {
  const record = useRecordContext();
  const { village } = UseGetVillage({ SubdistrictId: props.value || record.SubdistrictId });

  return (
    <SelectInput
      variant="filled"
      size="small"
      label="Desa"
      source="VillageId"
      choices={village || [{ id: "", title: "" }]}
      optionText="Name"
      optionValue="id"
      fullWidth
      isRequired
      defaultValue={record.VillageId}
    />
  );
};

const SectionTitle = ({ label }: { label: string }) => {

  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};

export default AgendaEdit;
