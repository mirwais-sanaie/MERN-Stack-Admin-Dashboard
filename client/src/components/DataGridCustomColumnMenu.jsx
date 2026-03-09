import { GridColumnMenu } from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuFilterItem: null, // removes filter option
      }}
    />
  );
};

export default CustomColumnMenu;
