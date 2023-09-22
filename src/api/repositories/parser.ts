import { Repository } from ".";

export interface ApiRepository {
  name: string;
  owner: string;
  active: boolean;
  slug: string;
  source_control_type: string;
  id: number;
  base_branch: string;
  supports_deploy: boolean;
  applications?:
    | {
        id: number;
        environment: string;
        server?:
          | {
              id: number;
              link: string;
              supports_health_check: boolean;
              active: boolean;
            }
          | undefined;
      }[]
    | undefined;
}

export function fromApiParser(repository: ApiRepository): Repository {
  return {
    id: repository.id,
    name: repository.name,
    owner: repository.owner,
    active: repository.active,
    slug: repository.slug,
    sourceControlType: repository.source_control_type,
    baseBranch: repository.base_branch,
    supportsDeploy: repository.supports_deploy,
    applications: repository.applications?.map((application) => ({
      repositoryId: repository.id,
      id: application.id,
      environment: application.environment,
      server: application.server
        ? {
            id: application.server.id,
            link: application.server.link,
            supportsHealthCheck: application.server.supports_health_check,
            active: application.server.active,
          }
        : undefined,
    })),
  };
}

export function toApiParser(repository: Repository): ApiRepository {
  return {
    id: repository.id,
    name: repository.name,
    owner: repository.owner,
    active: repository.active,
    slug: repository.slug,
    source_control_type: repository.sourceControlType,
    base_branch: repository.baseBranch,
    supports_deploy: repository.supportsDeploy,
  };
}
