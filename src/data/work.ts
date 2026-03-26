export interface WorkEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlight: boolean;
}

export const work = {
  hero: {
    eyebrow: "Work",
    title: "Where I have worked",
    body: "Six years across gaming, fintech, and enterprise — building infrastructure, delivery pipelines, and operational tooling.",
  },
  entries: [
    {
      period: "Sep 2025 – Now",
      role: "DevOps Engineer",
      company: "Kajot",
      location: "Brno",
      description:
        "Kubernetes clusters in production, Argo CD GitOps deployments, Terraform and Ansible infrastructure provisioning, Docker workloads, Linux server administration for online game platforms and internal applications.",
      highlight: true,
    },
    {
      period: "Nov 2021 – Aug 2025",
      role: "DevOps Engineer",
      company: "Synottech",
      location: "Brno",
      description:
        "CI/CD pipelines and product releases via Azure DevOps, monitoring with Grafana and Zabbix, Docker and Nomad containerisation, environment setup and configuration for domestic and international clients.",
      highlight: true,
    },
    {
      period: "Oct 2020 – Sep 2021",
      role: "Build System Administrator",
      company: "2K Czech",
      location: "Brno",
      description:
        "Prepared and validated game builds using MS Build and Perforce. Ensured every build passed quality checks before release.",
      highlight: false,
    },
    {
      period: "Jun 2020 – Sep 2020",
      role: "QA Technician",
      company: "2K Czech",
      location: "Brno",
      description:
        "Summer position. Development assistant on an AAA title — testing and quality assurance during production.",
      highlight: false,
    },
    {
      period: "Feb 2019 – Jun 2019",
      role: "SW Support Engineer",
      company: "ABB s.r.o",
      location: "Czech Republic",
      description: "Part-time. Testing and fixing web applications and internal tools.",
      highlight: false,
    },
    {
      period: "Jul 2018 – Aug 2018",
      role: "Software Developer",
      company: "Hatch Ltd",
      location: "Canada",
      description: "Internship — developed an internal application for the company.",
      highlight: false,
    },
  ] satisfies WorkEntry[],
} as const;
