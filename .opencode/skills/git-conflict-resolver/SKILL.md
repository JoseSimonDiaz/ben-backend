---
name: git-conflict-resolver
description: "Use when merge or rebase conflicts occur in Git. Covers: conflict detection, resolution strategies, three-way merge understanding, and conflict prevention."
---

# Git Conflict Resolver

## Workflow

### 1. Detect & Understand

```bash
git status                    # see conflicted files
git diff                      # show conflict markers
git log --oneline --merge     # commits involved in conflict
```

Conflict markers follow this pattern:

```
incoming changes
```

### 2. Resolution Strategies

| Situation | Strategy |
|-----------|----------|
| Both branches modified same lines | Manual edit — keep one, combine, or rewrite |
| One branch deleted, other modified | `git add` to accept deletion, or restore with `git checkout --ours` / `--theirs` |
| Both added same file differently | Keep one version and edit if needed |
| Rename + edit conflict | `git mv` to resolve rename, then fix content |

### 3. Resolve

Edit the conflicted files to remove markers and keep desired code. Then:

```bash
git add <file>       # mark as resolved
git commit           # finish the merge
# OR if rebasing:
git rebase --continue
```

### 4. Abort if needed

```bash
git merge --abort
git rebase --abort
```

## Tips

- Use `git merge --no-ff` for feature branches to keep history clean
- For binary file conflicts, pick with `git checkout --ours` or `git checkout --theirs`
- Run tests after resolving before committing
- For complex conflicts, consider `git mergetool` (configured with your editor of choice)
- Resolve rebase conflicts one commit at a time with `git rebase --continue`

## Prevention

- Pull frequently (`git pull --rebase`) to stay current with target branch
- Communicate with team about large file changes
- Keep PRs small and focused
- Use `git diff <branch>` before merging to preview changes
