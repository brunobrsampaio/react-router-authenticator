# React Router Authenticator

Esta biblioteca tem como finalidade auxiliar os desenvolvedores a terem uma melhor forma de trabalhar com rotas privadas e públicas.

# Antes de começar

Esta biblioteca trabalha em conjunto com a [React Router](https://reactrouter.com/web/guides/quick-start), utilizando certas funcionalidades que não teriam necessidade de serem reescritas. Sendo assim leiam, com atenção cada seção desse documento.

# Instalação

```sh
npm install react-router-authenticator
```

# Modo de uso

```jsx
import { BrowserRouter, Switch } from "react-router-dom";
import { Authenticator, AuthRoute } from 'react-router-authenticator';

export default () => {
		
  return (
    <BrowserRouter>
      <Switch>
        <Authenticator onValidator={() => true} validRedirect="/dashboard" invalidRedirect="/login">
          <AuthRoute exact path="/" component={Home} restricted />
          <AuthRoute exact path="/login" component={Login} restricted />
          <AuthRoute exact path="/dashboard" component={Dashboard} isPrivate />
          <AuthRoute exact path="/route-one" component={Component1} isPrivate />
          <AuthRoute exact path="/route-two" component={Component2} isPrivate />
          <AuthRoute exact path="/route-three" component={Component3} isPrivate />
          <AuthRoute exact path="/route-four" component={Component4} isPrivate />
          <AuthRoute exact path="/route-five" component={Component5} isPrivate />
          <AuthRoute exact path="/route-six" component={Component6} isPrivate />
          <AuthRoute exact path="/route-seven">
            <Component7 />
          </AuthRoute>
          <AuthRoute exact path="/route-eight" isPrivate>
            <Component8 />
          </AuthRoute>
          <AuthRoute exact path="/route-nine" isPrivate>
            <Component9 />
          </AuthRoute>
        </Authenticator>
      </Switch>
    </BrowserRouter>
  );
};
```

# Componentes

## **`Authenticator`** (Obrigátorio)

Este componente é responsável pelo contexto funcional da biblioteca, ele possui apenas 3 (três) propriedades básicas para o seu bom uso. Sendo elas `onValidator`, `validRedirect` e `invalidRedirect`, exemplo:

```jsx
<Authenticator onValidator={() => true} validRedirect="/dashboard" invalidRedirect="/login">
  <AuthRoute exact path="/" component={Home} />
  <AuthRoute exact path="/login" component={Login} restricted />
  <AuthRoute exact path="/dashboard" component={Dashboard} isPrivate />
</Authenticator>
```

### Propriedades

| Propriedade | Tipo | Descrição | Padrão |
| ------ | ------ | ------ | ------ |
| onValidator | **Function** | Callback responsável pela validação das rotas privadas, para que uma rota privada seja acessada, é necessário que o callback retorne `true` | **Falso** | 
| validRedirect | **String** | Rota usada para redirecionar caso tente acessar uma rota com a propriedade `restricted` e que não seja privada, caso o callback de `onValidator` retorne `true` | **Vázio** |
| invalidRedirect | **String** | Rota usada para redirecionar caso tente acessar uma rota privada, caso o callback de `onValidator` retorne `false` | **Vázio** |

## **`AuthRoute`** (Obrigátorio)

Este componente espelha todas as propriedades do componente `Route` da biblioteca [React Router](https://reactrouter.com/web/guides/quick-start), porém, algumas novas funcionalidades são adicionadas a ele. Sendo elas `isPrivate` e `restricted`, exemplo:

```jsx
<AuthRoute exact path="/" component={Home} />
<AuthRoute exact path="/login" component={Login} restricted />
<AuthRoute exact path="/dashboard" component={Dashboard} isPrivate />
```

### Propriedades

| Propriedade | Tipo | Descrição | Padrão |
| ------ | ------ | ------ | ------ |
| isPrivate | **Boolean** | Valor booleano que determina se é uma rota privada | **Falso** | 
| restricted | **Boolean** | Valor booleano que determina se uma rota pública se torna restrita após o uso de um callback definido na propriedade `onValidator` do componente `Authenticator` | **Falso** |