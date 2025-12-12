# This script removes a sensitive string from your Git history.
# Replace the placeholder with the exact, exposed API key.
$old_secret = 'GIT_FILTER_REMOVED_SECRET'

# This command rewrites the history, replacing the old secret with a new placeholder.
git filter-branch --tree-filter "Get-ChildItem -Recurse | ForEach-Object { (Get-Content $_) -replace [regex]::Escape($old_secret), 'GIT_FILTER_REMOVED_SECRET' | Set-Content $_ }" --tag-name-filter cat -- --all