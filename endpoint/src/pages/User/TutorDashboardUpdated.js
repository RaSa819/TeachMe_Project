import React from "react";
import classes from './tutorDashboardUpdated.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HistoryIcon from '@mui/icons-material/History';
import Profile from '../../pages/Tutor/profile';
import Edit from '../../pages/Tutor/edit';
import History from '../../pages/User/UserHistory';
import { LanguageContext } from '../../App';
import PendingRequest from "../../pages/Tutor/pendingRequest";


export default function TutorDashboard() {

    const [pageSelected, setPageSelected] = React.useState("Profile");
    const language = React.useContext(LanguageContext);

    return (
        <div style={{ height: '100%' }}>

            <h3 className={classes.header}>{language.TutorDashboard}</h3>

            <Paper className={classes.container + " " + classes.sidebar} elevation={0} >

                <Button className={classes.btn + " " + classes.sidebarBtn +
                    " " + ((pageSelected === 'Profile') ? classes.active : "")}
                    onClick={() => setPageSelected("Profile")}
                    variant="text" startIcon={<VisibilityIcon />}>
                    <span className={classes.hideText}>{language.ViewProfile}</span>
                </Button>

                <Divider light />

                <Button className={classes.btn + " " + classes.sidebarBtn +
                    " " + ((pageSelected === 'Edit') ? classes.active : "")}
                    onClick={() => setPageSelected("Edit")}
                    variant="text" startIcon={<EditIcon />} >
                    <span className={classes.hideText}>{language.EditProfile}</span>
                </Button>

                <Divider light />

                <Button className={classes.btn + " " + classes.sidebarBtn +
                    " " + ((pageSelected === 'PendingRequest') ? classes.active : "")}
                    onClick={() => setPageSelected("PendingRequest")}
                    variant="text" startIcon={<SummarizeIcon />} >
                    <span className={classes.hideText}>{language.PendingRequest}</span>
                </Button>

                <Divider light />

                <Button className={classes.btn + " " + classes.sidebarBtn +
                    " " + ((pageSelected === 'History') ? classes.active : "")}
                    onClick={() => setPageSelected("History")}
                    variant="text" startIcon={<HistoryIcon />} >
                    <span className={classes.hideText}>{language.RequestHistory}</span>
                </Button>


            </Paper>

            <Paper elevation={0} className={classes.container + " " + classes.content}>
                <div style={{ padding: 10, height: '100%', width: '100%' }}>
                    <div style={{ border: '1px solid lightgray', padding: 40, height: '100%', width: '100%', borderRadius: 10, overflowY: 'auto' }}>
                        {(pageSelected === "Profile") && <Profile />}
                        {(pageSelected === "Edit") && <Edit />}
                        {(pageSelected === "PendingRequest") && <PendingRequest/>}
                        {(pageSelected === "History") && <History/>}

                    </div>
                </div>

            </Paper>
        </div>
    );
}

