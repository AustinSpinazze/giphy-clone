/**
 * The useDebounce hook returns a debounced version of the value passed in
 * @param {T} value - The value to be debounced.
 * @param {number} [delay] - The amount of time to wait before updating the value.
 * @returns A function that returns a debounced value.
 */
import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
