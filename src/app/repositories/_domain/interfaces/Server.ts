export default interface Server {
  id?: number;
  link: string;
  supportsHealthCheck: boolean;
  active: boolean;
}
