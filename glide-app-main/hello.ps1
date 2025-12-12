# Create the root project folder
New-Item -ItemType Directory -Name "glide"

# Change into the new directory
Set-Location -Path "glide"

# -- Client (Frontend) Folder Structure --
# Create the top-level client folders
$clientFolders = "client", "server", "docs"
foreach ($folder in $clientFolders) {
    New-Item -ItemType Directory -Name $folder
}

Set-Location -Path "client"
# Create nested client folders
$clientSrcFolders = "public", "src"
foreach ($folder in $clientSrcFolders) {
    New-Item -ItemType Directory -Name $folder
}

Set-Location -Path "src"
$srcSubFolders = "assets", "components", "pages", "hooks", "context", "utils", "services"
foreach ($folder in $srcSubFolders) {
    New-Item -ItemType Directory -Name $folder
}

Set-Location -Path "assets"
$assetSubFolders = "images", "styles"
foreach ($folder in $assetSubFolders) {
    New-Item -ItemType Directory -Name $folder
}

# Move back to the glide root
Set-Location -Path "..\..\.."

# -- Server (Backend) Folder Structure --
Set-Location -Path "server"
$serverFolders = "config", "controllers", "models", "routes", "middleware", "utils", "services"
foreach ($folder in $serverFolders) {
    New-Item -ItemType Directory -Name $folder
}

Set-Location -Path ".."

Write-Host "Project folder structure created successfully!"