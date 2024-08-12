import React, { useEffect, useState } from "react";
// import "../styles/home.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { _bindCellRendererToHtmlElement } from "ag-grid-community";
import ImageRender from "../components/ImageRender";
import Popup from "../components/popup";
import ResumeButton from "../components/resumeButton";
import ResumePopup from "../components/resumePopup";
import axios from "axios";
import '../styles/changeStatus.css'

const ChangeStatus = () => {
	const [profile, setProfile] = useState("");
	const [isPopup, setIsPopup] = useState(false);
	const [isPopupResume, setIsPopupResume] = useState(false);
	const [resumePdf, setResumePdf] = useState("");

	const [rowData, setRowData] = useState([
		{
			profile: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302544/g0vr8brmiikw6mvpfa9q.jpg",
				public_id: "g0vr8brmiikw6mvpfa9q",
			},
			resume: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302546/phgluprc3iz0hiisohss.pdf",
				public_id: "phgluprc3iz0hiisohss",
			},
			_id: "6698f48754f05fbd89900a66",
			name: "anshul",
			email: "anshul1@gmail.com",
			mainSkill: "Node.js",
			skills: ["react.js", "node.js", "mongodb", "express"],
			engineerType: "Backend",
			experience: "3 years",
			bench: "ONBENCH",
			__v: 0,
		},
		{
			profile: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300541/ghqsaagxepjn8zx2rdi0.jpg",
				public_id: "ghqsaagxepjn8zx2rdi0",
			},
			resume: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300542/bfm1svwuccpwzai0rnmt.pdf",
				public_id: "bfm1svwuccpwzai0rnmt",
			},
			_id: "6698f73039e3405f3a2ecde6",
			name: "shikha",
			email: "shikha@gmail.com",
			mainSkill: "React.js",
			skills: ["react.js", "node.js"],
			engineerType: "Backend",
			experience: "1years",
			bench: "ONBENCH",
			__v: 0,
		},
		{
			profile: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302544/g0vr8brmiikw6mvpfa9q.jpg",
				public_id: "g0vr8brmiikw6mvpfa9q",
			},
			resume: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302546/phgluprc3iz0hiisohss.pdf",
				public_id: "phgluprc3iz0hiisohss",
			},
			_id: "6698f48754f05fbd89900a66",
			name: "anshul",
			email: "anshul1@gmail.com",
			mainSkill: "Node.js",
			skills: ["react.js", "node.js", "mongodb", "express"],
			engineerType: "Backend",
			experience: "3 years",
			bench: "ONBENCH",
			__v: 0,
		},
		{
			profile: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300541/ghqsaagxepjn8zx2rdi0.jpg",
				public_id: "ghqsaagxepjn8zx2rdi0",
			},
			resume: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300542/bfm1svwuccpwzai0rnmt.pdf",
				public_id: "bfm1svwuccpwzai0rnmt",
			},
			_id: "6698f73039e3405f3a2ecde6",
			name: "shikha",
			email: "shikha@gmail.com",
			mainSkill: "React.js",
			skills: ["react.js", "node.js"],
			engineerType: "Frontend",
			experience: "1years",
			bench: "ONBENCH",
			__v: 0,
		},
		{
			profile: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302544/g0vr8brmiikw6mvpfa9q.jpg",
				public_id: "g0vr8brmiikw6mvpfa9q",
			},
			resume: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302546/phgluprc3iz0hiisohss.pdf",
				public_id: "phgluprc3iz0hiisohss",
			},
			_id: "6698f48754f05fbd89900a66",
			name: "anshul",
			email: "anshul1@gmail.com",
			mainSkill: "Node.js",
			skills: ["react.js", "node.js", "mongodb", "express"],
			engineerType: "Full Stack",
			experience: "3 years",
			bench: "ONBENCH",
			__v: 0,
		},
		{
			profile: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300541/ghqsaagxepjn8zx2rdi0.jpg",
				public_id: "ghqsaagxepjn8zx2rdi0",
			},
			resume: {
				url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300542/bfm1svwuccpwzai0rnmt.pdf",
				public_id: "bfm1svwuccpwzai0rnmt",
			},
			_id: "6698f73039e3405f3a2ecde6",
			name: "shikha",
			email: "shikha@gmail.com",
			mainSkill: "React.js",
			skills: ["react.js", "node.js"],
			engineerType: "Full Stack",
			experience: "1 year",
			bench: "ONBENCH",
			__v: 0,
		},
	]);

	const [colDefs, setColDefs] = useState([
		{ field: "name" },
		{ field: "mainSkill" },
		{ field: "skills" },
		{ field: "experience" },
		{ field: "engineerType" },
		{ field: "email" },
		{
			field: "bench",
			editable: true,
			cellEditor: "agSelectCellEditor",
			cellEditorParams: { values: ["ONBENCH", "ONPROJECT"] },
		},
		{ field: "resume", cellRenderer: ResumeButton },
		{ field: "profile", cellRenderer: ImageRender },
	]);

	useEffect(() => {
		axios.get("/api/developers").then((res) => {
			console.log("GET DEV----", res);
			const data = res.data.data;
			if (data) {
				setRowData(data);
			}
		});
	}, []);

	const handler = (data) => {
		if (data.colDef.field == "profile") {
			setProfile(data.data.profile.url);
			setIsPopup((prev) => !prev);
		}
		if (data.colDef.field == "resume") {
			setIsPopupResume((prev) => !prev);
			setResumePdf(data.data.resume.url);
			console.log(resumePdf);
		}
	};

	const changeStatus = async (data) => {
		const res = axios.patch("/api/developers/" + data?.data?._id);
		console.log(res);
	};

	return (
		<div className="home">
			<div className="change-status">
				<div className="change-status-scroll">
					{isPopupResume ? (
						<ResumePopup
							url={resumePdf}
							setIsOpen={setIsPopupResume}
						/>
					) : null}
					{isPopup ? (
						<Popup url={profile} setIsOpen={setIsPopup} />
					) : null}
					<div className="ag-theme-quartz ag-gird" >
						<AgGridReact
							rowData={rowData}
							columnDefs={colDefs}
							// onRowClicked={handler}
							onCellClicked={handler}
							defaultColDef={{ flex: 1 }}
                            onCellValueChanged={changeStatus}
							// autoGroupColumnDef={autoGroupColumnDef}
							// groupSelectsChildren={true}
							// rowSelection={"multiple"}
							// groupDefaultExpanded={1} // expand all groups by default
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangeStatus;
