interface ICANStatic {
	/**
	 * An object containing all the known ICAN specifications.
	 */
	countries: Record<ICAN.Specification['countryCode'], ICAN.Specification>;

	/**
	 * Returns the ICAN in an electronic format.
	 * @param ican The ICAN to convert.
	 * @returns The ICAN in electronic format.
	 */
	electronicFormat(ican: string): string;

	/**
	 * Convert the passed BCAN to an ICAN for this country specification.
	 * @param countryCode The country of the BCAN.
	 * @param bcan The BCAN to convert to ICAN.
	 * @returns The ICAN.
	 */
	fromBCAN(countryCode: string, bcan: string): string;

	/**
	 * Check if the passed ICAN is valid according to this specification.
	 * @param ican The ICAN to validate.
	 * @param onlyCrypto Check only crypto definitions. Possible values:
	 * - `true` = Include all crypto networks.
	 * - `false` = Exclude crypto networks.
	 * - `'main' | 'mainnet'` = Mainnets.
	 * - `'test' | 'testnet'` = Testnets.
	 * - `'enter' | 'enterprise'` = Enterprise networks.
	 * @returns True if valid, false otherwise.
	 */
	isValid(ican: string, onlyCrypto?: boolean | 'main' | 'test' | 'enter' | 'mainnet' | 'testnet' | 'enterprise'): boolean;

	/**
	 * Check if the passed BCAN is valid.
	 * @param countryCode The country of the BCAN.
	 * @param bcan The BCAN to validate.
	 * @param onlyCrypto Check only crypto definitions. Possible values:
	 * - `true` = Include all crypto networks.
	 * - `false` = Exclude crypto networks.
	 * - `'main' | 'mainnet'` = Mainnets.
	 * - `'test' | 'testnet'` = Testnets.
	 * - `'enter' | 'enterprise'` = Enterprise networks.
	 * @returns True if valid, false otherwise.
	 */
	isValidBCAN(countryCode: string, bcan: string, onlyCrypto?: boolean | 'main' | 'test' | 'enter' | 'mainnet' | 'testnet' | 'enterprise'): boolean;

	/**
	 * Returns the ICAN in a print format.
	 * @param ican The ICAN to convert.
	 * @param [separator] The separator to use between ICAN blocks, defaults to ' '.
	 * @returns The formatted ICAN.
	 */
	printFormat(ican: string, separator?: string): string;

	/**
	 * Convert the passed ICAN to a country-specific BCAN.
	 * @param ican The ICAN to convert.
	 * @param [separator] The separator to use between BCAN blocks, defaults to ' '.
	 * @returns The BCAN
	 */
	toBCAN(ican: string, separator?: string): string;

	/**
	 * Returns the ICAN in a short format.
	 * @param ican The ICAN to convert.
	 * @param [separator] The separator to use between ICAN openings/endings, defaults to '…'.
	 * @param [frontCount] The number of characters to show at the beginning, defaults to 4.
	 * @param [backCount] The number of characters to show at the end, defaults to 4.
	 * @returns The shortened ICAN.
	 */
	shortFormat(ican: string, separator?: string, frontCount?: number, backCount?: number): string;
}

declare var ICAN: ICANStatic;

declare namespace ICAN {
	interface Specification {
		/** The code of the country. */
		readonly countryCode: string;
		/** The length of the ICAN. */
		readonly length: number;
		/** The structure of the underlying BCAN (for validation and formatting). */
		readonly structure: string;
		/**
		 * The crypto property. Possible values:
		 * - `true` = All crypto networks.
		 * - `false` = Non-crypto.
		 * - `'main' | 'mainnet'` = Mainnets.
		 * - `'test' | 'testnet'` = Testnets.
		 * - `'enter' | 'enterprise'` = Enterprise networks.
		 */
		readonly crypto: boolean | 'main' | 'test' | 'enter' | 'mainnet' | 'testnet' | 'enterprise';
		/** An example valid ICAN. */
		readonly example: string;

		/**
		 * Check if the passed ICAN is valid according to this specification.
		 * @param ican The ICAN to validate.
		 * @param onlyCrypto Check only crypto definitions. Possible values:
		 * - `true` = Include all crypto networks.
		 * - `false` = Exclude crypto networks.
		 * - `'main' | 'mainnet'` = Mainnets.
		 * - `'test' | 'testnet'` = Testnets.
		 * - `'enter' | 'enterprise'` = Enterprise networks.
		 * @returns True if valid, false otherwise.
		 */
		isValid(ican: string, onlyCrypto?: boolean | 'main' | 'test' | 'enter' | 'mainnet' | 'testnet' | 'enterprise'): boolean;

		/**
		 * Convert the passed ICAN to a country-specific BCAN.
		 * @param ican The ICAN to convert.
		 * @param separator The separator to use between BCAN blocks.
		 * @returns The BCAN.
		 */
		toBCAN(ican: string, separator: string): string;

		/**
		 * Convert the passed BCAN to an ICAN for this country specification.
		 * @param bcan The BCAN to convert to ICAN.
		 * @returns The ICAN.
		 */
		fromBCAN(bcan: string): string;

		/**
		 * Check if the passed BCAN is valid.
		 * @param bcan The BCAN to validate.
		 * @param onlyCrypto Check only crypto definitions. Possible values:
		 * - `true` = Include all crypto networks.
		 * - `false` = Exclude crypto networks.
		 * - `'main' | 'mainnet'` = Mainnets.
		 * - `'test' | 'testnet'` = Testnets.
		 * - `'enter' | 'enterprise'` = Enterprise networks.
		 * @returns True if valid, false otherwise.
		 */
		isValidBCAN(bcan: string, onlyCrypto?: boolean | 'main' | 'test' | 'enter' | 'mainnet' | 'testnet' | 'enterprise'): boolean;
	}
}

export = ICAN;
export as namespace ICAN;
