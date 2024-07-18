import { useTheme, useMediaQuery, Checkbox } from "@mui/material";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import {
  useCreatePath,
  NumberField,
  useListContext,
  Toolbar,
  Button,
} from "react-admin";
import { Link } from "react-router-dom";
import { Image } from "@mui/icons-material";
import { useEffect, useState } from "react";

const GridList = () => {
  const { isLoading } = useListContext();
  return isLoading ? <LoadingGridList /> : <LoadedGridList />;
};

const useColsForWidth = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  // there are all dividers of 24, to have full rows on each page
  if (xl) return 8;
  if (lg) return 6;
  if (md) return 4;
  if (sm) return 3;
  return 2;
};

const times = (nbChildren: number, fn: (key: number) => any) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => {
  const { perPage } = useListContext();
  const cols = useColsForWidth();
  return (
    <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
      {times(perPage, (key) => (
        <ImageListItem key={key}>
          <Box bgcolor="grey.300" height="100%" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const LoadedGridList = () => {
  const { data } = useListContext();
  const cols = useColsForWidth();
  const createPath = useCreatePath();

  if (!data) return null;

  return (
    <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
      {data.map((record, key) => (
        <div key={key} className="flex flex-col">
          <div className="z-10">
            <SelectedRowAction id={record.id} />
          </div>
          <div className="-mt-10">
            <ImageListItem
              component={Link}
              key={record.id}
              to={createPath({
                resource: "blogs",
                id: record.id,
                type: "edit",
              })}
            >
              {record.image != "" && record.image != null ? (
                <div className="h-full  w-full">
                  <img
                    src={`${import.meta.env.VITE_BASEURL}/images/blog/${record.image}`}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
              ) : (
                <div className="h-full bg-gray-200 w-full place-content-center items-center flex flex-row">
                  <Image />
                  <div className="text-xs">Image Not Found</div>
                </div>
              )}

              <ImageListItemBar
                title={record.title}
                subtitle={
                  <span>
                    {record.category}, {record.type}, {record.status}
                  </span>
                }
                sx={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0) 100%)",
                }}
              />
            </ImageListItem>
          </div>
        </div>
      ))}
    </ImageList>
  );
};

const SelectedRowAction = ({ id }: any) => {
  const [check, setCheck] = useState(false);
  const { selectedIds, onSelect, onUnselectItems } = useListContext();

  useEffect(() => {
    selectedIds.forEach((x) => {
      if (x == id) {
        setCheck(true);
      }
    });
  }, []);

  const handleChange = async () => {
    setCheck(!check);
    if (!check) await selectedIds.push(id);
    if (check) {
      await Promise.all(
        selectedIds.map((x, i) => {
          if (x == id) {
            selectedIds.splice(i, 1);
          }
        })
      );
    }

    onUnselectItems();
    onSelect(selectedIds);
  };

  return (
    <div>
      <Checkbox checked={check} onChange={handleChange} />
    </div>
  );
};

export default GridList;

{
  /* <Button onClick={() => onSelect(["a"])}>
        <>Previous page</>
      </Button> */
}
