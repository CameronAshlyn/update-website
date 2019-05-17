//live:
//https://api-cameronashlyn.com/wp-json/wp/v2/pages

//https://api-cameronashlyn.com/wp-json/wp/v2/projects/

//local:
//http://localhost/api/wp-json/wp/v2/pages

//http://localhost/api/wp-json/wp/v2/projects/

export default function fetchContent() {
  return fetch('https://api-cameronashlyn.com/wp-json/wp/v2/pages')
    .then(blob => blob.json())
    .then(json =>
      json.reduce(
        (res, page) => ({
          ...res,
          [page.slug]: {
            title: page.title.rendered,
            slug: page.slug,
            ...page.acf,
          },
        }),
        {},
      ),
    )
    .then(pages =>
      fetchProjects(pages.home.projects).then(projects => ({
        ...pages,
        ...projects.reduce(
          (res, project) => ({
            ...res,
            [project.slug]: project,
          }),
          {},
        ),
      })),
    )
    .then(data => ({
      ...data,
      home: {
        ...data.home,
        projects: data.home.projects.map(id => {
          const key = Object.keys(data).find(
            key => data[key].projectId && data[key].projectId === id,
          )
          return data[key]
        }),
      },
    }))
}

function fetchProjects(ids) {
  return Promise.all(ids.map(fetchSingleProject)).then(cleanProjects)
}

function fetchSingleProject(id) {
  return fetch(
    `https://api-cameronashlyn.com/wp-json/wp/v2/projects/${id}`,
  ).then(blob => blob.json())
}

function cleanProjects(projects) {
  return projects.map((project, i) => ({
    title: project.title.rendered,
    projectId: project.id,
    slug: project.slug,
    nextProject: projects[i === projects.length - 1 ? 0 : i + 1],
    ...project.acf,
  }))
}
