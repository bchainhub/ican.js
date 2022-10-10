interface ICANStatic {
    /**
     * An object containing all the known ICAN specifications
     */
    countries: Record<ICAN.Specification['countryCode'], ICAN.Specification>;

    /**
     * @summary Returns the ICAN in a electronic format.
     * @param ican The ICAN to convert.
     * @param The ICAN in electronic format.
     */
    electronicFormat(ican: string): string;

    /**
     * @summary Convert the passed BCAN to an ICAN for this country specification.
     * @param countryCode The country of the BCAN.
     * @param bcan The BCAN to convert to ICAN.
     * @returns The ICAN.
     */
    fromBCAN(countryCode: string, bcan: string): string;

    /**
     * @summary Check if the passed ican is valid according to this specification.
     * @param ican The ican to validate.
     * @returns True if valid, false otherwise.
     */
    isValid(ican: string): boolean;

    /**
     * @summary Check of the passed BCAN is valid.
     * @param countryCode The country of the BCAN.
     * @param bcan The BCAN to validate.
     * @returns True if valid, false otherwise.
     */
    isValidBCAN(countryCode: string, bcan: string): boolean;

    /**
     * @summary Returns the ICAN in a print format.
     * @param ican The ICAN to convert.
     * @param [separator] The separator to use between ICAN blocks, defaults to ' '.
     */
    printFormat(ican: string, separator?: string): string;

    /**
     * @summary Convert the passed ICAN to a country-specific BCAN.
     * @param ican The ICAN to convert.
     * @param [separator] The separator to use between BCAN blocks, defaults to ' '.
     * @returns The BCAN
     */
    toBCAN(ican: string, separator?: string): string;
}

declare var ICAN: ICANStatic;

declare namespace ICAN {
    interface Specification {
        /** the code of the country */
        readonly countryCode: string;
        /** the length of the ICAN */
        readonly length: number;
        /*& the structure of the underlying BCAN (for validation and formatting) */
        readonly structure: string;
        /** an example valid ICAN */
        readonly example: string;
        /** Check if the passed ican is valid according to this specification. */
        isValid(ican: string): boolean;
        /**
         * Convert the passed ICAN to a country-specific BCAN.
         */
        toBCAN(ican: string, separator: string): string;
        /**
         * Convert the passed BCAN to an ICAN for this country specification.
         * Please note that <i>"generation of the ICAN shall be the exclusive responsibility of the bank/branch servicing the account"</i>.
         * This method implements the preferred algorithm described in http://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_ICAN_check_digits
         */
        fromBCAN(bcan: string): string;
        /**
         * Check of the passed BCAN is valid.
         * This function only checks the format of the BCAN (length and matching the letetr/number specs) but does not
         * verify the check digit.
         */
        isValidBCAN(bcan: string): boolean;
    }
}

export = ICAN;
export as namespace ICAN;
