import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Link } from 'react-router-dom';
import Navbar from '../src/components/Navbar.tsx';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../src/assets/logo.png', () => 'mockedLogoPath');

jest.mock('../src/firebase/firebase.ts', () => ({
	getAuth: jest.fn(),
	initializeApp: jest.fn(),
	logOut: jest.fn(),
}));

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

		expect(menuItems.at(0).props().to).toBe('/');
		expect(menuItems.at(1).props().to).toBe('/pdf');
		expect(menuItems.at(2).props().to).toBe('/history');
	});

	it('renders logout button', () => {
		const wrapper = shallow(<Navbar />);
		const logoutButton = wrapper.find('Button');
		expect(logoutButton).toHaveLength(1);
	});
});
