import { Application } from "@/app/repositories/_domain/interfaces/Application";

export interface ApiApplication {
  environment: string;
  external_identifiers: ApiExternalIdentifiers[];
  id?: number;
  repository_id: number;
  server?: ApiServer | undefined;
}

export interface ApiServer {
  active: boolean;
  id?: number;
  link: string;
  supports_health_check: boolean;
}

export interface ApiExternalIdentifiers {
  id?: number;
  text: string;
}

export function fromApiParser(application: ApiApplication): Application {
  return {
    id: application.id,
    environment: application.environment,
    repositoryId: application.repository_id,
    server: application.server
      ? {
          id: application.server.id,
          link: application.server.link,
          supportsHealthCheck: application.server.supports_health_check,
          active: application.server.active,
        }
      : undefined,
    externalIdentifiers: application.external_identifiers?.map(
      (externalIdentifier) => ({
        id: externalIdentifier.id,
        text: externalIdentifier.text,
      })
    ),
  };
}

export function toApiParser(application: Application): ApiApplication {
  return {
    environment: application.environment,
    repository_id: application.repositoryId,
    server_attributes: application.server
      ? {
          id: application.server.id,
          link: application.server.link,
          supports_health_check: application.server.supportsHealthCheck,
          active: application.server.active,
        }
      : undefined,
    external_identifiers_attributes: application.externalIdentifiers?.map(
      (externalIdentifier) => ({
        text: externalIdentifier,
      })
    ),
  };
}
