import { Box,  Typography } from "@mui/material";
import { ModalButton } from "../atoms/button";
import { FC } from "react";

type Props ={
    handleClose:() => void;
    children: React.ReactNode;
}

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    height: 70,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };

export const BoxModal:FC<Props>= (props:Props) =>{
    const {handleClose,children} = props;
    return (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            {children}
          </Typography>
          <ModalButton handleClose={handleClose}>OK</ModalButton>
        </Box>
    );
}