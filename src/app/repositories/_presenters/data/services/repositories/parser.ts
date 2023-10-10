import { ApiRepository } from "@/app/repositories/_domain/interfaces/ApiRepository";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";

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

export function toApiParser(repository: Repository): ApiRepository {
  return {
    id: repository.id!,
    name: repository.name,
    owner: repository.owner,
    active: repository.active,
    slug: repository.slug,
    source_control_type: repository.sourceControlType,
    base_branch: repository.baseBranch,
    supports_deploy: repository.supportsDeploy,
    slack_repository_info_attributes: {
      id: repository.slackRepositoryInfo?.id,
      dev_channel: repository.slackRepositoryInfo.devChannel,
      deploy_channel: repository.slackRepositoryInfo.deployChannel,
      feed_channel: repository.slackRepositoryInfo.feedChannel,
      dev_group: repository.slackRepositoryInfo.devGroup,
    },
    filter_pull_requests_by_base_branch:
      repository.filterPullRequestsByBaseBranch,
    external_project_id: repository.projectId,
    deploy_type: "tag",
  };
}
