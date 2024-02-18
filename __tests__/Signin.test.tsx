import { shallow } from 'enzyme';
import Signin from '../src/components/auth/signin/Signin';
import { Auth } from '../src/components/auth/Auth';
import { getAuth } from 'firebase/auth';
import { handleLogin, handleSignIn } from '../src/firebase/firebase';
import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

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

describe('Signin component', () => {
    
    beforeEach(() => {
        (getAuth as jest.Mock).mockClear();
        (handleLogin as jest.Mock).mockClear();
        (handleSignIn as jest.Mock).mockClear();
    }); 
  it('renders without crashing', () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders Auth component with isLogin prop set to false', () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.find(Auth).prop('isLogin')).toBe(false);
  });

});
