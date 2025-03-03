'use client'

import { useState, useEffect, useRef } from 'react'
import type { Peer } from 'peerjs'
import type { Message } from '@/entities/message'

export function usePeerConnection() {
	const [peerId, setPeerId] = useState('')
	const [messages, setMessages] = useState<Message[]>([])
	const [connected, setConnected] = useState(false)
	const peerInstance = useRef<Peer | null>(null)
	const connectionRef = useRef<any>(null)

	useEffect(() => {
		import('peerjs').then(({ Peer }) => {
			const peer = new Peer()

			peer.on('open', id => {
				console.log('My peer ID is:', id)
				setPeerId(id)
			})

			peer.on('connection', conn => {
				connectionRef.current = conn
				setConnected(true)

				conn.on('data', (data: any) => {
					setMessages(prev => [...prev, { sender: 'remote', content: data }])
				})

				conn.on('close', () => {
					setConnected(false)
					setMessages(prev => [
						...prev,
						{ sender: 'system', content: 'Connection closed' },
					])
				})
			})

			peerInstance.current = peer
		})

		return () => {
			if (peerInstance.current) {
				peerInstance.current.destroy()
			}
		}
	}, [])

	const connectToPeer = (remotePeerId: string) => {
		if (!peerInstance.current || !remotePeerId) return

		const conn = peerInstance.current.connect(remotePeerId)
		connectionRef.current = conn

		conn.on('open', () => {
			setConnected(true)
			setMessages(prev => [
				...prev,
				{ sender: 'system', content: 'Connected to peer' },
			])
		})

		conn.on('data', (data: any) => {
			setMessages(prev => [...prev, { sender: 'remote', content: data }])
		})

		conn.on('close', () => {
			setConnected(false)
			setMessages(prev => [
				...prev,
				{ sender: 'system', content: 'Connection closed' },
			])
		})
	}

	const sendMessage = (message: string) => {
		if (!connectionRef.current || !message) return

		connectionRef.current.send(message)
		setMessages(prev => [...prev, { sender: 'local', content: message }])
	}

	const copyPeerId = () => {
		navigator.clipboard.writeText(peerId)
	}

	return {
		peerId,
		connected,
		messages,
		connectToPeer,
		sendMessage,
		copyPeerId,
	}
}
