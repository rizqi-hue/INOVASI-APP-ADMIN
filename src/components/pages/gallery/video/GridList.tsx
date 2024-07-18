import { Image } from "@mui/icons-material";
import { Box, Checkbox, ImageList, ImageListItem, ImageListItemBar, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useCreatePath,
  useListContext
} from "react-admin";
import { Link } from "react-router-dom";

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


const getThumbnail = function (url: string, size: string) {
  let video, results;

  if (url == null) {
    return '';
  }

  size = (size == null) ? 'big' : size;
  results = url.match('[\\?&]v=([^&#]*)');
  video = (results == null) ? url : results[1];

  if (size == 'small') {
    return `http://img.youtube.com/vi/${video}/2.jpg`;
  }

  return `http://img.youtube.com/vi/${video}/0.jpg`;
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
                resource: "gallery/video",
                id: record.id,
                type: "edit",
              })}
            >
              {record.Link != "" && record.Link != null ? (
                <div className="h-full w-full">
                  <img
                    src={getThumbnail(record.Link, 'small')}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
              ) : (
                <div className="h-full bg-gray-200 w-full place-content-center items-center flex flex-row">
                  <Image />
                  <div className="text-xs">Link Not Found</div>
                </div>
              )}

              <ImageListItemBar
                title={record.Title}
                subtitle={
                  <span className="items-center">
                    <span className="pr-2">{record.Status}</span>
                    <span className="pr-2">{record.Tag}</span>
                    {/* <span className="">{record.lang}</span> */}
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
