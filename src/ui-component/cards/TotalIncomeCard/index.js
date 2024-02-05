import React from 'react';
import {Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark
    },
    secondary: {
        color: theme.palette.grey[500],
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

const TotalIncomeCard = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const Assign = (e) => {
        e.preventDefault();
        history.push("/assign-task-list");
    };

    return (
        <Card>
            <CardContent className={classes.content}>
                <List className={classes.padding}>
                    <ListItem alignItems="center" disableGutters className={classes.padding}>
                        <ListItemAvatar>
                            <Avatar variant="rounded" className={classes.avatar} onClick={(e) => Assign(e)}>
                                <StorefrontTwoToneIcon fontSize="inherit" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className={classes.padding}
                            primary={<Typography variant="h4">{props.total_sent_task}</Typography>}
                            secondary={
                                <Typography variant="subtitle2" className={classes.secondary}>
                                    Total Sent
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
};

export default TotalIncomeCard;
