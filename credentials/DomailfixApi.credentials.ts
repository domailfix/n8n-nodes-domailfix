import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DomailfixApi implements ICredentialType {
	name = 'domailfixApi';

	displayName = 'Domailfix API';

	icon = 'file:../nodes/Domailfix/domailfix.svg' as const;

	documentationUrl = 'https://domailfix.com/api';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Domailfix API key (it starts with dmf_). Create one at https://domailfix.com/account#api.',
		},
		{
			displayName: 'Domailfix Address',
			name: 'baseUrl',
			type: 'string',
			default: 'https://domailfix.com',
			description: 'Leave as it is unless Domailfix gave you another address',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/key-check',
		},
	};
}
