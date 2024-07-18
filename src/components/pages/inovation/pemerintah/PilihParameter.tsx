import { Edit, UploadFile } from '@mui/icons-material';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Grid, IconButton, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Create, SaveButton, SelectInput, SimpleForm, Toolbar, useCreate, useGetList, useNotify, useRecordContext, useRedirect, useRefresh, useUpdate } from 'react-admin';
import Backdrop from '@mui/material/Backdrop';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const UseGetDataIndicatorParameter = (filterValues: any) => {

  const { data: referensi } = useGetList("dataindicatorparameter", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "Ref", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    mainindicator: referensi,
  };
};

const UseGetOtherDataIndicatorParameter = (filterValues: any) => {

  const { data: referensi } = useGetList("dataindicatorparameter", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "Ref", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    otherindicator: referensi,
  };
};

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.MainIndicatorParameter) {
    errors.MainIndicatorParameter = "ra.validation.required";
  }

  return errors;
};

const ToolbarActions = () => (
  <Toolbar>
    <SaveButton label='Simpan'/>
  </Toolbar>
);

export const PilihParameter = (props: { label: string }) => {
  const redirect = useRedirect();
  const refresh = useRefresh();
  const record = useRecordContext();

  const [selectedMainIndicator, setSelectedMainIndicator] = useState("");
  const { mainindicator } = UseGetDataIndicatorParameter({ Indicator: record.Indicator });
  const { otherindicator } = UseGetOtherDataIndicatorParameter({ RefParent: selectedMainIndicator || "-", Indicator: record.Indicator });

  // redirect('/inovation/pemerintah/' + record.id);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [update] = useUpdate();
  const notify = useNotify();

  const handleSubmit = (data: any) => {

    let indicatorParemeter = data.MainIndicatorParameter
    if (data.OtherIndicatorParameter) {
      indicatorParemeter = data.OtherIndicatorParameter
    }

    update(
      "inovationindicator",
      {
        id: record.id,
        data: {
          id: record.id,
          IndicatorParameter: indicatorParemeter
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

          setOpen(false)

          refresh()
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
    <>
      <IconButton onClick={handleOpen} size={'small'}>
        <Edit fontSize={'small'} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {record.DataIndicator.Indicator}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {record.DataIndicator.Explanation}
          </DialogContentText>
          <Create>
            <SimpleForm
              toolbar={<ToolbarActions />}
              onSubmit={handleSubmit}
              validate={validateForm}
            >
              <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={12} >
                  <SelectInput
                    label="Pilih Definisi"
                    source="MainIndicatorParameter"
                    optionText="IndicatorParameter"
                    optionValue="Ref"
                    choices={mainindicator || []}
                    onChange={(v: any) => {
                      setSelectedMainIndicator(v.target.value)
                    }}
                    fullWidth
                  />
                </Grid>
                {
                  otherindicator && otherindicator.length > 0 && (
                    <Grid item xs={12} sm={12}>
                      <SelectInput
                        label="Pilih Parameter"
                        source="OtherIndicatorParameter"
                        optionText="IndicatorParameter"
                        optionValue="Ref"
                        choices={otherindicator || []}
                        fullWidth
                      />
                    </Grid>)
                }
              </Grid>
            </SimpleForm>
          </Create>
        </DialogContent>
      </Dialog>
    </>
  )
}

PilihParameter.propTypes = {
  resource: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  onAddToPlaylist: PropTypes.func,
  showLove: PropTypes.bool,
}

PilihParameter.defaultProps = {
  onAddToPlaylist: () => { },
  record: {},
  resource: 'song',
  showLove: true,
  addLabel: true,
}
