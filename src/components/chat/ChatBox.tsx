import { useState, useEffect, useRef } from 'react';
import {
	Box,
	Paper,
	TextField,
	Button,
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { Send, Person } from '@mui/icons-material';
import { useAppSelector } from '../../app/hooks';
import { selectMessagesByProduct } from '../../features/chat/chatSlice';
import { selectUsername } from '../../features/auth/authSlice';
import { useSocket } from '../../hooks';
import { formatDate } from '../../utils';

interface ChatBoxProps {
	productId: string;
}

export const ChatBox = ({ productId }: ChatBoxProps) => {
	const messages = useAppSelector(selectMessagesByProduct(productId));
	const currentUsername = useAppSelector(selectUsername) || 'Anonymous';
	const { joinRoom, leaveRoom, sendMessage: sendSocketMessage } = useSocket();
	const [messageText, setMessageText] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log(`📥 Joining product room: ${productId}`);
		// Join product room on mount
		joinRoom(productId);

		return () => {
			console.log(`📤 Leaving product room: ${productId}`);
			// Leave room on unmount
			leaveRoom(productId);
		};
		// Only re-run when productId changes, not when functions change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productId]);

	useEffect(() => {
		// Scroll to bottom when new messages arrive
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSend = () => {
		if (!messageText.trim()) return;

		// Send via Socket.IO only - server will broadcast to all clients including sender
		sendSocketMessage(productId, messageText, currentUsername);

		setMessageText('');
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<Paper sx={{ height: 500, display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
				<Typography variant='h6'>Product Chat</Typography>
				<Typography variant='caption'>Connected as: {currentUsername}</Typography>
			</Box>

			<List sx={{ flex: 1, overflow: 'auto', p: 2 }}>
				{messages.length === 0 ? (
					<Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
						<Typography>No messages yet. Start the conversation!</Typography>
					</Box>
				) : (
					messages.map((msg, index) => (
						<Box key={msg.id}>
							{index > 0 && <Divider sx={{ my: 1 }} />}
							<ListItem alignItems='flex-start' sx={{ px: 0 }}>
								<ListItemText
									primary={
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
											<Person fontSize='small' />
											<Typography variant='subtitle2' component='span'>
												{msg.username}
											</Typography>
											<Typography variant='caption' color='text.secondary'>
												{formatDate(msg.timestamp, 'MMM dd, HH:mm')}
											</Typography>
										</Box>
									}
									secondary={
										<Typography variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
											{msg.message}
										</Typography>
									}
								/>
							</ListItem>
						</Box>
					))
				)}
				<div ref={messagesEndRef} />
			</List>

			<Divider />

			<Box sx={{ p: 2 }}>
				<TextField
					fullWidth
					multiline
					maxRows={3}
					placeholder='Type your message...'
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
					onKeyPress={handleKeyPress}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton color='primary' onClick={handleSend} disabled={!messageText.trim()}>
									<Send />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					fullWidth
					variant='contained'
					onClick={handleSend}
					disabled={!messageText.trim()}
					sx={{ mt: 1 }}
					startIcon={<Send />}
				>
					Send Message
				</Button>
			</Box>
		</Paper>
	);
};
