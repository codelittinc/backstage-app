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
  slack_repository_info: {
    id?: number;
    dev_channel: string;
    deploy_channel: string;
    feed_channel: string;
    dev_group: string;
  };
  external_project_id?: number;
  deploy_type: string;
}
