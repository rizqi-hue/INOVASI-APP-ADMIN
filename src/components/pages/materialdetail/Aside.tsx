import { Card, CardContent } from "@mui/material";
import { FilterList, FilterListItem, FilterLiveSearch, useGetList } from "react-admin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import inflection from "inflection";

interface Category {
  id: string;
  title: string;
}

const Aside = () => {
  const { data } = useGetList<Category>("material", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "title", order: "DESC" },
    filter: { type: "MS" }
  });

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

        <FilterList
          label="resources.blogs.filters.status"
          icon={<AttachMoneyIcon />}
        >
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

        <FilterList
          label="resources.products.filters.categories"
          icon={<LocalOfferIcon />}
        >
          {data &&
            data.map((record: any) => (
              <FilterListItem
                label={inflection.humanize(record.title)}
                key={record.id}
                value={{ kategoribisnis: record.id }}
              />
            ))}
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default Aside;
