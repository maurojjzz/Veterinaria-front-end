import { Box } from "@mui/material";

const PointsLoader = () => {
  return (
    <Box
      sx={{
        width: "200px",
        height: "60px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: "20px",
            height: "20px",
            position: "absolute",
            borderRadius: "50%",
            backgroundColor: "#fff",
            left: i === 0 ? "15%" : i === 1 ? "45%" : "auto",
            right: i === 2 ? "15%" : "auto",
            transformOrigin: "50%",
            animation: `circleAnim 0.5s ${i * 0.1}s alternate infinite ease`,
            "@keyframes circleAnim": {
              "0%": {
                top: "60px",
                height: "5px",
                borderRadius: "50px 50px 25px 25px",
                transform: "scaleX(1.7)",
              },
              "40%": {
                height: "20px",
                borderRadius: "50%",
                transform: "scaleX(1)",
              },
              "100%": {
                top: "0%",
              },
            },
          }}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <Box
          key={`shadow-${i}`}
          sx={{
            width: "20px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.9)",
            position: "absolute",
            top: "62px",
            transformOrigin: "50%",
            zIndex: -1,
            left: i === 0 ? "15%" : i === 1 ? "45%" : "auto",
            right: i === 2 ? "15%" : "auto",
            filter: "blur(1px)",
            animation: `shadowAnim 0.5s ${i * 0.1}s alternate infinite ease`,
            "@keyframes shadowAnim": {
              "0%": {
                transform: "scaleX(1.5)",
              },
              "40%": {
                transform: "scaleX(1)",
                opacity: 0.7,
              },
              "100%": {
                transform: "scaleX(.2)",
                opacity: 0.4,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default PointsLoader;
