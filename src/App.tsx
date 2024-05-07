import { useEffect, useState } from 'react';
import bg from './assets/bg.png';
import logo from './assets/logo.svg';
import card1 from './assets/card_1.png';

type CardOption = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 0;

const basicCards: CardOption[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0];

function App() {
	// Types
	type CardIndex = keyof typeof cards;

	// States
	const [cards, setCards] = useState<CardOption[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0]);
	const [selection, setSelection] = useState<[CardIndex?, CardIndex?]>([]);

	useEffect(() => {
		setCards(shuffleCards(basicCards));
	}, []);

	useEffect(() => {
		if (selection.length === 2) {
			setTimeout(() => {
				setSelection([]);
			}, 1000);
		}
	}, [selection.length]);

	// Handles

	const handleFlip = (card: CardIndex) => () => {
		if (selection.includes(card)) {
			return;
		}
		if (selection.length < 2) {
			// @ts-ignore
			setSelection([...selection, card]);
		}
	};

	return (
		<>
			<div className="background" style={{ backgroundImage: `url(${bg})` }}></div>
			<div className="header">
				<h2>JUGÁ Y DESCUBRÍ TODAS</h2>
				<h1>NUESTRAS VARIEDADES</h1>
			</div>
			<div className="cards">
				{cards.map((card, i) => (
					<Card value={card} key={i} onFlip={handleFlip(i)} flipped={selection.includes(i)} color={(i < 14 ? i % 3 : (i + 1) % 3) as 1 | 2 | 3} />
				))}
			</div>
			<div className="footer" />
		</>
	);
}
interface CardProps {
	value: CardOption;
	onFlip: () => void;
	flipped: boolean;
	color: 1 | 2 | 3;
}
function Card({ value, onFlip, flipped, color }: CardProps) {
	const cardImage = [card1, card1, card1, card1, card1, card1, card1, card1, card1, card1];
	return (
		<div className={`card ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
			<div className="card-body">
				<div className={`card-front color${color}`}>
					<img src={logo} />
				</div>
				<div className="card-back">
					<img src={cardImage[value]} />
				</div>
			</div>
		</div>
	);
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleCards(cards: CardOption[]) {
	const array = [...cards];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export default App;
