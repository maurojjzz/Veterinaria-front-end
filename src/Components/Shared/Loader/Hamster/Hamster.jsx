import { Box } from "@mui/material";

const Hamster = () => {
  return (
    <Box
      aria-label="Orange and tan hamster running in a metal wheel"
      role="img"
      sx={{
        "--dur": "1s",
        position: "relative",
        width: "12em",
        height: "12em",
        fontSize: "14px",
        "& .wheel, & .spoke, & .hamster, & .hamster div": {
          position: "absolute",
        },
        "& .wheel, & .spoke": {
          borderRadius: "50%",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        },
        "& .wheel": {
          background:
            "radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%)",
          zIndex: 2,
        },
        "& .hamster": {
          animation: "hamster var(--dur) ease-in-out infinite",
          top: "50%",
          left: "calc(50% - 3.5em)",
          width: "7em",
          height: "3.75em",
          transform: "rotate(4deg) translate(-0.8em,1.85em)",
          transformOrigin: "50% 0",
          zIndex: 1,
        },
        "& .spoke": {
          animation: "spoke var(--dur) linear infinite",
          background:
            "radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%), linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat",
        },
        "@keyframes hamster": {
          "0%, 100%": { transform: "rotate(4deg) translate(-0.8em,1.85em)" },
          "50%": { transform: "rotate(0) translate(-0.8em,1.85em)" },
        },
        "@keyframes spoke": {
          from: { transform: "rotate(0)" },
          to: { transform: "rotate(-1turn)" },
        },
      }}
    >
      <Box className="wheel" />
      <Box className="hamster">
        <Box
          className="hamster__body"
          sx={{
            background: "hsl(30,90%,90%)",
            borderRadius: "50% 30% 50% 30% / 15% 60% 40% 40%",
            boxShadow:
              "0.1em 0.75em 0 hsl(30,90%,55%) inset, 0.15em -0.5em 0 hsl(30,90%,80%) inset",
            top: "0.25em",
            left: "2em",
            width: "4.5em",
            height: "3em",
            transformOrigin: "17% 50%",
          }}
        >
          <Box
            className="hamster__head"
            sx={{
              background: "hsl(30,90%,55%)",
              borderRadius: "70% 30% 0 100% / 40% 25% 25% 60%",
              boxShadow:
                "0 -0.25em 0 hsl(30,90%,80%) inset, 0.75em -1.55em 0 hsl(30,90%,90%) inset",
              top: 0,
              left: "-2em",
              width: "2.75em",
              height: "2.5em",
              transformOrigin: "100% 50%",
            }}
          >
            <Box
              className="hamster__ear"
              sx={{
                background: "hsl(0,90%,85%)",
                borderRadius: "50%",
                boxShadow: "-0.25em 0 hsl(30,90%,55%) inset",
                top: "-0.25em",
                right: "-0.25em",
                width: "0.75em",
                height: "0.75em",
                transformOrigin: "50% 75%",
              }}
            />
            <Box
              className="hamster__eye"
              sx={{
                backgroundColor: "black",
                borderRadius: "50%",
                top: "0.375em",
                left: "1.25em",
                width: "0.5em",
                height: "0.5em",
              }}
            />
            <Box
              className="hamster__nose"
              sx={{
                background: "hsl(0,90%,75%)",
                borderRadius: "35% 65% 85% 15% / 70% 50% 50% 30%",
                top: "0.75em",
                left: 0,
                width: "0.2em",
                height: "0.25em",
              }}
            />
          </Box>
          <Box className="hamster__limb hamster__limb--fr" />
          <Box className="hamster__limb hamster__limb--fl" />
          <Box className="hamster__limb hamster__limb--br" />
          <Box className="hamster__limb hamster__limb--bl" />
          <Box className="hamster__tail" />
        </Box>
      </Box>
      <Box className="spoke" />
    </Box>
  );
};

export default Hamster;
