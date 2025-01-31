import { Typography } from "@mui/material";

type Props = {
  message: JSX.Element | string;
};

const NoDataMassage = (props: Props) => {
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}
      >
        <Typography variant="h2" color="textDisabled">
          {props.message}
        </Typography>
      </div>
    </>
  );
};

export default NoDataMassage;
