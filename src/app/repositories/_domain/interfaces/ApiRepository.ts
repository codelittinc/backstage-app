export interface ApiRepository {
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
  slack_repository_info: {
    deploy_channel: string;
    dev_channel: string;
    dev_group: string;
    feed_channel: string;
    id?: number;
  };
  slug: string;
  source_control_type: string;
  supports_deploy: boolean;
}
