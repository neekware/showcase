export interface UrlTypes {
  api: {
    ping: string;
    auth: {
      login: string;
      register: string;
      refresh: string;
      logout: string;
    };
  };
  site: {
    base: string;
    home: string;
    about: string;
    more: string;
    dash: string;
    products: string;
    auth: {
      login: string;
      register: string;
      logout: string;
    };
  };
}
