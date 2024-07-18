import { Box, Typography } from "@mui/material";
import {
  Edit,
  SimpleForm,
  TextInput,
  useTranslate
} from "react-admin";
import Poster from "./Poster";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.firstName) {
    errors.firstName = "ra.validation.required";
  }

  if (!values.lastName) {
    errors.firstName = "ra.validation.required";
  }

  if (!values.email) {
    errors.email = "ra.validation.required";
  }

  if (values.new_password && values.new_password !== values.new_confirm_password) {
    errors.confirm_password = "resources.customers.errors.password_mismatch";
  }
  return errors;
};

const role = [
  { id: "user", name: "User" },
  { id: "admin", name: "Admin" },
];

const PelamarEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm
        defaultValues={{}}
        sx={{ maxWidth: 500 }}
        validate={validateForm}
      >
        <SectionTitle label="Data Pelamar" />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="member_detail.email" label="Email" isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="member_detail.firstName" label="Nama Depan" isRequired fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="member_detail.lastName" label="Nama Belakang" isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="member_detail.phone" label="No Telepon" isRequired fullWidth />
          </Box>
        </Box>
        <SectionTitle label="CV" />
        <Poster />
      </SimpleForm>
    </Edit>
  );
};

const SectionTitle = ({ label }: { label: string }) => {
  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};


const SectionTitleDesc = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <p className="text-xs text-gray-400">
      {label}
    </p>
  );
};

export default PelamarEdit;
