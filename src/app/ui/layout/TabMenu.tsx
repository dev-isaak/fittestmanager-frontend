"use client";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

interface ITabPanel {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export function TabPanel(props: ITabPanel) {
	const { children, value, index, ...other } = props;

	return (
		<Box
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</Box>
	);
}

function TabMenu({ component, titleTab }: any) {
	const [tabContent, setTabContent] = useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: any) => {
		setTabContent(newValue);
	};

	return (
		<Box>
			<Tabs
				sx={{ background: "#e1e1e1" }}
				value={tabContent}
				onChange={handleTabChange}>
				{titleTab?.map((item: string, index: number) => (
					<Tab key={index} label={item} />
				))}
			</Tabs>
			{component?.map((item: React.ReactNode, index: number) => (
				<TabPanel key={index} value={tabContent} index={index}>
					{item}
				</TabPanel>
			))}
		</Box>
	);
}

export default TabMenu;
