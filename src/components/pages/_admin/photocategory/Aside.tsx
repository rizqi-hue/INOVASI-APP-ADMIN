import { Card, CardContent } from "@mui/material";
import { FilterList, FilterListItem, FilterLiveSearch } from "react-admin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Aside = () => {
  return (
    <Card
      sx={{
        display: { xs: "none", md: "block" },
        order: -1,
        width: "15em",
        mr: 2,
        alignSelf: "flex-start",
      }}
    >
      <CardContent sx={{ pt: 1 }}>
        <FilterLiveSearch source="Title" />

        <FilterList label="resources.blogs.filters.status" icon={<AttachMoneyIcon />}>
          <FilterListItem
            label="resources.blogs.filters.publish"
            value={{
              status: "publish",
            }}
          />
          <FilterListItem
            label="resources.blogs.filters.draft"
            value={{
              status: "draft",
            }}
          />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default Aside;
