import { animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useAnimatedText(text) {
	const [cursor, setCursor] = useState(0);
	const prevTextRef = useRef(text);
	const cursorRef = useRef(0);

	useEffect(() => {
		const previousText = prevTextRef.current;
		const from = text.startsWith(previousText) ? cursorRef.current : 0;
		const to = text.length;

		prevTextRef.current = text;

		const controls = animate(from, to, {
			duration: 2,
			ease: 'easeOut',
			onUpdate(latest) {
				const nextCursor = Math.floor(latest);
				cursorRef.current = nextCursor;
				setCursor(nextCursor);
			},
		});

		return () => controls.stop();
	}, [text]);

	return text.slice(0, cursor);
}

export default useAnimatedText;
export { useAnimatedText };
