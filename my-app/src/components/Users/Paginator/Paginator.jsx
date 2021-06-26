import React, {useState} from 'react';
import s from './Paginator.module.css';

const Paginator = (props) => {
	
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	
	let pages = [];
	
	for(let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	};
	
	// portionSize размер порции, приходит из props
	
	// portionCount определяем количество порций
	let portionCount = Math.ceil(pagesCount / props.portionSize);
	let [currentPortion, setcurrentPortion] = useState(1);
	// определяем левую границу: (текущая стр. - 1) * pageSize + 1
	let leftPortionPageNumber = (currentPortion - 1) * props.portionSize + 1;
	// определяем правую порцию
	let rightPortionPageNumber = currentPortion * props.portionSize;
	
	return (
		<div className={s.paginator}>
			
			{<button onClick={() => {setcurrentPortion(1)}}
					 className={s.start}>Начало</button>}
			
			{currentPortion > 1
				? <button onClick={() => {setcurrentPortion(currentPortion - 1)}}
						  className={s.prev}>Prev</button>
				: null}
			
			{/* орисовываем только те страницы, которые больше или равны левой границе */}
			{/* и меньше либо равно правой границе */}
			{pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
				return <button className={props.currentPage === p ? s.active : null} key={p} onClick={(e) => {props.onPageChange(p)}}>{p}</button>
			})}
			
			{portionCount > currentPortion
				? <button onClick={() => {setcurrentPortion(currentPortion + 1)}}
						  className={s.next}>Next</button>
				: null}
			
			
			{<button onClick={() => {setcurrentPortion(portionCount)}}
					 className={s.end}>Конец</button>}
		</div>
	);
};

export default Paginator;