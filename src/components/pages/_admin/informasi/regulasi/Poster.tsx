import { DeleteOutline } from "@mui/icons-material";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useState } from 'react';
import { Confirm, useDelete, useNotify, useRecordContext } from "react-admin";

const Poster = () => {
  const record = useRecordContext<any>();
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState();
  const notify = useNotify();

  const [remove, { isLoading }] = useDelete(
    'information/delete-image',
    { id: imageId },
    {
      onSuccess: () => {
        notify("Success", {
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          type: "info",
        });

        window.location.reload()

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

  const handleClick = (id: any) => {
    setOpen(true)
    setImageId(id)
  };
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    remove();
    setOpen(false);
  };

  if (!record) return null;
  return (
    <>
      <ImageList cols={3} rowHeight={164}>

        {
          record.Image && (
            <ImageListItem key={record.Image}>
              <div className="h-full w-full">
                <img
                  src={`${import.meta.env.VITE_BASEURL}/images/information/${record.Image}`}
                  alt=""
                  className="object-cover h-full w-full"
                  loading="lazy"
                />
              </div>

              <ImageListItemBar
                // title={record.title}
                subtitle={
                  <span onClick={() => handleClick(record.id)} className="cursor-pointer">
                    <DeleteOutline className="text-red-500 hover:text-red-700" />
                  </span>
                }

                sx={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0) 100%)",
                }}
              />
            </ImageListItem>
          )
        }

      </ImageList>
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={`Delete image #${imageId}`}
        content="Are you sure you want to delete this image ?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

export default Poster;
