import xml2js from "xml2js";

export const parseXML = async (xml) => {
	try {
		const result = await xml2js.parseStringPromise(xml);
		return result;
	} catch (error) {
		throw new Error(error);
	}
};
