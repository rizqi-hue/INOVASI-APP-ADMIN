import {
  Divider, Tab, Tabs, Theme, useMediaQuery
} from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  Datagrid, List, ListContextProvider, RaRecord, SearchInput, TextField, useGetList, useListContext
} from "react-admin";
import ContentField from "./ContentField";
import MobileGrid from "./MobileGrid";

const FooterList = () => (
  <List
    filterDefaultValues={{ lang: "id", ref_group: "AB" }}
    sort={{ field: "createdAt", order: "DESC" }}
    perPage={25}
    filters={filters}
  >
    <TabbedDatagrid />
  </List>
);

const filters = [<SearchInput source="title" alwaysOn />];

const tabs = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
];

const useGetTotals = (filterValues: any) => {
  const { total: totalId } = useGetList("admin/footer", {
    pagination: { perPage: 1, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues, lang: "id", ref_group: "AB" },
  });
  const { total: totalEn } = useGetList("admin/footer", {
    pagination: { perPage: 1, page: 1 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { ...filterValues, lang: "en", ref_group: "AB" },
  });

  return {
    id: totalId,
    en: totalEn,
  };
};

const TabbedDatagrid = () => {
  const listContext = useListContext();
  const { data, filterValues, setFilters, displayedFilters, isLoading } =
    listContext;

  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const [id, setId] = useState<RaRecord[]>([]);
  const [en, setEn] = useState<RaRecord[]>([]);
  const totals = useGetTotals(filterValues) as any;

  useEffect(() => {
    if (isLoading) {
      return;
    }
    switch (filterValues.lang) {
      case "id":
        setId(data);
        break;
      case "en":
        setEn(data);
        break;
    }
  }, [data, isLoading, filterValues.lang]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, value: any) => {
      setFilters &&
        setFilters(
          { ...filterValues, lang: value },
          displayedFilters,
          false // no debounce, we want the filter to fire immediately
        );
    },
    [displayedFilters, filterValues, setFilters]
  );

  const selectedData = filterValues.lang === "id" ? id : en;

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.lang}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={
              totals[choice.name]
                ? `${choice.name} (${totals[choice.name]})`
                : choice.name
            }
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      {isXSmall ? (
        <ListContextProvider value={{ ...listContext, data: selectedData }}>
          <MobileGrid data={selectedData} />
        </ListContextProvider>
      ) : (
        <>
          {filterValues.lang === "id" && (
            <ListContextProvider value={{ ...listContext }}>
              <Datagrid
                optimized
                rowClick="edit"
                sx={{
                  "& .RaDatagrid-thead": {
                    borderLeftColor: "transparent",
                    borderLeftWidth: 5,
                    borderLeftStyle: "solid",
                  },
                  "& .column-comment": {
                    maxWidth: "18em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              >
                <TextField source="title" label="Judul" width="20%" />
                <ContentField />
                <TextField source="status" label="Status" width="20%" />
                {/* <TextField source="reference" />
                <CustomerReferenceField />
                <ReferenceField
                  source="customer_id"
                  reference="admin/customers"
                  link={false}
                  label="resources.commands.fields.address"
                >
                  <AddressField />
                </ReferenceField>
                <NbItemsField />
                <NumberField
                  source="total"
                  options={{
                    style: "currency",
                    currency: "USD",
                  }}
                  sx={{ fontWeight: "bold" }}
                /> */}
              </Datagrid>
            </ListContextProvider>
          )}

          {filterValues.lang === "en" && (
            <ListContextProvider value={{ ...listContext }}>
              <Datagrid
                rowClick="edit"
                sx={{
                  "& .RaDatagrid-thead": {
                    borderLeftColor: "transparent",
                    borderLeftWidth: 5,
                    borderLeftStyle: "solid",
                  },
                  "& .column-comment": {
                    maxWidth: "18em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              >
                <TextField source="title" label="Judul" width="20%" />
                <ContentField />
                <TextField source="status" label="Status" width="20%" />

                {/* <CustomerReferenceField />
                <ReferenceField
                  source="customer_id"
                  reference="admin/customers"
                  link={false}
                  label="resources.commands.fields.address"
                >
                  <AddressField />
                </ReferenceField>
                <NbItemsField />
                <NumberField
                  source="total"
                  options={{
                    style: "currency",
                    currency: "USD",
                  }}
                  sx={{ fontWeight: "bold" }}
                />
                <BooleanField source="returned" sx={{ mt: -0.5, mb: -0.5 }} /> */}
              </Datagrid>
            </ListContextProvider>
          )}
        </>
      )}
    </Fragment>
  );
};


export default FooterList;
