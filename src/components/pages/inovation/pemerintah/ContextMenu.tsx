import { AddBoxOutlined, Edit, EditOutlined, SendOutlined } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNotify, useRecordContext, useRedirect, useRefresh, useUpdate } from 'react-admin';

export const ContextMenu = (props: { label: string }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const redirect = useRedirect();
  const record = useRecordContext();
  const [anchorEl, setAnchorEl] = useState(null)

  // dialog
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [update, { isLoading, error }] = useUpdate();
  const notify = useNotify();
  const refresh = useRefresh();

  const options: { [index: string]: any; } = {
    lihat: {
      enabled: true,
      label: 'Edit',
      icon: <EditOutlined style={{ color: 'GrayText', marginRight: "3px" }} />,
      action: (record: any) => {
        redirect('/inovation/pemerintah/' + record.id);
      },
    },
    indikator: {
      enabled: true,
      label: 'Indikator',
      icon: <AddBoxOutlined style={{ color: 'GrayText', marginRight: "3px" }} />,
      action: (record: any) => {
        redirect('/inovation/pemerintah/' + record.id + "/show");
      },
    },
    send: {
      enabled: true,
      label: 'Kirim',
      icon: <SendOutlined style={{ color: 'GrayText', marginRight: "3px" }} />,
      action: (record: any) => {
        setOpenSendDialog(true);
      },
    },
  };

  const handleCloseSendDialog = () => {
    setOpenSendDialog(false);
  };

  const handleSubmitSendDialog = () => {
    // setOpenSendDialog(false);
    var id = record.id

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
      "inovation/pemerintah",
      {
        id: parseInt(id.toString()),
        data: {
          id: parseInt(id.toString()),
          Status: 'Submitted',
          MadeBy: record.MadeBy,
          Name: record.Name,
          UserId: record.UserId,
          Type: record.Type
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

          refresh()
          setOpenSendDialog(false)
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

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget)
    e.stopPropagation()
  }

  const handleClose = (e: any) => {
    setAnchorEl(null)
    e.stopPropagation()
  }

  const handleItemClick = (e: any) => {
    e.preventDefault()
    setAnchorEl(null)
    const key = e.target.getAttribute('value')
    options[key].action(record)
    e.stopPropagation()
  }

  const handleChangeStatus = (e: any) => {
    setSelectedStatus(e.target.value)
  }


  const open = Boolean(anchorEl)

  return (
    <span >
      {/* <LoveButton
        record={record}
        resource={resource}
        visible={config.enableFavourites && showLove}
      /> */}
      <IconButton onClick={handleClick} size={'small'}>
        <MoreVertIcon fontSize={'small'} />
      </IconButton>
      <Menu
        id={'menu' + record.id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Object.keys(options).map(
          (key) =>
            options[key].enabled && (
              <MenuItem value={key} key={key} onClick={handleItemClick} style={{ flex: 'column', gap: '3px' }}>
                {options[key].icon} {options[key].label}
              </MenuItem>
            )
        )}
      </Menu>

      <Dialog
        open={openSendDialog}
        onClose={handleCloseSendDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ubah Status Inovasi ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <Select
              fullWidth
              value={selectedStatus}
              onChange={handleChangeStatus}
              label="Pilih Status"
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Submitted">Submitted</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Returned">Returned</MenuItem>
              <MenuItem value="Publish">Publish</MenuItem>
            </Select>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSendDialog}>Tidak</Button>
          <Button onClick={handleSubmitSendDialog} autoFocus>
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}

ContextMenu.propTypes = {
  resource: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  onAddToPlaylist: PropTypes.func,
  showLove: PropTypes.bool,
}

ContextMenu.defaultProps = {
  onAddToPlaylist: () => { },
  record: {},
  resource: 'song',
  showLove: true,
  addLabel: true,
}
