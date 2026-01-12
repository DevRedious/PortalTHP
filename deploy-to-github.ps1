# Script PowerShell pour envoyer le code sur GitHub
# Usage: .\deploy-to-github.ps1

Write-Host "=== Déploiement sur GitHub ===" -ForegroundColor Cyan

# Vérifier si Git est installé
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé!" -ForegroundColor Red
    Write-Host "Installez Git depuis: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Ou utilisez: winget install Git.Git" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git est installé" -ForegroundColor Green

# Vérifier si .git existe
if (-not (Test-Path .git)) {
    Write-Host "Initialisation du dépôt Git..." -ForegroundColor Yellow
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de l'initialisation" -ForegroundColor Red
        exit 1
    }
}

# Vérifier le remote
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ajout du remote GitHub..." -ForegroundColor Yellow
    git remote add origin https://github.com/DevRedious/PortalTHP.git
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de l'ajout du remote" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Remote existe déjà: $remoteExists" -ForegroundColor Green
    $update = Read-Host "Voulez-vous mettre à jour le remote? (o/N)"
    if ($update -eq "o" -or $update -eq "O") {
        git remote set-url origin https://github.com/DevRedious/PortalTHP.git
    }
}

# Ajouter tous les fichiers
Write-Host "Ajout des fichiers..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'ajout des fichiers" -ForegroundColor Red
    exit 1
}

# Vérifier s'il y a des changements à commiter
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "⚠️  Aucun changement à commiter" -ForegroundColor Yellow
} else {
    Write-Host "Création du commit..." -ForegroundColor Yellow
    $commitMessage = Read-Host "Message de commit (ou Entrée pour message par défaut)"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Initial commit: Portail THP - Web3 Profile Portal"
    }
    git commit -m $commitMessage
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors du commit" -ForegroundColor Red
        exit 1
    }
}

# Renommer la branche si nécessaire
$currentBranch = git branch --show-current
if ($currentBranch -ne "main" -and $currentBranch -ne "master") {
    Write-Host "Renommage de la branche en 'main'..." -ForegroundColor Yellow
    git branch -M main
}

# Push vers GitHub
Write-Host "Envoi sur GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  Vous devrez peut-être vous authentifier avec votre Personal Access Token" -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Code envoyé avec succès sur GitHub!" -ForegroundColor Green
    Write-Host "Vérifiez: https://github.com/DevRedious/PortalTHP" -ForegroundColor Cyan
} else {
    Write-Host "❌ Erreur lors du push" -ForegroundColor Red
    Write-Host "Vérifiez votre authentification GitHub" -ForegroundColor Yellow
    Write-Host "Créez un PAT: https://github.com/settings/tokens" -ForegroundColor Yellow
}
