/**
 * The useCopyToClipboard hook returns a tuple of the current copied value and a function that copies the given text to the
 * clipboard
 * @returns A tuple of two values.
 */
import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

const useCopyToClipboard = (): [CopiedValue, CopyFn] => {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);

	const copy: CopyFn = async (text) => {
		if (!navigator?.clipboard) {
			console.warn('Clipboard not supported');
			return false;
		}

		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			console.warn('Copy failed', error);
			setCopiedText(null);
			return false;
		}
	};

	return [copiedText, copy];
};

export default useCopyToClipboard;
