import * as React from "react";

import { Box, Modal } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../stores/index.js";

import Login from "../routes/auth/Login.js";

export default function Entrance(props: any): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={commonStore.appInfo.accessToken === "" && commonStore.isEntrance}
      onClose={() => {
        commonStore.setEntrance(false);
      }}
    >
      <Box
        sx={{
          position: "fixed",

          top: "50%",
          left: "50%",

          transform: "translate(-50%, -50%)",
        }}
      >
        <Login mode={props.mode} />
      </Box>
    </Modal>
  ));
}
