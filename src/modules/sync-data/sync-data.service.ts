// import axios from 'axios';
// import axiosNTLM from 'axios-ntlm';
// import { parseString } from 'xml2js';
import { Parser } from 'xml2js';

import { NtlmClient } from 'axios-ntlm';

// Use axios-ntlm to enhance Axios instance
// const axiosInstance = axiosNTLM(axios.create()); // Apply NTLM middleware to axios instance

export class SoapService {
	// Builds the SOAP request body

	// Makes HTTP request with retries
	// public static async makeRequest(
	// 	url: string,
	// 	headers: Record<string, string>,
	// 	data: string
	// ): Promise<any> {
	// 	const auth = {
	// 		username: SoapService.username,
	// 		password: SoapService.password,
	// 	};

	// 	let attempt = 0;
	// 	while (attempt < SoapService.maxRetries) {
	// 		try {
	// 			const response = await axiosInstance.post(url, data, {
	// 				headers: headers,
	// 				auth: auth,
	// 			});
	// 			return response;
	// 		} catch (error) {
	// 			if (attempt === SoapService.maxRetries - 1) {
	// 				throw new Error('Max retries exceeded');
	// 			}
	// 			attempt++;
	// 			const delay = Math.min(
	// 				SoapService.baseDelay * Math.pow(2, attempt),
	// 				SoapService.maxDelay
	// 			);
	// 			await this.delay(delay);
	// 		}
	// 	}
	// 	throw new Error('Request failed after multiple attempts');
	// }

	// Pauses execution for a certain number of milliseconds
	// private static delay(ms: number): Promise<void> {
	// 	return new Promise((resolve) => setTimeout(resolve, ms));
	// }

	// Parses XML to JSON
	// public static parseXmlToJson(
	// 	xmlResponse: string,
	// 	rootNode: string | string[]
	// ): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		parseString(
	// 			xmlResponse,
	// 			{ explicitArray: false, ignoreAttrs: true },
	// 			(err, result) => {
	// 				if (err) {
	// 					console.error('Error parsing XML:', err);
	// 					return reject('Failed to parse XML');
	// 				}

	// 				// If a rootNode is specified, handle the logic based on its type
	// 				if (rootNode) {
	// 					// If rootNode is an array (e.g. ['root', 'child']), iterate over it
	// 					if (Array.isArray(rootNode)) {
	// 						let nodes = rootNode.reduce(
	// 							(acc: any[], node) => {
	// 								if (result[node]) {
	// 									const nodeValue =
	// 										Array.isArray(
	// 											result[
	// 												node
	// 											]
	// 										)
	// 											? result[
	// 													node
	// 											  ]
	// 											: [
	// 													result[
	// 														node
	// 													],
	// 											  ];
	// 									acc.push(
	// 										...nodeValue
	// 									);
	// 								}
	// 								return acc;
	// 							},
	// 							[]
	// 						);
	// 						return resolve(nodes);
	// 					}

	// 					// If it's a single rootNode, resolve its value
	// 					if (result[rootNode]) {
	// 						return resolve(result[rootNode]);
	// 					}

	// 					// If rootNode doesn't exist in result
	// 					return reject(
	// 						`Root node "${rootNode}" not found in XML`
	// 					);
	// 				}

	// 				// If no rootNode is provided, return the whole parsed result
	// 				resolve(result);
	// 			}
	// 		);
	// 	});
	// }

	static async parseXmlToJson(
		xmlResponse: string,
		rootNode: string | null = null
	) {
		try {
			// Convert XML to JSON
			const parser = new Parser({
				explicitArray: false,
				trim: true,
			});
			const result = await parser.parseStringPromise(xmlResponse);

			// Helper function to navigate and extract nodes
			const extractNode = (data: any, node: string) => {
				const nodes: any[] = [];
				const traverse = (obj: { [x: string]: any }) => {
					if (typeof obj !== 'object') return;
					for (const key in obj) {
						if (key === node) nodes.push(obj[key]);
						traverse(obj[key]);
					}
				};
				traverse(data);
				return nodes;
			};

			if (rootNode) {
				if (Array.isArray(rootNode)) {
					// If rootNode is a list, find and extract all matching nodes
					return rootNode.flatMap((node: any) =>
						extractNode(result, node)
					);
				}
				// If rootNode is a string, find and extract the single matching node
				const extracted = extractNode(result, rootNode);
				return extracted.length === 1
					? extracted[0]
					: extracted;
			}

			return result; // Return the entire parsed result if no rootNode is specified
		} catch (error) {
			if (error instanceof Error) {
				console.error(`Error parsing XML: ${error.message}`);
			} else {
				console.error('Error parsing XML:', error);
			}
			return {};
		}
	}

	// Retrieves TesseratiSocieta data
	public static async getTesseratiSocieta() {
		// const data = this.buildSoapRequest(serialNumber);

		try {
			let credentials = {
				username: 'ws.lnp',
				password: 'L3g3Prof3ss!',
				domain: 'FIGC',
			};

			let client = NtlmClient(credentials);

			let resp = await client({
				url: 'http://192.168.220.13:8080/WS_Help/AS400_storedProcedures_WS.asmx',
				method: 'POST',
				headers: {
					'Content-Type': 'text/xml',
				},
				data: `<?xml version="1.0" encoding="utf-8"?>
            <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
              <soap12:Body>
                <TesseratiSocieta xmlns="http://tempuri.org/">
                  <codiceSocieta>${81706}</codiceSocieta>
                </TesseratiSocieta>
              </soap12:Body>
            </soap12:Envelope>`,
			});
			console.log(resp.data);

			const xmlData = await this.parseXmlToJson(
				resp.data,
				'NewDataSet'
			);
			console.log('xmlData:', xmlData);
			return xmlData;
		} catch (error) {
			console.error('Error:', error);
			throw new Error('Failed to retrieve data');
		}
	}
}
