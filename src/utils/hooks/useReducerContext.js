import React, { useReducer, createContext } from 'react';

export const useReducerContext = ({
	reducer,
	actions,
	initialState,
	displayName,
}) => {
	const Context = createContext(initialState);

	// eslint-disable-next-line react/prop-types
	const Provider = ({ children, value }) => {
		const [state, dispatch] = useReducer(reducer, initialState);

		const boundActions = {};
		for (const key in actions) {
			boundActions[key] = actions[key](dispatch);
		}

		return (
			<Context.Provider
				value={{ ...state, ...boundActions, ...value }}
				displayName={displayName}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};
