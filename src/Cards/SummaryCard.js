import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function SummaryCard({data, closeModal}) {
    const { firstName, lastName, phone, email } = data
    return (
        <Box sx={{ minWidth: 275 }}>
            <React.Fragment>
                <CardContent>
                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Details Summary
                    </Typography>
                    <Typography variant="body2">
                        First Name : {firstName}
                    </Typography>
                    <Typography variant="body2">
                        Last Name : {lastName}
                    </Typography>
                    <Typography variant="body2">
                        Phone : {phone}
                    </Typography>
                    <Typography variant="body2">
                        Email : {email}
                        </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={closeModal}>Close</Button>
                </CardActions>
            </React.Fragment>
        </Box>
    );
}