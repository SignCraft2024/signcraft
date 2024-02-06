import PropTypes from 'prop-types';

interface UserProfileInfoProps {
	label: string;
	value: string | JSX.Element;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ label, value }) => {
	return (
		<div className="user-info">
			<div>
				<p className="strong">{label}:</p>
			</div>
			<div>
				<p>{value}</p>
			</div>
		</div>
	);
};

UserProfileInfo.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.any.isRequired,
};

export default UserProfileInfo;
