export const getSoapServiceData = {
	teamPlayersData: (serialNumber: number) => `
        <TesseratiSocieta xmlns="http://tempuri.org/">
            <codiceSocieta>${serialNumber}</codiceSocieta>
        </TesseratiSocieta>`,

	playerDetailsData: (serialNumber: string) => `
        <CalciatoreByMatricolaEx xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </CalciatoreByMatricolaEx>`,

	trainedInItaly36Months: (serialNumber: string) => `
        <IsFormatoInItalia36mesi xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </IsFormatoInItalia36mesi>`,

	trainedInItaly3Seasons: (serialNumber: string) => `
        <IsFormatoInItalia3stag xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </IsFormatoInItalia3stag>`,

	trainedInTeam36Months: (serialNumber: string) => `
        <IsFormatoInSocieta36mesi xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </IsFormatoInSocieta36mesi>`,

	trainedInTeam3Seasons: (serialNumber: string) => `
        <IsFormatoInSocieta3stagioni xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </IsFormatoInSocieta3stagioni>`,
};
