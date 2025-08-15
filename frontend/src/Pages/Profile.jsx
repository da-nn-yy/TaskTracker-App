import React, { useState } from 'react';
import UserProfile from '../Components/UserProfile.jsx';

const Profile = () => {
	const [showProfile, setShowProfile] = useState(true);

	return (
		<div className="min-h-screen py-8 px-4 sm:px-8 md:px-12 my-4">
			<div>
				<div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-20 left-0" />
				<div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden top-60 -right-[150px]" />
				<div className="bg-[#aff901] h-70 w-70 rounded-full absolute -z-1 blur-[90px] animate-pulse max-md:hidden -bottom-50 left-[300px]" />
			</div>
			<div className="container">
			{showProfile && (
				<UserProfile onClose={() => setShowProfile(false)} />
			)}
			</div>
		</div>
	);
};

export default Profile;
