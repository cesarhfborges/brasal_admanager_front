export interface LdapUser {
  cn: string;
  name: string;
  givenname: string;
  samaccountname: string;
  userprincipalname: string;
  displayname: string;
  distinguishedname: string;
  mail: string;
  memberof: string;
  objectsid: string;
  useraccountcontrol: Array<number>;
}

// useraccountcontrol Discritivo
// 512	Conta habilitada
// 514	Conta desabilitada
// 544	Conta habilitada, senha não requerida
// 546	Conta desabilitada, senha não requerida
// 66048	Conta habilitada, senha não expira
// 66050	Conta desabilitada, senha não expira
// 66080	Conta habilitada, Senha não expira e não é requerida
// 66082	Conta desabilitada, Senha não expira e não é requerida
