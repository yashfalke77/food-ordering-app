import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
    display: 'none',
});

export default function UploadButtons({ file, setFile }) {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                <Button variant="contained" component="span" color="bg_color">
                    Upload Image
                </Button>
            </label>
            <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                <IconButton aria-label="upload picture" color="bg_color" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </Stack>
    );
}
