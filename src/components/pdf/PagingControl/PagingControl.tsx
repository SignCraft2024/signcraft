import { Button } from '../Button/Button';
import './PagingControl.css';
import React from 'react';

export const PagingControl: React.FC<{
	totalPages: number;
	pageNum: number;
	setPageNum: (params: any) => void;
}> = ({ totalPages, pageNum, setPageNum }) => {
	return (
		<div className="container-paging-control">
			<div className="inline-flex">
				<Button
					title={'<'}
					onClick={() => setPageNum(pageNum - 1)}
					disabled={pageNum - 1 === -1}
				/>
				<div className="page-info">
					Page: {pageNum + 1}/{totalPages}
				</div>
				<Button
					title={'>'}
					onClick={() => setPageNum(pageNum + 1)}
					disabled={pageNum + 1 > totalPages - 1}
				/>
			</div>
		</div>
	);
};
