import { Application } from "."; // Adjust the import as per your project structure

export interface ApiApplication {
  id?: number;
  environment: string;
  repository_id: number;
  server_attributes?: ApiServer | undefined;
}

export interface ApiServer {
  id?: number;
  link: string;
  supports_health_check: boolean;
  active: boolean;
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
  };
}
