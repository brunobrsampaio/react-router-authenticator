import React, { createContext, memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const AuthenticatorContext = createContext(false);
AuthenticatorContext.displayName = 'AuthenticatorContext';

/**
 * Contexto do autenticador
 */
const Authenticator = memo(({ children, onValidator, validRedirect, invalidRedirect }) => {

	return (
		<AuthenticatorContext.Provider value={{ onValidator, validRedirect, invalidRedirect }}>
			{ children }
		</AuthenticatorContext.Provider>
	);
});

Authenticator.propTypes = {
	/**
	 * Função validadora que determina se as rotas serão ou não acessadas
	 */
	onValidator 	: PropTypes.func.isRequired,
	/**
	 * Rota de redirecionamento em caso de retorno "true" no atributo "onValidator"
	 */
	validRedirect 	: PropTypes.string.isRequired,
	/**
	 * Rota de redirecionamento em caso de retorno "false" no atributo "onValidator"
	 */
	invalidRedirect : PropTypes.string.isRequired
};

/**
 * Componente espelho de "Route", com novos métodos complementares
 */
const AuthRoute = ({ children, isPrivate, restricted, component, render, as, ...rest }) => {

	return (
		<AuthenticatorContext.Consumer>
			{(context) => {

				invariant(context, 'You should not use <AuthRoute> outside a <Authenticator>');

				const { onValidator, validRedirect, invalidRedirect } = context;

				const Component = as || Route;

				return <Component {...rest} render={() => {

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
		</AuthenticatorContext.Consumer>
	);
};

AuthRoute.propTypes = {
	/**
	 * Determina se é uma rota privada
	 */
	isPrivate	: PropTypes.bool,
	/**
	 * Determina se uma rota pública se torna restrita após o uso de um callback definido na propriedade 'onValidator' do componente 'Authenticator'
	 */
	restricted	: PropTypes.bool,
	as 			: PropTypes.elementType,
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