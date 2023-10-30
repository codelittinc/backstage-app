export default interface Server {
  active: boolean;
  id?: number;
  link: string;
  supportsHealthCheck: boolean;
}
