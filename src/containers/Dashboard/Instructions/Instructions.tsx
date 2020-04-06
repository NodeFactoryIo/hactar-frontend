import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const tabStyle = makeStyles(() => ({
    root: {
        background: "#1D2333",
    },
    indicator: {
        backgroundColor: "#EECA1C",
    },
}));

export const Instructions = () => {
    const classes = tabStyle();
    const [value, setValue] = useState(0);
    const [versionTag, setVersionTag] = useState("v1.0.1");

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetch("https://api.github.com/repos/nodefactoryio/hactar-daemon/releases")
            .then(response => response.json())
            .then(response => {
                const tagName = response[0]["tag_name"];
                setVersionTag(tagName);
            });
    }, []);

    return (
        <div className="instructions">
            <p>Almost done! One more step.</p>
            <p>Setup Hactar daemon application on your server, alongside your Filecoin miner.</p>

            <AppBar className="tabs" position="static">
                <Tabs classes={classes} value={value} onChange={handleChange} aria-label="Installation instructions">
                    <Tab classes={classes} label="Linux (32bit)" {...a11yProps(0)} />
                    <Tab label="Linux (64bit)" {...a11yProps(1)} />
                    <Tab label="OS X older than 10.13.4" {...a11yProps(2)} />
                    <Tab label="OS X High Sierra and later" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <p>Command line instructions:</p>
                <br />
                <br />

                <div className="code">
                    wget https://github.com/NodeFactoryIo/hactar-daemon/releases/download/{versionTag}
                    /hactar-linux-32bit
                </div>
                <div className="code">chmod +x hactar-linux-32bit</div>
                <div className="code">./hactar-linux-32bit start</div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <p>Command line instructions:</p>
                <br />
                <br />

                <div className="code">
                    wget https://github.com/NodeFactoryIo/hactar-daemon/releases/download/{versionTag}
                    /hactar-linux-64bit
                </div>
                <div className="code">chmod +x hactar-linux-64bit</div>
                <div className="code">./hactar-linux-64bit start</div>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <p>Command line instructions:</p>
                <br />
                <br />

                <div className="code">
                    wget https://github.com/NodeFactoryIo/hactar-daemon/releases/download/{versionTag}
                    /hactar-mac-os-32bit
                </div>
                <div className="code">chmod +x hactar-mac-os-32bit</div>
                <div className="code">./hactar-mac-os-32bit start</div>
            </TabPanel>

            <TabPanel value={value} index={3}>
                <p>Command line instructions:</p>
                <br />
                <br />

                <div className="code">
                    wget https://github.com/NodeFactoryIo/hactar-daemon/releases/download/{versionTag}
                    /hactar-mac-os-64bit
                </div>
                <div className="code">chmod +x hactar-mac-os-64bit</div>
                <div className="code">./hactar-mac-os-64bit start</div>
            </TabPanel>
        </div>
    );
};

interface ITabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: ITabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}
