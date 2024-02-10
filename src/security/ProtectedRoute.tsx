import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import PropTypes from 'prop-types';

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { currentUser } = useContext(AuthContext);

	if (!currentUser) {
		return <Navigate to="/" replace />; // Redirect to login
	}

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
