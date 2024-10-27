import { Box, Typography } from "@mui/material";
import {
  Create,
  SimpleForm,
  TextInput
} from "react-admin";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.Name) {
    errors.Name = "ra.validation.required";
  }

  return errors;
};

const PrivilegeCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm
        defaultValues={{}}
        sx={{ maxWidth: 500 }}
        validate={validateForm}
      >
        <SectionTitle label="Buat hak akses baru" />
        <Box height={20} />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="Name" label="Nama Akses" isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="Description" label="Penjelasan (Optional)" isRequired fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
};

const SectionTitle = ({ label }: { label: string }) => {
  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};


export default PrivilegeCreate;
