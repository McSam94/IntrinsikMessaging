import React from 'react';
import { Context as UiContext, Provider as UiProvider } from './ui';
import { Context as AuthContext, Provider as AuthProvider } from './auth';
import { Context as ChatContext, Provider as ChatProvider } from './chat';
import {
	Context as ConversationContext,
	Provider as ConversionProvider,
} from './conversation';
import {
	Context as ContactContext,
	Provider as ContactProvider,
} from './contact';

const Providers = ({ children }) => {
	return (
		<UiProvider>
			<AuthProvider>
				<ChatProvider>
					<ContactProvider>
						<ConversionProvider>{children}</ConversionProvider>
					</ContactProvider>
				</ChatProvider>
			</AuthProvider>
		</UiProvider>
	);
};

export {
	Providers,
	UiContext,
	AuthContext,
	ChatContext,
	ContactContext,
	ConversationContext,
};
