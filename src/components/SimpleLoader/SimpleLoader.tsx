import { CircularProgress } from "@mui/material";

interface SimpleLoaderProps {
  color?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

const SimpleLoader = ({
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: SimpleLoaderProps) => (
  <CircularProgress
    data-testid="circular-progress"
    size={40}
    sx={{
      color: "black",
      marginTop,
      marginLeft,
      marginBottom,
      marginRight,
    }}
  />
);

export default SimpleLoader;
