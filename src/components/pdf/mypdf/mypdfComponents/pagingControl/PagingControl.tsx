import './PagingControl.css';
import React from 'react';
import { BigButton } from '../BigButton';

type PaginControlProps = {
	totalPages: number;
	pageNum: number;
	setPageNum: (params: number) => void;
};

const PagingControl: React.FC<PaginControlProps> = ({
	totalPages,
	pageNum,
	setPageNum,
}) => {
	return (
		<div id="container-paging-control">
			<div id="page-control">
				<BigButton
					title={'<'}
					onClick={() => setPageNum(pageNum - 1)}
					disabled={pageNum - 1 === -1}
				/>
				<div id="page-info">
					Page: {pageNum + 1}/{totalPages}
				</div>
				<BigButton
					title={'>'}
					onClick={() => setPageNum(pageNum + 1)}
					disabled={pageNum + 1 > totalPages - 1}
				/>
			</div>
		</div>
	);
};

export default PagingControl;
