import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [isResultVisible, setIsResultVisible] = useState(false);

	const onClickNumber = (num) => {
		if (num === '0') {
			if (!operand1 && !operator) {
				setOperand1('0');
			} else if (operator && !operand2) {
				setOperand2('0');
			} else if (operand1 !== '0' && !operator) {
				setOperand1(operand1 + '0');
			} else if (operand2 !== '0' && operator) {
				setOperand2(operand2 + '0');
			}
		} else {
			if (operand1 === '0' && !operator) {
				setOperand1('0');
			} else if (operand2 === '0' && operator) {
				setOperand2('0');
			} else if (!operator) {
				setOperand1(operand1 + num);
			} else {
				setOperand2(operand2 + num);
			}
		}

		if (isResultVisible) {
			setIsResultVisible(false);
		}
	};

	const onClickClear = () => {
		setOperand1('');
		setOperand2('');
		setOperator('');
		if (isResultVisible) {
			setIsResultVisible(false);
		}
	};

	const onClickPlus = () => {
		setOperator('+');
		if (isResultVisible) {
			setIsResultVisible(false);
		}
	};

	const onClickMinus = () => {
		setOperator('-');
		if (isResultVisible) {
			setIsResultVisible(false);
		}
	};

	const onClickIs = () => {
		let result;
		const num1 = Number(operand1);
		const num2 = Number(operand2);

		if (operator === '+') {
			result = num1 + (operand2 ? num2 : 0);
		} else if (operator === '-') {
			result = num1 - (operand2 ? num2 : 0);
		} else if (operand1 && operator === '') {
			result = num1;
		}

		setOperand1(result.toString());
		setOperand2('');
		setOperator('');
		setIsResultVisible(true);
	};

	const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	const getFontSize = (length) => {
		if (length <= 10) return '2.5rem';
		if (length <= 15) return '2rem';
		if (length <= 20) return '1.5rem';
		return '1rem';
	};

	const fontSize = getFontSize((operand1 + operator + operand2).length);

	return (
		<div className={styles.webpage}>
			<div className={styles.calculator}>
				<div
					className={
						!isResultVisible
							? styles['result-panel']
							: styles['visible-result']
					}
				>
					<h1 style={{ fontSize }}>
						{operand1}
						{operator}
						{operand2}
					</h1>
				</div>
				<div className={styles['buttons-panel']}>
					<div className={styles['number-buttons']}>
						<ul className={styles['number-buttons-list']}>
							{nums.map((number, index) => {
								return (
									<li>
										<button
											key={index}
											onClick={() => onClickNumber(number)}
										>
											{number}
										</button>
									</li>
								);
							})}
						</ul>
					</div>
					<div className={styles['operator-buttons']}>
						<ul className={styles['operator-buttons-list']}>
							<li>
								<button onClick={onClickClear}>c</button>
							</li>
							<li>
								<button onClick={onClickPlus}>+</button>
							</li>
							<li>
								<button onClick={onClickMinus}>-</button>
							</li>
							<li>
								<button onClick={onClickIs}>=</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
