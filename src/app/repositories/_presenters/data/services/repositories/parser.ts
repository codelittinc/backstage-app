import { Repository } from "@/app/repositories/_domain/interfaces/Repository";

type slackRepositoryInfoPayload = {
  deploy_channel?: string;
  dev_channel?: string;
  dev_group?: string;
  feed_channel?: string;
  id?: number;
};

type RepositoryPayload = {
  active: boolean;
  applications?:
    | {
        environment: string;
        id: number;
        server?:
          | {
              active: boolean;
              id: number;
              link: string;
              supports_health_check: boolean;
            }
          | undefined;
      }[]
    | undefined;
  base_branch: string;
  deploy_type: string;
  external_project_id?: number;
  id: number;
  name: string;
  owner: string;
  slack_repository_info: slackRepositoryInfoPayload;
  slug?: string;
  source_control_type: string;
  supports_deploy: boolean;
  filter_pull_requests_by_base_branch: boolean;
};

export function fromApiParser(repository: RepositoryPayload): Repository {
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
    slackRepositoryInfo: {
      id: repository.slack_repository_info?.id,
      devChannel: repository.slack_repository_info.dev_channel,
      deployChannel: repository.slack_repository_info.deploy_channel,
      feedChannel: repository.slack_repository_info.feed_channel,
      devGroup: repository.slack_repository_info.dev_group,
    },
    filterPullRequestsByBaseBranch:
      repository.filter_pull_requests_by_base_branch,
    projectId: repository.external_project_id,
  };
}

type RepositoryPayloadToApi = Omit<
  RepositoryPayload,
  "slack_repository_info"
> & { slack_repository_info_attributes: slackRepositoryInfoPayload };

export function toApiParser(repository: Repository): RepositoryPayloadToApi {
  return {
    id: repository.id as number,
    name: repository.name,
    owner: repository.owner,
    active: repository.active,
    source_control_type: repository.sourceControlType,
    base_branch: repository.baseBranch,
    supports_deploy: repository.supportsDeploy,
    slack_repository_info_attributes: {
      id: repository.slackRepositoryInfo?.id,
      dev_channel: repository.slackRepositoryInfo?.devChannel,
      deploy_channel: repository.slackRepositoryInfo?.deployChannel,
      feed_channel: repository.slackRepositoryInfo?.feedChannel,
      dev_group: repository.slackRepositoryInfo?.devGroup,
    },
    filter_pull_requests_by_base_branch:
      repository.filterPullRequestsByBaseBranch,
    external_project_id: repository.projectId,
    deploy_type: "tag",
  };
}
