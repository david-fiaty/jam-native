import React, { useState, useEffect } from "react";
import SpinnerView from "@/components/view/SpinnerView";
import EntityManager from "@/manager/EntityManager";
import ProjectView from "@/components/view/ProjectView";

type Props = {
  projectId?: any;
};

const PublicProjectSection = ({ projectId }: Props) => {
  const [projectData, setProjectData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!projectData) {
        setProjectData(await EntityManager.getProjects([projectId]));
      }
    })();
  }, [projectData, projectId]);

  if (!projectData) return <SpinnerView />;

  return (
    <ProjectView
      projectId={projectId} 
      projectData={projectData}
      isPublic={true}
    />
  );
};

export default PublicProjectSection;