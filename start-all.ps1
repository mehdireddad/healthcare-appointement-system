# Script de démarrage automatique pour le projet Architecture des Composants
# Auteur: Assistant IA

$root = $PSScriptRoot

Write-Host "--- Démarrage de l'architecture Microservices ---" -ForegroundColor Cyan

# Fonction pour lancer un processus dans une nouvelle fenêtre PowerShell
function Start-Component {
    param($name, $path, $command)
    Write-Host "Lancement de $name..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$path'; $command"
}

# 1. Démarrer Eureka Server (Indispensable en premier)
Start-Component "Eureka Service" "$root\eureka-service" "mvn spring-boot:run"

Write-Host "Attente de l'initialisation d'Eureka (20 secondes)..." -ForegroundColor Yellow
Start-Sleep -Seconds 20

# 2. Démarrer les Microservices Core
Start-Component "Docteur Service" "$root\docteur-service" "mvn spring-boot:run"
Start-Component "Notification Service" "$root\notification-service" "mvn spring-boot:run"
Start-Component "RDV Service" "$root\rdv-service" "mvn spring-boot:run"

Write-Host "Attente de l'initialisation des services (15 secondes)..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# 3. Démarrer la Gateway (Doit connaître les services)
Start-Component "Gateway Service" "$root\gateway-service" "mvn spring-boot:run"

# 4. Démarrer le Frontend
Start-Component "Frontend React" "$root\frontend" "npm run dev"

Write-Host "--- Tout est lancé ! ---" -ForegroundColor Cyan
Write-Host "Frontend accessible sur : http://localhost:5173"
Write-Host "Eureka Dashboard : http://localhost:8761"
