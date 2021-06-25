import React from 'react';
import s from './Paginator.module.css';

const Paginator = (props) => {
	
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	
	let pages = [];
	
	for(let i = 1;i <= pagesCount;i++) {
		pages.push(i);
	}
	
	return (
		<div className={s.paginator}>
			{pages.map(p => <button onClick={()=>{props.onPageChange(p)}} className={props.currentPage === p ? s.active : undefined} key={p}>{p}</button>)}
		</div>
	);
};

export default Paginator;