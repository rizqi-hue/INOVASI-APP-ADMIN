import {
  useTheme,
  useMediaQuery,
  Checkbox,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import {
  useCreatePath,
  NumberField,
  useListContext,
  Toolbar,
  EditButton,
} from "react-admin";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Article, Image } from "@mui/icons-material";
import { useEffect, useState } from "react";
import LinkToRelated from "./LinkToRelated";
import { stringify } from "query-string";

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
    <Grid container spacing={2} sx={{ marginTop: "1em" }}>
      {data.map((record, key) => (
        <Grid key={record.id} xs={12} sm={6} md={4} lg={3} xl={2} item>
          <Card>
            <SelectedRowAction id={record.id} />
            <CardMedia
              image={`${import.meta.env.VITE_BASEURL}/images/kategoribisnis/${record.image}`}
              sx={{ height: 140 }}
            />
            <CardContent sx={{ paddingBottom: "0.5em" }}>
              <Typography variant="h5" component="h2" align="center">
                {record.title}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                ".MuiCardActions-spacing": {
                  display: "flex",
                  justifyContent: "space-around",
                },
              }}
            >
              <LinkToRelated />
              <Button
                size="small"
                color="primary"
                component={Link}
                to={{
                  pathname: "/bisnis",
                  search: stringify({
                    filter: JSON.stringify({ kategoribisnis: record.id }),
                  }),
                }}
                sx={{ display: "inline-flex", alignItems: "center" }}
              >
                <Article />
                <span className="ml-2">Detail</span>
              </Button>
              <EditButton record={record} />
            </CardActions>

          </Card>
        </Grid>
      ))}
    </Grid>
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
