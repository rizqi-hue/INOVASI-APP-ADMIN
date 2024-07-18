import { Grid } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import {
  Create, DateInput, FormTab, ImageField, ImageInput, Labeled, LinearProgress, SelectInput, TabbedForm, TextInput, useCreate, useGetIdentity, useNotify, useRedirect
} from "react-admin";

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

  if (!values.content) {
    errors.content = "ra.validation.required";
  }

  if (!values.type) {
    errors.type = "ra.validation.required";
  }

  if (!values.lang) {
    errors.lang = "ra.validation.required";
  }

  if (!values.category) {
    errors.category = "ra.validation.required";
  }

  return errors;
};

const type = [
  { id: "Dalam Pengerjaan", name: "Dalam Pengerjaan" },
  { id: "Selesai Pengerjaan", name: "Selesai Pengerjaan" },
];

const status = [
  { id: "Draft", name: "Draft" },
  { id: "Publish", name: "Publish" },
];

const lang = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
];

const ProjectCreate = (props: any) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;


  const handleSubmit = (data: any) => {

    let _data = {}

    _data = {
      title: data.title,
      status: data.status,
      content: data.content,
      type: data.type,
      lang: data.lang,
      category: data.category,
      start_date: data.start_date,
      end_date: data.end_date,
      client: data.client,
    }

    let form_data = new FormData();
    if (data.image) {
      for (let key in data) {
        if (key === "image") {
          data.image.map((value: any) => {
            form_data.append("image", value.rawFile);
          })
        } else {
          form_data.append(key, data[key]);
        }
      }

      _data = form_data;
    }


    create(
      "projects",
      {
        data: _data
      },
      {
        onSuccess: () => {
          notify("Success", {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            type: "info",
          });
          redirect("/projects");
        },
        onError: (error: any) => {
          notify(error.message, {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            type: "error",
          });
        },
      }
    );

  };

  return (
    <Create>
      <TabbedForm onSubmit={handleSubmit} validate={validateForm}>
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <ImageInput
            source="image"
            label="Pilih Gambar yang Sesuai"
            multiple
            maxSize={20000000}
            placeholder={
              <p>Letakan Gambar Disini, Gambar harus kurang dari 20 MB</p>
            }>
            <ImageField source="src" title="title" />
          </ImageInput>

        </FormTab>
        <FormTab
          label="resources.products.tabs.details"
          path="details"
          sx={{ maxWidth: "40em" }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <Labeled label="Judul / Nama Project" fullWidth>
                <TextInput source="Title" label="Judul" isRequired fullWidth />
              </Labeled>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Labeled label="Kategori / Jenis Project" fullWidth>
                <TextInput
                  source="category"
                  label="Kategori"
                  isRequired
                  fullWidth
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Labeled label="Klien" fullWidth>
                <TextInput
                  source="client"
                  label="Klien"
                  isRequired
                  fullWidth
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Labeled label="Tanggal Mulai Project" fullWidth>
                <DateInput
                  source="start_date"
                  label="Tanggal Mulai Project"
                  isRequired
                  fullWidth
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Labeled label="Tanggal Selesai Project" fullWidth>
                <DateInput
                  source="end_date"
                  label="Tanggal Selesai Project"
                  isRequired
                  fullWidth
                />
              </Labeled>
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="type"
                label="Status Pengerjaan"
                choices={type}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
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
                source="lang"
                label="Bahasa"
                choices={lang}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
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
    </Create>
  );
};

export default ProjectCreate;
