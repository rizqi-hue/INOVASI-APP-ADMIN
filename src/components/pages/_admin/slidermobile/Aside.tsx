import { Card, CardContent } from "@mui/material";
import { FilterList, FilterListItem, FilterLiveSearch } from "react-admin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { CheckOutlined, ImageAspectRatioOutlined, PriorityHighOutlined, PublishedWithChangesOutlined } from "@mui/icons-material";

const Aside = () => {
  return (
    <Card
      sx={{
        display: { xs: "none", md: "block" },
        order: -1,
        width: "15em",
        mr: 2,
        alignSelf: "flex-start",
        boxShadow: "none",
        // background: "gray"
      }}
    >
      <CardContent >
        <FilterLiveSearch source="Title" />

        <FilterList label="resources.blogs.filters.status" icon={<PublishedWithChangesOutlined style={{ color: 'GrayText' }} />}>
          <FilterListItem
            label={<><CheckOutlined style={{ width: '18px', paddingRight: '5px' }} />Publish</>}
            value={{
              status: "publish",
            }}
          />
          <FilterListItem
            label={<><PriorityHighOutlined style={{ width: '18px', paddingRight: '5px' }} />Draft</>}
            value={{
              status: "draft",
            }}
          />
        </FilterList>

        <FilterList label="Jenis Slider" icon={<ImageAspectRatioOutlined style={{ color: 'GrayText' }} />}>
          <FilterListItem
            label="Home Slider"
            value={{
              type: "Home Slider",
            }}
          />
          <FilterListItem
            label="About Slider"
            value={{
              type: "About Slider",
            }}
          />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default Aside;
