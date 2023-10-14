// Docs: https://docs.gitlab.com/ee/ci/yaml/#job-keywords
// Source: https://gitlab.com/gitlab-org/gitlab/-/tree/master/lib/gitlab/ci

/*
 * Defines GitLab CI job top level keywords
 * Enum => <keyword>: (no colon in this type)
 * allow_failure => allow_failure:
 * */

export enum JobKeywordTopLevel {
    after_script = "after_script",
    allow_failure = "allow_failure",
    artifacts = "artifacts",
    before_script = "before_script",
    cache = "cache",
    coverage = "coverage",
    dast_configuration = "dast_configuration",
    dependencies = "dependencies",
    environment = "environment",
    extends = "extends",
    hooks = "hooks",
    id_tokens = "id_tokens",
    image = "image",
    inherit = "inherit",
    interruptible = "interruptible",
    needs = "needs",
    only = "only",
    except = "except",
    pages = "pages",
    parallel = "parallel",
    release = "release",
    resource_group = "resource_group",
    retry = "retry",
    rules = "rules",
    script = "script",
    secrets = "secrets",
    services = "services",
    stage = "stage",
    tags = "tags",
    timeout = "timeout",
    trigger = "trigger",
    variables = "variables",
    when = "when",
}

// Job "variables:"
export type Variables = Map<string, string>

export type Need = {
    job: string,
    optional: boolean
}

// TODO: Type for scripts?
export type JobConfig = {
    [JobKeywordTopLevel.after_script]?: string[],
    [JobKeywordTopLevel.allow_failure]?: string,
    [JobKeywordTopLevel.artifacts]?: string,
    [JobKeywordTopLevel.before_script]?: string[],
    [JobKeywordTopLevel.cache]?: string,
    [JobKeywordTopLevel.coverage]?: string,
    [JobKeywordTopLevel.dast_configuration]?: string,
    [JobKeywordTopLevel.dependencies]?: string,
    [JobKeywordTopLevel.environment]?: string,
    [JobKeywordTopLevel.extends]?: string,
    [JobKeywordTopLevel.hooks]?: string,
    [JobKeywordTopLevel.id_tokens]?: string,
    [JobKeywordTopLevel.image]?: string,
    [JobKeywordTopLevel.inherit]?: string,
    [JobKeywordTopLevel.interruptible]?: string,
    [JobKeywordTopLevel.needs]?: Need[],
    [JobKeywordTopLevel.only]?: string,
    [JobKeywordTopLevel.except]?: string,
    [JobKeywordTopLevel.pages]?: string,
    [JobKeywordTopLevel.parallel]?: string,
    [JobKeywordTopLevel.release]?: string,
    [JobKeywordTopLevel.resource_group]?: string,
    [JobKeywordTopLevel.retry]?: string,
    [JobKeywordTopLevel.rules]?: string,
    [JobKeywordTopLevel.script]?: string[],
    [JobKeywordTopLevel.secrets]?: string,
    [JobKeywordTopLevel.services]?: string,
    [JobKeywordTopLevel.stage]?: string,
    [JobKeywordTopLevel.tags]?: string,
    [JobKeywordTopLevel.timeout]?: string,
    [JobKeywordTopLevel.trigger]?: string,
    [JobKeywordTopLevel.variables]: Variables,
    [JobKeywordTopLevel.when]?: string,
}

export function defaultKeywordValue(keyword: JobKeywordTopLevel) {
    switch (keyword) {
        case JobKeywordTopLevel.needs:
            return [{}]
        case JobKeywordTopLevel.variables:
            return [{ key: "VARIABLE_1", value: "example value" }]
        default:
            return ""
    }
}
