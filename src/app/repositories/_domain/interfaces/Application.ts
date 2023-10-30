import { ExternalIdentifiers } from "./ExternalIdentifier";
import Server from "./Server";

export interface Application {
  environment: string;
  externalIdentifiers?: ExternalIdentifiers[];
  id?: number;
  repositoryId: number;
  server?: Server;
}
