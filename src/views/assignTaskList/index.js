import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Button, Box } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
import RemoveModal from "./RemoveModal";
import AssignModal from "./AssignModal";
import Modal from '@mui/material/Modal';
import axios from "axios";

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

const useStyles = makeStyles((theme) => ({
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

    modal: {
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overFlow: 'auto',
        backgroundColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0,0.4)'
    }
}));

const AssignTaskList = () => {
    const classes = useStyles();
    const [assignList, setAssignList] = useState([]);

    const [removeId, setRemoveId] = useState("");

    const [showmodal, setShowmodal] = useState(false);

    const closegroupModal = () => {
        setShowmodal(false);
    };

    const openmodal = () => {
        setShowmodal(true);
    };

    const [showmodalA, setShowmodalA] = useState(false);

    const closegroupModalA = () => {
        setShowmodalA(false);
    };

    const openmodalA = () => {
        setShowmodalA(true);
    };

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

        }

        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/web-assign-task-list', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.user_list;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["name"],
                    res[i]["last_login"],
                    res[i]["sent"]+" / "+res[i]["pending"],
                    res[i]["id"],
                ]);
              
            }
            setAssignList(tempRows)
        }); 
    }, []);

    const option = {
        filterType: "dropDown",
        selectableRows: false,
        viewColumns : false,
    }

    const columnData = [
        {
            name: "#",
            options: {
              filter: false,
              print:false,
              download:false,
            }
        },
        "Full Name",
        {
            name:"Last Login",
            options:{
                filter: false,
            },
        },
        "Sent/Pending",
        {
            name: "Actions",
            options: {
              filter: false,
              print:false,
              download:false,
              customBodyRender: (value) => {

                return (
                  <div style={{ display:'flex', justifyContent:'space-between', minWidth: "150px" , fontWeight: 800}}>
                    <Button
                        fullWidth
                        size="medium"
                        type="button"
                        variant="contained"
                        style={{marginRight:'5px'}}
                        className={classes.login}
                        onClick={(e) => removeTask(e,value)}
                    >
                        Remove Task
                    </Button>
                    <Button
                        fullWidth
                        size="medium"
                        type="button"
                        variant="contained"
                        style={{marginLeft:'5px'}}
                        className={classes.login2}
                        onClick={(e) => assignTask(e,value)}
                    >
                        Assign Task
                    </Button>
                    
                  </div>
                );
              },
            },
        },
    ]
       
    const removeTask = (e,value) => {
        e.preventDefault();
        setRemoveId(value);
        setShowmodal(true);
    }

    const assignTask = (e,value) => {
        e.preventDefault();
        setRemoveId(value);
        setShowmodalA(true);
    }

    const removeValue = (selectedProduct) => {
        if(selectedProduct == 'Yes'){
            axios({
                url: baseURL+"/web-update-remove-task/"+removeId,
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
            }).then((res) => {
                let respon = res.data.user_list;
                let tempRows = [];
                for (let i = 0; i < respon.length; i++) {
          
                    tempRows.push([
                        i+1,
                        respon[i]["name"],
                        respon[i]["last_login"],
                        respon[i]["sent"]+" / "+respon[i]["pending"],
                        respon[i]["id"],
                    ]);
                  
                }
                setAssignList(tempRows)
            });
        }
        setShowmodal(false);
    }

    const assignValue = (selectedProduct , selctedcount) =>{
        
        if(selectedProduct == 'Yes'){
            let data = {
                no_of_task:selctedcount
            }

            axios({
                url: baseURL+"/web-update-assign-task/"+removeId,
                method: "PUT",
                data,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
            }).then((res) => {
                let respon = res.data.user_list;
                let tempRows = [];
                for (let i = 0; i < respon.length; i++) {
          
                    tempRows.push([
                        i+1,
                        respon[i]["name"],
                        respon[i]["last_login"],
                        respon[i]["sent"]+" / "+respon[i]["pending"],
                        respon[i]["id"],
                    ]);
                  
                }
                setAssignList(tempRows)
            });
        }
        setShowmodalA(false);
    }

    return (
        <>
        <Grid container>
            <Grid item xs={12}>
                {assignList.length > 0 && (
                    <MUIDataTable
                    data={assignList}
                    columns={columnData}
                    options={option}
                  
                    />
                )}
                {assignList.length <= 0 && (
                    <MUIDataTable
                    columns={columnData}
                    options={option}
                    />
                )}
                
            </Grid>
            
        </Grid>
        
        <Modal
        open={showmodal}
        onClose={closegroupModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
            <Box sx={style}>
                <RemoveModal removeValue={removeValue}/>
          
            </Box>
        </Modal>

        <Modal
        open={showmodalA}
        onClose={closegroupModalA}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
            <Box sx={style}>
                <AssignModal assignValue={assignValue}/>
            </Box>
        </Modal>
    </>
    );
};

export default AssignTaskList;
