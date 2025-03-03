'use client'

import { useState } from 'react'
import { MessageSquare, UserPlus } from 'lucide-react'

import { ChatWidget } from '@/widgets/chat'
import { ConnectionWidget } from '@/widgets/connection'
import { usePeerConnection } from '@/features/peer-connection'
import { Badge, Card, CardHeader, CardTitle } from '@/shared/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

export function ChatPage() {
	const {
		peerId,
		connected,
		messages,
		connectToPeer,
		sendMessage,
		copyPeerId,
	} = usePeerConnection()

	const [message, setMessage] = useState('')
	const [remotePeerId, setRemotePeerId] = useState('')
	const [copied, setCopied] = useState(false)

	const handleSendMessage = () => {
		if (!message) return
		sendMessage(message)
		setMessage('')
	}

	const handleCopyPeerId = () => {
		copyPeerId()
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const handleConnect = () => {
		if (!remotePeerId) return
		connectToPeer(remotePeerId)
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<CardTitle>WebRTC Chat</CardTitle>
						{connected && (
							<Badge variant='success' className='bg-green-500'>
								Connected
							</Badge>
						)}
					</div>
				</CardHeader>

				<Tabs defaultValue='chat' className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='chat'>
							<MessageSquare className='h-4 w-4 mr-2' />
							Chat
						</TabsTrigger>
						<TabsTrigger value='connect'>
							<UserPlus className='h-4 w-4 mr-2' />
							Connect
						</TabsTrigger>
					</TabsList>

					<TabsContent value='chat'>
						<ChatWidget
							messages={messages}
							message={message}
							setMessage={setMessage}
							sendMessage={handleSendMessage}
							connected={connected}
						/>
					</TabsContent>

					<TabsContent value='connect'>
						<ConnectionWidget
							peerId={peerId}
							remotePeerId={remotePeerId}
							setRemotePeerId={setRemotePeerId}
							connectToPeer={handleConnect}
							copyPeerId={handleCopyPeerId}
							copied={copied}
							connected={connected}
						/>
					</TabsContent>
				</Tabs>
			</Card>
		</div>
	)
}
