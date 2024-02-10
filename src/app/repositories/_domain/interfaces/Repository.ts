import { Application } from "./Application";

export interface Repository {
  active: boolean;
  applications?: Application[];
  baseBranch: string;
  filterPullRequestsByBaseBranch: boolean;
  id?: number;
  name: string;
  owner: string;
  projectId?: number;
  slackRepositoryInfo?: {
    deployChannel?: string;
    devChannel?: string;
    devGroup?: string;
    feedChannel?: string;
    id?: number;
  };
  slug?: string;
  sourceControlType: string;
  supportsDeploy: boolean;
}
