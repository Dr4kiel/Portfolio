import { defineCommand, text, card, list, link, dim, warning } from '@commands/index'
import type { Plugin } from '@types/Plugin'
import { projectsData } from './data'

const projectsCommand = defineCommand({
  name: 'projects',
  description: 'Browse my projects',
  args: [{ name: 'filter', description: 'Filter projects by tag or name', optional: true }],
  flags: [
    { name: 'verbose', alias: 'v', type: 'boolean', description: 'Show full descriptions and links' },
    { name: 'open', alias: 'o', type: 'string', description: 'Open a project URL by name' },
  ],
  handler: (ctx) => {
    const filter = ctx.parsed.args[0] ?? null
    const verbose = Boolean(ctx.parsed.flags['verbose'])
    const openTarget = ctx.parsed.flags['open'] as string | undefined

    // --open flag: open a project's URL
    if (openTarget) {
      const project = projectsData.find(
        (p) => p.name.toLowerCase() === openTarget.toLowerCase()
      )
      if (!project) {
        ctx.output.push(warning(`Project not found: ${openTarget}`))
        return
      }
      const url = project.url ?? project.repo
      if (!url) {
        ctx.output.push(warning(`No URL available for project: ${project.name}`))
        return
      }
      window.open(url, '_blank', 'noopener,noreferrer')
      ctx.output.push(text(`Opening ${project.name}...`, 'success'))
      return
    }

    let results = projectsData
    if (filter) {
      const q = filter.toLowerCase()
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (results.length === 0) {
      ctx.output.push(text(`No projects found matching '${filter}'.`, 'warning'))
      return
    }

    ctx.output.push(text(filter ? `Projects matching '${filter}':` : 'Projects', 'bold'))
    ctx.output.push(text(''))

    for (const project of results) {
      const meta: Record<string, string> = { Tags: project.tags.join(', ') }
      const body = verbose ? project.longDescription : project.description
      ctx.output.push(card(project.name, body, meta))

      if (verbose) {
        const links = [
          project.url ? link('Live', project.url) : null,
          project.repo ? link('Repo', project.repo) : null,
        ].filter(Boolean)
        for (const l of links) {
          if (l) ctx.output.push(l)
        }
      }

      ctx.output.push(text(''))
    }

    if (!verbose) {
      ctx.output.push(dim("Run 'projects --verbose' for full details, or 'projects <tag>' to filter."))
    }

    ctx.output.push(
      list(results.map((p) => `projects --open ${p.name}  →  open project URL`).slice(0, 1))
    )
  },
})

const projectsPlugin: Plugin = {
  name: 'projects',
  commands: [projectsCommand],
}

export default projectsPlugin
