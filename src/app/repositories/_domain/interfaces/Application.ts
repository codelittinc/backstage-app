import { ExternalIdentifiers } from "./ExternalIdentifier";
import Server from "./Server";

export interface Application {
  id?: number;
  environment: string;
  server?: Server;
  repositoryId: number;
  externalIdentifiers?: ExternalIdentifiers[];
}
