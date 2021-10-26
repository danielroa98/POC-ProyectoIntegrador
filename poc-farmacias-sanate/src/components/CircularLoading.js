import * as React from 'react';
import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

export default function CircularLoading() {
    return (
        <CircularProgress
            disableShrink
            size={200}
            sx={{
                color: green[500],
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1
            }}
        />
    )
}