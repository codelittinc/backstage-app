import Autocomplete from "@mui/material/Autocomplete";
import Icon from "@mui/material/Icon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useEffect, useMemo, useState } from "react";
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import Box from "@/components/Box";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import Typography from "@/components/Typography";

import DataTableBodyCell from "./DataTableBodyCell";
import DataTableHeadCell from "./DataTableHeadCell";

interface Props {
  canSearch?: boolean;
  entriesPerPage?:
    | false
    | {
        defaultValue: number;
        entries: number[];
      };
  isSorted?: boolean;
  noEndBorder?: boolean;
  pagination?: {
    color:
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning"
      | "error"
      | "dark"
      | "light";
    variant: "contained" | "gradient";
  };
  showTotalEntries?: boolean;
  table: {
    columns: { [key: string]: any }[];
    rows: { [key: string]: any }[];
  };
  withPagination?: boolean;
}

const getEntriesText = (
  entriesStart: number,
  entriesEnd: number,
  length: number
) => {
  return `Showing ${entriesStart} to ${Math.min(
    entriesEnd,
    length
  )} of ${length} entries`;
};

function DataTable({
  entriesPerPage = { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch,
  showTotalEntries = true,
  table,
  pagination = { variant: "gradient", color: "info" },
  isSorted = true,
  noEndBorder,
  withPagination = true,
}: Props): JSX.Element {
  let defaultValue: any;
  let entries: any[];

  if (!withPagination) {
    defaultValue = Number.MAX_SAFE_INTEGER;
    entries = [];
  } else if (entriesPerPage) {
    defaultValue = entriesPerPage.defaultValue
      ? entriesPerPage.defaultValue
      : "10";
    entries = entriesPerPage.entries
      ? entriesPerPage.entries
      : ["10", "25", "50", "100"];
  }

  const columns = useMemo<any>(() => table.columns, [table]);
  const data = useMemo<any>(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  }: any = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [setPageSize, defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value: any) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option: any) => (
    <Pagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </Pagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }: any) =>
    value > pageOptions.length || value < 0
      ? gotoPage(0)
      : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option: any) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }: any) =>
    gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column: any) => {
    let sortedValue;
    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          {entriesPerPage && withPagination && (
            <Box display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => <Input {...params} />}
              />
              <Typography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </Typography>
            </Box>
          )}
          {canSearch && (
            <Box width="12rem" ml="auto">
              <Input
                placeholder="Search..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }: any) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </Box>
          )}
        </Box>
      ) : null}
      <Table {...getTableProps()}>
        <Box component="thead">
          {headerGroups.map((headerGroup: any, key: any) => (
            <TableRow key={key}>
              {headerGroup.headers.map((column: any, key: any) => {
                const spread = column.getHeaderProps(
                  isSorted && column.getSortByToggleProps()
                );
                delete spread["key"];
                return (
                  <DataTableHeadCell
                    key={key}
                    width={column.width ? column.width : "auto"}
                    align={column.align ? column.align : "left"}
                    sorted={setSortedValue(column)}
                    {...spread}
                  >
                    {column.render("Header")}
                  </DataTableHeadCell>
                );
              })}
            </TableRow>
          ))}
        </Box>
        <TableBody {...getTableBodyProps()}>
          {page.map((row: any, key: any) => {
            prepareRow(row);
            return (
              <TableRow key={key}>
                {row.cells.map((cell: any, key: any) => (
                  <DataTableBodyCell
                    key={key}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                  >
                    {cell.render("Cell")}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <Box mb={{ xs: 3, sm: 0 }}>
            <Typography variant="button" color="secondary" fontWeight="regular">
              {getEntriesText(entriesStart, entriesEnd, rows.length)}
            </Typography>
          </Box>
        )}
        {pageOptions.length > 1 && (
          <Pagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <Pagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </Pagination>
            )}
            {renderPagination.length > 6 ? (
              <Box width="5rem" mx={1}>
                <Input
                  inputProps={{
                    type: "number",
                    min: 1,
                    max: customizedPageOptions.length,
                  }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(event: any) => {
                    handleInputPagination(event);
                    handleInputPaginationValue(event);
                  }}
                />
              </Box>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <Pagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </Pagination>
            )}
          </Pagination>
        )}
      </Box>
    </TableContainer>
  );
}

export default DataTable;
