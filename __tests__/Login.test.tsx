import { shallow } from 'enzyme';
import Login from '../src/components/auth/login/Login';
import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Auth } from '../src/components/auth/Auth';
import { getAuth } from 'firebase/auth';
import { handleLogin, handleSignIn } from '../src/firebase/firebase';

configure({ adapter: new Adapter() });

jest.mock('firebase/auth', () => ({
	getAuth: jest.fn(),
}));

jest.mock('../src/firebase/firebase.ts', () => ({
	initializeApp: jest.fn(),
	logOut: jest.fn(),
	handleLogin: jest.fn(),
	handleSignIn: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn(),
}));

describe('Login component', () => {
	beforeEach(() => {
		(getAuth as jest.Mock).mockClear();
		(handleLogin as jest.Mock).mockClear();
		(handleSignIn as jest.Mock).mockClear();
	});
	it('renders without crashing', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.exists()).toBe(true);
	});

	it('renders Auth component with isLogin prop set to true', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.find(Auth).prop('isLogin')).toBe(true);
	});
});
