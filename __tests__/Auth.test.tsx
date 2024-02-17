import { shallow } from 'enzyme';
import { Auth } from '../src/components/auth/Auth';
import { handleLogin, handleSignIn } from '../src/firebase/firebase';
import { getAuth } from 'firebase/auth';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

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

describe('Auth Component', () => {

    beforeEach(() => {
        (getAuth as jest.Mock).mockClear();
        (handleLogin as jest.Mock).mockClear();
        (handleSignIn as jest.Mock).mockClear();
    });

    it('renders without crashing', () => {
        const wrapper = shallow(<Auth isLogin={true} />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders email and password fields', () => {
        const wrapper = shallow(<Auth isLogin={true} />);
        expect(wrapper.find('EmailField').exists()).toBe(true);
        expect(wrapper.find('PasswordField').exists()).toBe(true);
    });
});
