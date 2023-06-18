import * as React from 'react';

import Modal from '@mui/material/Modal';
import SummaryCard from '../Cards/SummaryCard';
import Box from '@mui/material/Box';

export default function SummaryModal({modalStatus,updatemodalStatus, data}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <Modal
        open={modalStatus}
        onClose={updatemodalStatus}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SummaryCard data={data} closeModal={updatemodalStatus}/>
        </Box>
      </Modal>
    </div>
  );
}