import type { Message } from '@/entities/message'
import { Button, CardContent, CardFooter, Input } from '@/shared/ui'

interface ChatWidgetProps {
	messages: Message[]
	message: string
	setMessage: (message: string) => void
	sendMessage: () => void
	connected: boolean
}

export function ChatWidget({
	messages,
	message,
	setMessage,
	sendMessage,
	connected,
}: ChatWidgetProps) {
	return (
		<>
			<CardContent className='h-[400px] overflow-y-auto flex flex-col space-y-4 p-4'>
				{messages.length === 0 ? (
					<div className='flex items-center justify-center h-full text-gray-400'>
						{connected
							? 'Send a message to start chatting'
							: 'Connect to a peer first'}
					</div>
				) : (
					messages.map((msg, index) => (
						<div
							key={index}
							className={`flex ${
								msg.sender === 'local'
									? 'justify-end'
									: msg.sender === 'system'
									? 'justify-center'
									: 'justify-start'
							}`}
						>
							<div
								className={`px-4 py-2 rounded-lg max-w-[80%] ${
									msg.sender === 'local'
										? 'bg-primary text-primary-foreground'
										: msg.sender === 'system'
										? 'bg-gray-200 text-gray-700 text-xs'
										: 'bg-gray-100'
								}`}
							>
								{msg.content}
							</div>
						</div>
					))
				)}
			</CardContent>

			<CardFooter className='flex space-x-2'>
				<Input
					value={message}
					onChange={e => setMessage(e.target.value)}
					placeholder='Type a message...'
					disabled={!connected}
					onKeyDown={e => e.key === 'Enter' && sendMessage()}
				/>
				<Button onClick={sendMessage} disabled={!connected || !message}>
					Send
				</Button>
			</CardFooter>
		</>
	)
}
