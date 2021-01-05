import React, { createContext, useContext, memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const Context = createContext(false);

/**
 * Contexto do autenticador
 */
const Authenticator = memo(({ children, onValidator, validRedirect, invalidRedirect }) => {

	return (
		<Context.Provider value={{ onValidator, validRedirect, invalidRedirect }}>
			{ children }
		</Context.Provider>
	);
});

Authenticator.propTypes = {
	onValidator 	: PropTypes.func.isRequired,
	validRedirect 	: PropTypes.string.isRequired,
	invalidRedirect : PropTypes.string.isRequired
};

/**
 * Componente espelho de "Route", com novos métodos complementares
 */
const AuthRoute = memo(({ children, isPrivate, restricted, component, render, ...rest }) => {

	const { onValidator, validRedirect, invalidRedirect } = useContext(Context);

	return (
		<Context.Consumer>
			{(context) => {

				invariant(context, 'You should not use <AuthRoute> outside a <Authenticator>');

				return <Route {...rest} render={() => {

					if (isPrivate) {

						if (!onValidator()) {

							return <Redirect to={invalidRedirect} />;
						}
					}

					if (onValidator() && restricted) {
	
						return <Redirect to={validRedirect} />;
					}

					if (children) {

						return children;
					}

					const Component = component || render;

					return <Component />;
				}} />;
			}}
		</Context.Consumer>
	);
});

AuthRoute.propTypes = {
	isPrivate	: PropTypes.bool,
	restricted	: PropTypes.bool,
	...Route.propTypes
};

AuthRoute.defaultProps = {
	isPrivate	: false,
	restricted	: false,
	...Route.defaultProps
};

export {
	Authenticator,
	AuthRoute
};