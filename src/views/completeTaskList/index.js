import React, { useEffect, useState } from "react";
import { Grid } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";

const CompleteTaskList = () => {
    
    const [completeList, setCompleteList] = useState([]);

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


        fetch(baseURL+'/web-complete-task-list', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.completeTaskList;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["name"],
                    res[i]["number"],
                    res[i]["msg"],
                    res[i]["updated_at"],
                ]);
              
            }
            setCompleteList(tempRows)
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
        "Sent By",
        "Number",
        "Message",  
        "Date/Time",  
    ];
       
    return (
        <>
        <Grid container>
            <Grid item xs={12}>
                {completeList.length > 0 && (
                    <MUIDataTable
                    data={completeList}
                    columns={columnData}
                    options={option}
                  
                    />
                )}
                {completeList.length <= 0 && (
                    <MUIDataTable
                    columns={columnData}
                    options={option}
                    />
                )}
                
            </Grid>
            
        </Grid>
        
    </>
    );
};

export default CompleteTaskList;
