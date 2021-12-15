import React from "react";
import PageContainer from "../../sharable/page-container";
import { Tab, Tabs, useTheme } from "@mui/material";
import TabPanel from "../../sharable/tab-panel";
import Seed from "./tabs/seeds";
import Expenses from "./tabs/expenses";
import ChangePassword from "./tabs/change-password";
export default function Settings() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <PageContainer pageTitle="Settings">
            <Tabs
                sx={{ backgroundColor: theme.palette.grey[50] }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                color="primary"
            >
                <Tab label="Seed Items" sx={{ textTransform: "capitalize" }} />
                <Tab label="Expense Categories" sx={{ textTransform: "capitalize" }} />

                <Tab label="Change Password" sx={{ textTransform: "capitalize" }} />
                <Tab label="Personal Details" disabled sx={{ textTransform: "capitalize" }} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Seed />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Expenses />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ChangePassword />
            </TabPanel>
            <TabPanel value={value} index={3}>
                tab 3
            </TabPanel>
        </PageContainer>
    );
}
