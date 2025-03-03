import { CardContent } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Copy, Check } from 'lucide-react'

interface ConnectionWidgetProps {
	peerId: string
	remotePeerId: string
	setRemotePeerId: (id: string) => void
	connectToPeer: () => void
	copyPeerId: () => void
	copied: boolean
	connected: boolean
}

export function ConnectionWidget({
	peerId,
	remotePeerId,
	setRemotePeerId,
	connectToPeer,
	copyPeerId,
	copied,
	connected,
}: ConnectionWidgetProps) {
	return (
		<CardContent className='space-y-4 p-4'>
			<div className='space-y-2'>
				<div className='text-sm font-medium'>Your ID</div>
				<div className='flex space-x-2'>
					<Input value={peerId} readOnly className='font-mono text-sm' />
					<Button variant='outline' size='icon' onClick={copyPeerId}>
						{copied ? (
							<Check className='h-4 w-4' />
						) : (
							<Copy className='h-4 w-4' />
						)}
					</Button>
				</div>
				<div className='text-xs text-gray-500'>
					Share this ID with others so they can connect to you
				</div>
			</div>

			<div className='space-y-2'>
				<div className='text-sm font-medium'>Connect to a peer</div>
				<div className='flex space-x-2'>
					<Input
						value={remotePeerId}
						onChange={e => setRemotePeerId(e.target.value)}
						placeholder='Enter peer ID'
						className='font-mono text-sm'
					/>
					<Button onClick={connectToPeer} disabled={!remotePeerId || connected}>
						Connect
					</Button>
				</div>
			</div>
		</CardContent>
	)
}
