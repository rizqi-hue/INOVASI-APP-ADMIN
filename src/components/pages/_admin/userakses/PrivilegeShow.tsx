import { ExpandMoreOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import {
  RichTextField,
  Show,
  SimpleShowLayout,
  TextField,
  useCreate,
  useDelete,
  useGetList,
  useNotify,
  usePermissions,
  useRedirect
} from "react-admin";
import { useParams } from "react-router";
import { getData } from "../../../../utils/storage";

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
  const token = getData("AccessToken")

  let decoded = {
    "sub": "",
    "privilege": [],
    "role": [],
    "iat": 0,
    "exp": 0,
    "type": ""
  };

  if (token) {
    decoded = jwtDecode(token);
  }
  const { isLoading: isLoadingPermission, permissions } = usePermissions();
  const [create, { isLoading, error }] = useCreate();
  const [deleteOne] = useDelete();
  const redirect = useRedirect();
  const notify = useNotify();
  const { id } = useParams<{ id: string }>();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangePanel =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { data: menus, total, isLoading: isLoadingMenu, error: errorMenu, refetch } = useGetList(
    'menu',
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'id', order: 'asc' },
      filter: { "PrivilegeId": id }
    },
  );

  const handleChange_CheckBox = (checked: boolean, authorityId: number, roleId: number) => {
    if (!checked && authorityId > 0) {
      deleteOne(
        'authority',
        { id: authorityId },
        {
          onSuccess: () => {
            refetch()
          }
        }
      );
    } else {
      create(
        'authority',
        {
          data: {
            PrivilegeId: id,
            RoleId: roleId
          }
        },
        {
          onSuccess: () => {
            refetch()
          }
        }
      );
    }
  };

  return (
    <Show {...props}>
      <SimpleShowLayout
        sx={{
          marginBottom: "20px"
        }}
      >
        <TextField source="Name" />
        <RichTextField source="Description" />
      </SimpleShowLayout>

      {
        menus &&
        menus.map(menu => {
          if (!menu.IsMenu) {
            return (
              <Accordion
                key={`menu-${menu.Code}`}
                sx={{
                  width: '100%'
                }}
                expanded={expanded === menu.Name} onChange={handleChangePanel(menu.Name)}>
                <AccordionSummary
                  key={`menu-summary-${menu.Code}`}
                  expandIcon={<ExpandMoreOutlined />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '33%', fontSize: "14px", flexShrink: 0 }}>
                    {menu.Name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    marginTop: '-20px'
                  }}
                >
                  {
                    menu.Role && menu.Role.map((role: any) => {
                      let check = false;
                      let id: number = 0;
                      if (role.Authority.length > 0) {
                        check = true;
                        id = role.Authority[0].id
                      }

                      return (
                        <FormControlLabel
                          key={`role-${role.Name}`}
                          label={<span style={{ fontSize: "14px" }}>{role.Description}</span>}
                          control={<Checkbox checked={check} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange_CheckBox(event.target.checked, id, role.id)} />}
                        />
                      )
                    })
                  }
                </AccordionDetails>
              </Accordion>
            )
          }
        })
      }

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
