import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import  Navbar from '../src/components/Navbar.tsx';

jest.mock('../src/assets/logo.png', () => 'mockedLogoPath');

describe('Navbar Component', () => {
	it('renders without crashing', () => {
		shallow(<Navbar />);
	});

	it('renders logo with a Link to home', () => {
		const wrapper = shallow(<Navbar />);
		const logoLink = wrapper.find(Link);
		expect(logoLink.props().to).toBe('/');
	});

	it('renders menu items with correct links', () => {
		const wrapper = shallow(<Navbar />);
		const menuItems = wrapper.find('MenuItem');

		expect(menuItems).toHaveLength(4);

		expect(menuItems.at(0).find(Link).props().to).toBe('/');
		expect(menuItems.at(1).find(Link).props().to).toBe('/pdf-1');
		expect(menuItems.at(2).find(Link).props().to).toBe('/pdf-2');
		// You may want to adjust the expectation based on your actual routes
	});

	it('renders logout button', () => {
		const wrapper = shallow(<Navbar />);
		const logoutButton = wrapper.find('Button');
		expect(logoutButton).toHaveLength(1);
	});

	it('calls logOut function on logout button click', () => {
		const logOutMock = jest.fn();
		jest.mock('../firebase/firebase', () => ({
			logOut: logOutMock,
		}));

		const wrapper = shallow(<Navbar />);
		const logoutButton = wrapper.find('Button');
		logoutButton.simulate('click');

		expect(logOutMock).toHaveBeenCalledTimes(1);
	});
});
