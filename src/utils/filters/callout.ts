export const callout = (str: string, param?: string): string => {
	let type = 'info';
	let title = '';
	let foldState: string | null = null;

	if (param) {
		// Remove outer parentheses if present
		param = param.replace(/^\((.*)\)$/, '$1');
		
		// Split by comma, but respect quoted strings
		const params = param.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.trim().replace(/^"|"$/g, ''));
		
		if (params.length > 0) type = params[0] || type;
		if (params.length > 1) title = params[1] || title;
		if (params.length > 2) {
			if (params[2] === 'true') foldState = '-';
			else if (params[2] === 'false') foldState = '+';
		}
	}

	let calloutHeader = `> [!${type}]`;
	if (foldState) calloutHeader += foldState;
	if (title) calloutHeader += ` ${title}`;

	return `${calloutHeader}\n${str.split('\n').map(line => `> ${line}`).join('\n')}`;
};