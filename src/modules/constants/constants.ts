export const getSoapServiceData = {
	teamPlayersData: (serialNumber: number) => `
        <TesseratiSocieta xmlns="http://tempuri.org/">
            <codiceSocieta>${serialNumber}</codiceSocieta>
        </TesseratiSocieta>`,

	playerDetailsData: (serialNumber: number) => `
        <CalciatoreByMatricolaEx xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </CalciatoreByMatricolaEx>`,

	trainedInItaly36Months: (serialNumber: number) => `
        <IsFormatoInItalia36mesi xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </IsFormatoInItalia36mesi>`,

	trainedInItaly3Seasons: (serialNumber: number) => `
        <IsFormatoInItalia3stag xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </IsFormatoInItalia3stag>`,

	trainedInTeam36Months: (serialNumber: number) => `
        <IsFormatoInSocieta36mesi xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </IsFormatoInSocieta36mesi>`,

	trainedInTeam3Seasons: (serialNumber: number) => `
        <IsFormatoInSocieta3stagioni xmlns="http://tempuri.org/">
            <matricola>${serialNumber}</matricola>
        </IsFormatoInSocieta3stagioni>`,
};

export const soapUrlTypes = {
	TEAM_PLAYERS_DATA: 'teamPlayersData',
	PLAYER_DETAILS_DATA: 'playerDetailsData',
	TRAINED_IN_ITALY_36_MONTHS: 'trainedInItaly36Months',
	TRAINED_IN_ITALY_3_SEASONS: 'trainedInItaly3Seasons',
	TRAINED_IN_TEAM_36_MONTHS: 'trainedInTeam36Months',
	TRAINED_IN_TEAM_3_SEASONS: 'trainedInTeam3Seasons',
};

export const xmlParseType = {
	NEW_DATA_SET: 'NewDataSet',
	TRAINED_IN_ITALY_36_MONTHS: 'IsFormatoInItalia36mesiResult',
	TRAINED_IN_ITALY_3_SEASONS: 'IsFormatoInItalia3stagResult',
	TRAINED_IN_TEAM_36_MONTHS: 'IsFormatoInSocieta36mesiResult',
	TRAINED_IN_TEAM_3_SEASONS: 'IsFormatoInSocieta3stagioniResult',
};

export const columnMapping: { [key: string]: string } = {
	MATRICOLA: 'serial_number',
	NOME: 'first_name',
	COGNOME: 'last_name',
	DATA_NASCITA: 'birth_date',
	CODICE_SVINCOLO: 'free_transfer_code',
	DESCRIZIONE_SVINCOLO: 'free_transfer',
	DATA_SVINCOLO: 'free_transfer_date',
	DATA_SCADENZA: 'contract_end_year',
	CODICE_SOCIETA: 'teamid',
	SOCIETA_PRESTITO: 'temporary_teamid',
	CODICE_STATO: 'statusid',
	DATA_TESSERAMENTO: 'membership_date',
	DATA_PREST_OPZ: 'loan_option_date',
	IDONEITA: 'idoneity',
	DATANASCITA: 'birth_date',
	STATUS: 'statusid',
	LUOGO: 'city',
	PV: 'provinceid',
	CODFIS: 'tax_code',
	TRAINEDINITALY36MONTHS: 'trained_in_italy_36_months',
	TRAINEDINITALY3SEASONS: 'trained_in_italy_3_seasons',
	TRAINEDINTEAM36MONTHS: 'trained_in_team_36_months',
	TRAINEDINTEAM3SEASONS: 'trained_in_team_3_seasons',
};
