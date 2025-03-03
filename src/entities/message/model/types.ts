export interface Message {
	sender: 'local' | 'remote' | 'system'
	content: string
}
