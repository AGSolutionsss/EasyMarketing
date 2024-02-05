import React from "react";
import {Button, Card, CardContent, List, ListItem, ListItemText, makeStyles, Typography} from '@material-ui/core';

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
    },
    login: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    login2: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
}));

const RemoveModal = (props) => {
    const classes = useStyles();

    const removeTask = (e) => {
        e.preventDefault();
        props.removeValue('Yes');
    }

    const removeTask2 = (e) => {
        e.preventDefault();
        props.removeValue('No');
    }

    return(
        <Card>
            <CardContent className={classes.content}>
                <List className={classes.padding}>
                    <ListItem alignItems="center" disableGutters className={classes.padding}>
                        <ListItemText
                            className={classes.padding}
                            primary={<Typography variant="h4">Do you want to remove task ?</Typography>}
                        />
                    </ListItem>
                    <ListItem alignItems="center" disableGutters style={{paddingTop:'20px'}} className={classes.padding}>
                        <Button
                            fullWidth
                            size="small"
                            type="button"
                            variant="contained"
                            style={{marginRight:'5px',width:'25%'}}
                            className={classes.login}
                            onClick={(e) => removeTask(e)}
                        >
                            Yes
                        </Button>
                        <Button
                            fullWidth
                            size="small"
                            type="button"
                            variant="contained"
                            style={{marginRight:'5px',width:'25%'}}
                            className={classes.login2}
                            onClick={(e) => removeTask2(e)}
                        >
                            No
                        </Button>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

export default RemoveModal;