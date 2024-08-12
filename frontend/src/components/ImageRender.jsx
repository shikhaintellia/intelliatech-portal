import React, { useState } from "react";
import "../styles/button.css"
const ImageRender = () => {
	const [isOpen, setIsOpen] = useState(false);
	const modelHandler = () => {
		setIsOpen(!isOpen);
	};

	return <button className="profile-bt" onClick={modelHandler}>View picture</button>;
};

export default ImageRender;
