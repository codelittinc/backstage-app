"use client";
import RepositoryForm from "../_presenters/components/RepositoryForm/page";

const defaultRepository = {
  id: undefined,
  name: "",
  owner: "codelittinc",
  active: true,
  sourceControlType: "github",
  baseBranch: "master",
  supportsDeploy: false,
  filterPullRequestsByBaseBranch: false,
  applications: [],
  slackRepositoryInfo: {
    devChannel: "",
    deployChannel: "",
    feedChannel: "",
    devGroup: "",
  },
};

function Page(): JSX.Element {
  return <RepositoryForm repository={defaultRepository} />;
}

export default Page;
