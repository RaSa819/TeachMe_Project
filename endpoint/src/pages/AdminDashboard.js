import React from "react";
import classes from './StudentDashboard.module.css';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Department from '../pages/Admin/department';
import Users from '../pages/Admin/users';
import Sessions from '../pages/Admin/sessions';
import NavBar from '../components/topBar/navBar';
import { LanguageContext } from '../App';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';

export default function AdminDashboard() {

    const [pageSelected, setPageSelected] = React.useState("Department");
    const language = React.useContext(LanguageContext);

    return (
        <div style={{height: '100%'}}>
            <h3 className={classes.header}>{language.AdminDashboard}</h3>


            <Paper className={classes.container + " " + classes.sidebar} elevation={0} >

                <Button className={classes.btn + " " + classes.sidebarBtn +
                    " " + ((pageSelected === 'Department') ? classes.active : "")}
                    onClick={() => setPageSelected("Department")}
                    variant="text" startIcon={<ArticleIcon />}>
                    <span className={classes.hideText}>{language.Departments}</span></Button>

                <Divider light />
                <Button className={classes.btn + " " + classes.sidebarBtn +
                    " " + ((pageSelected === 'Users') ? classes.active : "")}
                    onClick={() => setPageSelected("Users")}
                    variant="text" startIcon={<GroupIcon />} >
                    <span className={classes.hideText}>{language.Users}</span></Button>

                <Divider light />
                <Button className={classes.btn + " " + classes.sidebarBtn +
                    " " + ((pageSelected === 'Sessions') ? classes.active : "")}
                    onClick={() => setPageSelected("Sessions")}
                    variant="text" startIcon={<ScreenshotMonitorIcon />} >
                    <span className={classes.hideText}>{language.Sessions}</span></Button>

            </Paper>
            <Paper elevation={0} className={classes.container + " " + classes.content}>
                <div style={{ padding: 10, height: '100%', width: '100%' }}>
                    <div style={{ border: '1px solid lightgray', padding: 10, height: '100%', width: '100%', borderRadius: 10, overflowY: 'auto' }}>
                        {(pageSelected === "Department") && <Department/>}
                        {(pageSelected === "Users") && <Users />}
                        {(pageSelected === "Sessions") && <Sessions />}

                    </div>
                </div>

            </Paper>
        </div>


    );
}

