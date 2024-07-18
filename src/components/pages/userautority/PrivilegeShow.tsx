import { Box, Typography } from "@mui/material";
import {
  Edit,
  PasswordInput,
  RichTextField,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate
} from "react-admin";
import { useParams } from "react-router";
import { PrivilegeCustome } from "./PrivilegeCustome";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.Name) {
    errors.Name = "ra.validation.required";
  }

  return errors;
};

const PrivilegeShow = (props: any) => {
  const [update, { isLoading, error }] = useUpdate();
  const redirect = useRedirect();
  const notify = useNotify();
  const { id } = useParams<{ id: string }>();

  const handleSumbit = (data: any) => {

    if (!id) {
      notify("Data tidak ditemukan", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        type: "error",
      });

      return
    }

    update(
      "privilege",
      {
        id: parseInt(id),
        data: {
          ...data,
          IsActive: data.IsActive ? true : false
        }
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

          redirect("/privilege")

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
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="Name" />
        <RichTextField source="Description" />
      </SimpleShowLayout>
      <PrivilegeCustome />
    </Show>
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

  return (
    <p className="text-xs text-gray-400">
      {label}
    </p>
  );
};

export default PrivilegeShow;
