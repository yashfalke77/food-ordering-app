import React from 'react';
import Button from '@mui/material/Button';

function AddButton({ setClose }) {
    return <Button size="large" variant="contained" color="bg_color" onClick={() => setClose(false) } >Add Pizza </Button>
}

export default AddButton;
