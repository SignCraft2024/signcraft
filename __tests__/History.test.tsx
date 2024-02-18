import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { History } from '../src/components/history/History.tsx';
import { listAll } from 'firebase/storage';
import { TableCaption, Th, Td } from '@chakra-ui/react';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@chakra-ui/react', () => ({
	...jest.requireActual('@chakra-ui/react'),
	Table: ({ children }: { children: React.ReactNode }) => (
		<table>{children}</table>
	),
	TableCaption: ({ children }: { children: React.ReactNode }) => (
		<caption>{children}</caption>
	),
	Thead: ({ children }: { children: React.ReactNode }) => (
		<thead>{children}</thead>
	),
	Tbody: ({ children }: { children: React.ReactNode }) => (
		<tbody>{children}</tbody>
	),
	Tr: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
	Th: ({ children }: { children: React.ReactNode }) => <th>{children}</th>,
	Td: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
	TableContainer: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	Button: ({
		children,
		onClick,
	}: {
		children: React.ReactNode;
		onClick?: () => void;
	}) => <button onClick={onClick}>{children}</button>,
}));

jest.mock('@emotion/react', () => ({
	...jest.requireActual('@emotion/react'),
	css: jest.fn(),
	keyframes: jest.fn(),
	ThemeContext: jest.fn(),
}));

jest.mock('../src/firebase/firebase.ts', () => ({
	storage: {
		ref: jest.fn(),
	},
}));

jest.mock('firebase/storage', () => ({
	listAll: jest.fn(),
	ref: jest.fn(),
	StorageReference: jest.fn(),
}));

describe('History Component', () => {
	let wrapper: ShallowWrapper | ReactWrapper;

	const mockCurrentUser = { email: 'test@example.com' };

	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(React, 'useContext').mockReturnValue({
			currentUser: mockCurrentUser,
		});

		jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
	});

	it('renders without crashing', () => {
		shallow(<History />);
	});

	it('renders the component with file names', async () => {
		const mockListAll = listAll as jest.Mock;
		const mockFileNames = ['file1.txt', 'Download'];
		mockListAll.mockResolvedValue({
			items: mockFileNames.map((name) => ({ name })),
		} as any);

		await act(async () => {
			wrapper = mount(<History />);
		});

		wrapper.update();

		expect(wrapper.find(TableCaption).text()).toBe('History');
		expect(wrapper.find(Th).text()).toBe('File');

		mockFileNames.forEach((fileName, index) => {
			expect(wrapper.find(Td).at(index).text()).toContain(fileName);
		});
	});

	it('handles error fetching files', async () => {
		const mockListAll = listAll as jest.Mock;
		mockListAll.mockRejectedValue(new Error('Mocked error'));

		await act(async () => {
			wrapper = mount(<History />);
		});

		wrapper.update();

		expect(console.error).toHaveBeenCalledWith(
			'Error fetching files:',
			expect.any(Error),
		);
	});
});
