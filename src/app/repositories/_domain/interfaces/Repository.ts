import { Application } from "./Application";

export interface Repository {
  id?: number;
  name: string;
  owner: string;
  active: boolean;
  slug?: string;
  sourceControlType: string;
  baseBranch: string;
  supportsDeploy: boolean;
  applications?: Application[];
  slackRepositoryInfo?: {
    id?: number;
    devChannel: string;
    deployChannel: string;
    feedChannel: string;
    devGroup: string;
  };
  filterPullRequestsByBaseBranch: boolean;
  projectId?: number;
}
