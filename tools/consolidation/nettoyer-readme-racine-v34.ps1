# Progressions CE2 — V34.00
# Nettoyage ponctuel après copie du patch sur une ancienne version.
$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$hist = Join-Path $root "docs\historique"
New-Item -ItemType Directory -Force -Path $hist | Out-Null
Get-ChildItem -Path $root -File | Where-Object { $_.Name -like "README*" -and $_.Name -ne "README.md" } | ForEach-Object {
  $dest = Join-Path $hist $_.Name
  if (-not (Test-Path $dest)) { Move-Item -LiteralPath $_.FullName -Destination $dest } else { Remove-Item -LiteralPath $_.FullName }
}
Write-Host "V34.00 : anciens README archives dans docs/historique/."
